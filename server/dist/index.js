"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Config_1 = __importDefault(require("./Config"));
const todo_1 = require("./routers/todo");
const item_1 = require("./routers/item");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: (0, Config_1.default)().origins,
}));
app.use(express_1.default.json());
app.use("/todo", todo_1.route);
app.use("/item", item_1.route);
app.get("/", (req, res) => {
    return res.json({ Hello: "world!!" });
});
app.listen((0, Config_1.default)().port, () => {
    console.log(`🚀 Server launched at ${(0, Config_1.default)().server} ⚡`);
});
