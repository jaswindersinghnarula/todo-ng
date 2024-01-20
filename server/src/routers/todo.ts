import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { Capitalize, ErrorHandler } from "../Helper";

const prisma = new PrismaClient();
const route = express.Router();
// CRUD: CREATE READ UPDATE DELETE.

// GET ALL TODO WITH THEIR ITEMS.
route.get("/", async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany({
        orderBy: {
            created_at: "asc",
        },
    });
    return res.status(200).json(todos);
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

        return res.status(200).json(newTodo);
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
        if (!todo)
            return res.status(404).json({ message: "Record not found." });
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
        return res.status(200).json(updatedTodo);
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
        return res.status(200).json();
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
                    status:
                        todo?.status === "PENDING" ? "COMPLETED" : "PENDING",
                },
            });
            return res.status(200).json(updatedTodo);
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
        const todo = await prisma.todo.findFirst({
            where: {
                id: parseInt(id),
            },
        });
        if (!todo)
            return res.status(404).json({
                message: "Todo not found.",
            });
        const newItem = await prisma.item.create({
            data: {
                title: Capitalize(title),
                description,
            },
        });
        await prisma.todo.update({
            where: { id: todo.id },
            data: {
                items: {
                    connect: {
                        id: newItem.id,
                    },
                },
            },
        });
        const refreshedItem = await prisma.item.findFirst({
            where: { id: newItem.id },
        });
        return res.status(200).json(refreshedItem);
    } catch (ex: any) {
        return ErrorHandler(ex, res);
    }
});
