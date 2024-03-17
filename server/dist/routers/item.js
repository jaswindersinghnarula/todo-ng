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
// READ ITEM.
route.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    try {
        const item = yield prisma.item.findFirst({
            where: {
                id: parseInt(id),
            },
        });
        if (!item)
            return res.status(404).json({ message: "Record not found." });
        return res.status(200).json(item);
    }
    catch (ex) {
        return (0, Helper_1.ErrorHandler)(ex, res);
    }
}));
// UPDATE ITEM.
route.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    let { title, description } = req.body;
    try {
        const updatedItem = yield prisma.item.update({
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
    }
    catch (ex) {
        return (0, Helper_1.ErrorHandler)(ex, res);
    }
}));
// DELETE ITEM.
route.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    try {
        yield prisma.item.delete({
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
        const item = yield prisma.item.findFirst({
            where: {
                id: parseInt(id),
            },
        });
        const updatedItem = yield prisma.item.update({
            where: {
                id: parseInt(id),
            },
            data: {
                status: (item === null || item === void 0 ? void 0 : item.status) === "PENDING" ? "COMPLETED" : "PENDING",
            },
        });
        parentStatusChange(updatedItem.todoId || 0);
        return res.status(200).json(updatedItem);
    }
    catch (ex) {
        return (0, Helper_1.ErrorHandler)(ex, res);
    }
}));
// Perform status change of parent if all are completed.
const parentStatusChange = (todoId) => __awaiter(void 0, void 0, void 0, function* () {
    let allItems = yield prisma.item.findMany({
        where: {
            todoId: todoId,
        },
    });
    allItems = allItems.filter((item) => {
        if (item.status !== "COMPLETED")
            return item;
    });
    if (allItems.length === 0) {
        yield prisma.todo.update({
            data: {
                status: "COMPLETED",
            },
            where: {
                id: todoId,
            },
        });
    }
    else {
        yield prisma.todo.update({
            data: {
                status: "PENDING",
            },
            where: {
                id: todoId,
            },
        });
    }
});
