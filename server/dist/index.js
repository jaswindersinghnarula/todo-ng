"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const todo_1 = require("./routers/todo");
const item_1 = require("./routers/item");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.BACKEND_PORT || 3000;
app.use(express_1.default.json());
app.use("/todo", todo_1.route);
app.use("/item", item_1.route);
app.get("/", (req, res) => {
    return res.json({ Hello: "world!!" });
});
app.listen(PORT, () => {
    console.log(`🚀 Server launched at http://localhost:${PORT} ⚡`);
});
