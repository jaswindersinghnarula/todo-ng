"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ErrorHandler(ex, res) {
    if (ex.name === "PrismaClientValidationError")
        return res.status(400).json({ message: "Invalid id." });
    if (ex.name === "PrismaClientKnownRequestError")
        return res.status(400).json({ message: ex.meta.cause });
    return res.status(500).json({ message: ex });
}
exports.default = ErrorHandler;
