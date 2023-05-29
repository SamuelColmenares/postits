import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../lib/prisma"; // prisma client

//* route para obtener todas las notas
const getAllNotes = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const notes = await prisma.note.findMany();

  res.status(200).json({
    status: "success",
    data: {
      notes,
    },
  });
});

//* route para crear una nota
const postNote = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const { title, content, color } = req.body;
  const note = await prisma.note.create({
    data: {
      title,
      content,
      color,
    },
  });
  res.status(200).json({
    status: "success",
    data: note,
  });
});

//* route para eliminar nota atraves de ID
const deleteNote = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  await prisma.note.delete({
    where: {
      id: id.toString(),
    },
  });

  res.status(200).json({
    status: "success",
    data: null,
  });
});

//* route para obtener nota atraves de ID
const getNote = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const note = await prisma.note.findUnique({
    where: {
      id: id.toString(),
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      note,
    },
  });
});

//* route para actualizar nota a traves de ID
const updateNote = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { title, content, color } = req.body;

  const note = await prisma.note.update({
    where: {
      id: id.toString(),
    },
    data: {
      title,
      content,
      color,
    },
  });
  res.status(200).json({
    status: "success",
    data: {
      note,
    },
  });
});

export { getAllNotes, postNote, deleteNote, updateNote, getNote };
