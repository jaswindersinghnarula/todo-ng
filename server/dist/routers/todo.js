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
const ErrorHandler_1 = __importDefault(require("../ErrorHandler"));
const prisma = new client_1.PrismaClient();
const route = express_1.default.Router();
exports.route = route;
// CRUD: CREATE READ UPDATE DELETE.
// GET ALL TODO WITH THEIR ITEMS.
route.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todos = yield prisma.todo.findMany({
        include: {
            items: true,
        },
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
                title,
            },
        });
        return res.status(200).json(newTodo);
    }
    catch (ex) {
        return (0, ErrorHandler_1.default)(ex, res);
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
        return (0, ErrorHandler_1.default)(ex, res);
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
        return (0, ErrorHandler_1.default)(ex, res);
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
        return (0, ErrorHandler_1.default)(ex, res);
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
        });
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
    catch (ex) {
        return (0, ErrorHandler_1.default)(ex, res);
    }
}));
