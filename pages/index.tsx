import type { NextPage, GetServerSideProps } from "next";

import React, { Key, useState, useEffect, useId } from "react";

import Head from "next/head";
import styles from "../styles/Home.module.css";
import axios from "axios";
import absoluteUrl from "next-absolute-url";
import { useRouter } from "next/router";

import StickyNote from "../components/StickyNote";
import AddModal from "../components/AddModal";
import EditModal from "../components/EditModal";

import { AddIcon } from "../icons/AddIcon";
import { noteProps } from "../constants/models";

interface homeProps {
  results: noteProps[];
}
const Home: NextPage<homeProps> = ({ results }) => {
  const [notes, setNotes] = useState<noteProps[]>(results);
  const [showAddModal, setAddModalVisibility] = useState<boolean>(false);
  const [showUpdateModal, setUpdateModalVisibility] = useState<boolean>(false);
  const [selectEditedNote, setSelectEditedNote] = useState<noteProps>();
  const router = useRouter();
  const tempPostId = useId();

  const handleAddNote = async ({ title, content, color }: noteProps) => {
    let oldNotesState = notes;
    try {
      const addNotes = [
        ...notes,
        {
          id: tempPostId,
          title,
          content,
          color,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      // sets the new note to state locally
      setNotes(addNotes);
      //* axios for post object of values
      const { data } = await axios.post(`/api/notes`, { title, content, color });
      if (data) {
        router.reload();
      }
    } catch (error) {
      console.error(error);
      setNotes(oldNotesState);
    }
  };

  const handleEditNote = async ({ title, content, color }: noteProps) => {
    // add Note optimistically to ui
    let oldNotesState = notes;
    try {
      // manipulate the edit in the 
      const editNotes = notes.map((note: { id: any; }) => {
        if (note.id === selectEditedNote?.id) {
          return {
            ...note,
            title,
            content,
            color,
            updatedAt: new Date(),
          };
        }
        return note;
      });
      // Set edited Array to state
      setNotes(editNotes);
      //* pass note edits to a put to api endpoint 
      const { data } = await axios.put(`/api/notes/${selectEditedNote?.id}`, {
        title,
        content,
        color,
      });
      if (data) {
        router.reload();
      }
      setUpdateModalVisibility(!showUpdateModal);
      setSelectEditedNote(undefined);
    } catch (error) {
      setNotes(oldNotesState);
      console.error(error);
    }
  };

  const handleSelectEditedNote = (selectNote: noteProps) => {
    setSelectEditedNote(selectNote);
    setUpdateModalVisibility(!showUpdateModal);
  };

  const handleDeleteNote = async (id: string) => {
    try {
      //delete note base on id
      const removeItem = notes.filter((note: { id: string; }) => note.id !== id);
      setNotes(removeItem);
      //* set id to dynamically delete call
      await axios.delete(`/api/notes/${id}`);
      router.reload();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => console.log(results), [results]);

  return (
    <div className={styles.container}>
      <Head>
        <meta name="description" content="CRUD MVC para Post-it's" />
        <title>Post-it CRUD - Takenotes</title>
        <link rel="icon" href="/site_logo.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className="w-full mb-16 text-center text-5xl font-semibold text-slate-900">Post-it: Crea Notas</h1>
        {showAddModal && (
          <AddModal
            onHandleAddNote={handleAddNote}
            showAddModal={showAddModal}
            setAddModalVisibility={setAddModalVisibility}
          />
        )}
        {showUpdateModal && (
          <EditModal
            onHandleEditNote={handleEditNote}
            setSelectEditedNote={setSelectEditedNote}
            selectEditedNote={selectEditedNote}
            showUpdateModal={showUpdateModal}
            setUpdateModalVisibility={setUpdateModalVisibility} 
          />
        )}
        <div className="mb-5" onClick={() => setAddModalVisibility(!showAddModal)}>
          <AddIcon className="w-16 hover:scale-125 hover:duration-700 ease-in-out duration-700 ease-out-in" />
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
          {notes?.map((note: noteProps, index: Key | null | undefined) => (
            <StickyNote
              key={index}
              data={note}
              onSelectEditedNote={handleSelectEditedNote}
              onDeleteNote={handleDeleteNote}
            />
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-16">
          <p className="text-center text-slate-400">Samuel Colmenares - Arquitectura de Software - UNIREMINGTON 2023</p>
        </div>
      </main>
    </div>
  );
};
// will make the initial call to populate the results
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { origin } = absoluteUrl(req);

  //* gets all notes from server
  const apiURL = `${origin}/api/notes`;
  const { data } = await axios.get(apiURL);
  return {
    props: {
      results: data.data.notes,
    },
  };
};

export default Home;
