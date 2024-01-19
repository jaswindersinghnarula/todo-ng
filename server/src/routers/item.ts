import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import ErrorHandler from "../ErrorHandler";

const prisma = new PrismaClient();
const route = express.Router();
// CRUD: CREATE READ UPDATE DELETE.

// GET ALL ITEMS FOR TODO.
route.get("/:todo_id", async (req: Request, res: Response) => {
    let { todo_id } = req.params;
    const items = await prisma.item.findMany({
        where: {
            todoId: parseInt(todo_id),
        },
    });
    return res.status(200).json(items);
});

// CREATE ITEM.
route.post("/:todo_id", async (req: Request, res: Response) => {
    let { todo_id } = req.params;
    let { title, description } = req.body;
    try {
        const todo = await prisma.todo.findFirst({
            where: {
                id: parseInt(todo_id),
            },
        });
        if (!todo)
            return res.status(404).json({
                message: "Todo not found.",
            });
        const newItem = await prisma.item.create({
            data: {
                title,
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
        return res.status(200).json(newItem);
    } catch (ex: any) {
        return ErrorHandler(ex, res);
    }
});

// READ ITEM.
route.get("/:id", async (req: Request, res: Response) => {
    let { id } = req.params;
    try {
        const item = await prisma.item.findFirst({
            where: {
                id: parseInt(id),
            },
        });
        if (!item)
            return res.status(404).json({ message: "Record not found." });
        return res.status(200).json(item);
    } catch (ex: any) {
        return ErrorHandler(ex, res);
    }
});

// UPDATE ITEM.
route.patch("/:id", async (req: Request, res: Response) => {
    let { id } = req.params;
    let { title, description } = req.body;
    try {
        const updatedItem = await prisma.item.update({
            where: {
                id: parseInt(id),
            },
            data: {
                title,
                description,
            },
        });
        if (!updatedItem)
            return res.status(404).json({ message: "Record not found." });
        return res.status(200).json(updatedItem);
    } catch (ex: any) {
        return ErrorHandler(ex, res);
    }
});

// DELETE ITEM.
route.delete("/:id", async (req: Request, res: Response) => {
    let { id } = req.params;
    try {
        await prisma.item.delete({
            where: {
                id: parseInt(id),
            },
        });
        return res.status(200).json();
    } catch (ex: any) {
        return ErrorHandler(ex, res);
    }
});

// TOGGLE STATUS.
route.get("/:id/toggle-status", async (req: Request, res: Response) => {
    let { id } = req.params;
    try {
        const item = await prisma.item.findFirst({
            where: {
                id: parseInt(id),
            },
        });
        const updatedItem = await prisma.item.update({
            where: {
                id: parseInt(id),
            },
            data: {
                status: item?.status === "PENDING" ? "COMPLETED" : "PENDING",
            },
        });
        return res.status(200).json(updatedItem);
    } catch (ex: any) {
        return ErrorHandler(ex, res);
    }
});

export { route };
