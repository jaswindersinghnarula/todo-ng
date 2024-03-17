"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function Config() {
    var _a;
    const port = process.env.SERVER_PORT || 3000;
    const origins = ((_a = process.env.SERVER_ORIGINS) === null || _a === void 0 ? void 0 : _a.split(" ")) || "*";
    const server = process.env.SERVER_URL || "http://localhost:3002";
    return { port, origins, server };
}
exports.default = Config;
