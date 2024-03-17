"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const Helper_1 = require("../Helper");
const prisma = new client_1.PrismaClient();
const route = express_1.default.Router();
exports.route = route;
// CRUD: CREATE READ UPDATE DELETE.
// GET ALL TODO WITH THEIR ITEMS.
route.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todos = yield prisma.todo.findMany({
        orderBy: {
            created_at: "asc",
        },
    });
    return res.status(200).json(todos);
}));
// CREATE TODO.
route.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { title } = req.body;
    try {
        const newTodo = yield prisma.todo.create({
            data: {
                title: (0, Helper_1.Capitalize)(title),
            },
        });
        return res.status(200).json(newTodo);
    }
    catch (ex) {
        return (0, Helper_1.ErrorHandler)(ex, res);
    }
}));
// READ TODO.
route.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    try {
        const todo = yield prisma.todo.findFirst({
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
    }
    catch (ex) {
        return (0, Helper_1.ErrorHandler)(ex, res);
    }
}));
// UPDATE TODO.
route.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    let { title } = req.body;
    try {
        const updatedTodo = yield prisma.todo.update({
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
    }
    catch (ex) {
        return (0, Helper_1.ErrorHandler)(ex, res);
    }
}));
// DELETE TODO.
route.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    try {
        yield prisma.todo.delete({
            where: {
                id: parseInt(id),
            },
        });
        return res.status(200).json();
    }
    catch (ex) {
        return (0, Helper_1.ErrorHandler)(ex, res);
    }
}));
// TOGGLE STATUS.
route.get("/:id/toggle-status", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    try {
        const todo = yield prisma.todo.findFirst({
            where: {
                id: parseInt(id),
            },
            include: {
                items: true,
            },
        });
        if ((todo === null || todo === void 0 ? void 0 : todo.items.length) === 0) {
            const updatedTodo = yield prisma.todo.update({
                where: {
                    id: parseInt(id),
                },
                data: {
                    status: (todo === null || todo === void 0 ? void 0 : todo.status) === "PENDING" ? "COMPLETED" : "PENDING",
                },
            });
            return res.status(200).json(updatedTodo);
        }
        throw "There are still todo items pending.";
    }
    catch (ex) {
        return (0, Helper_1.ErrorHandler)(ex, res);
    }
}));
// GET ALL ITEMS FOR TODO.
route.get("/:id/items", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    const items = yield prisma.item.findMany({
        where: {
            todoId: parseInt(id),
        },
    });
    return res.status(200).json(items);
}));
// CREATE ITEM.
route.post("/:id/item", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    let { title, description } = req.body;
    try {
        const todo = yield prisma.todo.findFirst({
            where: {
                id: parseInt(id),
            },
        });
        if (!todo)
            return res.status(404).json({
                message: "Todo not found.",
            });
        const newItem = yield prisma.item.create({
            data: {
                title: (0, Helper_1.Capitalize)(title),
                description,
            },
        });
        yield prisma.todo.update({
            where: { id: todo.id },
            data: {
                items: {
                    connect: {
                        id: newItem.id,
                    },
                },
            },
        });
        const refreshedItem = yield prisma.item.findFirst({
            where: { id: newItem.id },
        });
        return res.status(200).json(refreshedItem);
    }
    catch (ex) {
        return (0, Helper_1.ErrorHandler)(ex, res);
    }
}));
