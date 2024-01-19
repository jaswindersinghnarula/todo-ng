import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import ErrorHandler from "../ErrorHandler";

const prisma = new PrismaClient();
const route = express.Router();
// CRUD: CREATE READ UPDATE DELETE.

// GET ALL TODO WITH THEIR ITEMS.
route.get("/", async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany({
        include: {
            items: true,
        },
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
                title,
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
        });
        const updatedTodo = await prisma.todo.update({
            where: {
                id: parseInt(id),
            },
            data: {
                status: todo?.status === "PENDING" ? "COMPLETED" : "PENDING",
            },
        });
        return res.status(200).json(updatedTodo);
    } catch (ex: any) {
        return ErrorHandler(ex, res);
    }
});
