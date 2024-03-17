import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { Capitalize, ErrorHandler } from "../Helper";

const prisma = new PrismaClient();
const route = express.Router();
// CRUD: CREATE READ UPDATE DELETE.

// GET ALL TODO WITH THEIR ITEMS.
route.get("/", async (req: Request, res: Response) => {
  return res.status(200).json(await AllTodos());
});

// CREATE TODO.
route.post("/", async (req: Request, res: Response) => {
  let { title } = req.body;
  try {
    const newTodo = await prisma.todo.create({
      data: {
        title: Capitalize(title),
      },
    });

    return res.status(200).json(await AllTodos());
  } catch (ex: any) {
    return ErrorHandler(ex, res);
  }
});

// READ TODO.
route.get("/:id", async (req: Request, res: Response) => {
  let { id } = req.params;
  try {
    const todo = await prisma.todo.findFirst({
      where: {
        id: parseInt(id),
      },
      include: {
        items: true,
      },
    });
    if (!todo) return res.status(404).json({ message: "Record not found." });
    return res.status(200).json(todo);
  } catch (ex: any) {
    return ErrorHandler(ex, res);
  }
});

// UPDATE TODO.
route.patch("/:id", async (req: Request, res: Response) => {
  let { id } = req.params;
  let { title } = req.body;
  try {
    const updatedTodo = await prisma.todo.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title,
      },
    });
    if (!updatedTodo)
      return res.status(404).json({ message: "Record not found." });
    return res.status(200).json(await AllTodos());
  } catch (ex: any) {
    return ErrorHandler(ex, res);
  }
});

// DELETE TODO.
route.delete("/:id", async (req: Request, res: Response) => {
  let { id } = req.params;
  try {
    await prisma.todo.delete({
      where: {
        id: parseInt(id),
      },
    });
    return res.status(200).json(await AllTodos());
  } catch (ex: any) {
    return ErrorHandler(ex, res);
  }
});
export { route };

// TOGGLE STATUS.
route.get("/:id/toggle-status", async (req: Request, res: Response) => {
  let { id } = req.params;
  try {
    const todo = await prisma.todo.findFirst({
      where: {
        id: parseInt(id),
      },
      include: {
        items: true,
      },
    });
    if (todo?.items.length === 0) {
      const updatedTodo = await prisma.todo.update({
        where: {
          id: parseInt(id),
        },
        data: {
          status: todo?.status === "PENDING" ? "COMPLETED" : "PENDING",
        },
      });
      return res.status(200).json(await AllTodos());
    }
    throw "There are still todo items pending.";
  } catch (ex: any) {
    return ErrorHandler(ex, res);
  }
});

// GET ALL ITEMS FOR TODO.
route.get("/:id/items", async (req: Request, res: Response) => {
  let { id } = req.params;
  const items = await prisma.item.findMany({
    where: {
      todoId: parseInt(id),
    },
  });
  return res.status(200).json(items);
});

// CREATE ITEM.
route.post("/:id/item", async (req: Request, res: Response) => {
  let { id } = req.params;
  let { title, description } = req.body;
  try {
    // Find Todo.
    const todo = await prisma.todo.findFirst({
      where: {
        id: parseInt(id),
      },
    });

    // If Todo not found.
    if (!todo)
      return res.status(404).json({
        message: "Todo not found.",
      });

    // Create new item.
    const newItem = await prisma.item.create({
      data: {
        title: Capitalize(title),
        description,
      },
    });

    // Attched item and Update todo.
    await prisma.todo.update({
      where: { id: todo.id },
      data: {
        status: "PENDING",
        items: {
          connect: {
            id: newItem.id,
          },
        },
      },
    });
    return res.status(200).json(await AllTodos());
  } catch (ex: any) {
    return ErrorHandler(ex, res);
  }
});

// RETURN ALL TODOS.
export const AllTodos = async () => {
  return await prisma.todo.findMany({
    orderBy: {
      created_at: "asc",
    },
    include: {
      items: true,
    },
  });
};
