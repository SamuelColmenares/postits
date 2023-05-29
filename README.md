# Tarea 1 Arquitectura de Software

## Description TakeNotes

Esta es una app construída con [NextJs](https://nextjs.org/) basada en la arquitectura MVC.
Utliza el ORM [Prisma](https://www.prisma.io/nextjs) para conectarse a la Base de Datos y crear el modelado.
Tarea 3 de la materia _`Arquitectura de Software`_ - **UNIREMINGTON**.

* Elaborado por:
  - Samuel Giovanni Colmenares Patiño

* Profesor: **Adan Beltran Gomez**
* Fecha: 26 de mayo de 2023.

## Características

-  Crear Post-it (nota) 
-  Actualizar Post-it
-  Eliminar Post-it
La lectura (Read) está implícita en la carga de la página.

## Installation and Setup Instructions

```bash
git clone https://github.com/SamuelColmenares/postits.git
```

Crear archivo **.env** en la raíz y adicionar la URL de conexión.

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
```

Instalar dependencias

```bash
npm install
```

Crear la tabla en la DB usando prisma ORM

```bash
npx prisma db push
```

Ejecutar la app

```bash
npm run dev
```

## Características de software usado:
| Lenguaje/Motor |    Versión Usada     |
|:--------------:|:--------------------:|
| IDE            | Visual Studio Code   |
| Node JS        | 18                   |
| Typescript     | 4.3.2                |
| Base de Datos  | Postgress 15 (Azure Cosmos) |
| ORM            | Prisma               |
| Middleware     | Next JS              |