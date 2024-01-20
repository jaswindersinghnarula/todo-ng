import { Response } from "express";

export function ErrorHandler(ex: any, res: Response) {
    if (ex.name === "PrismaClientValidationError")
        return res.status(400).json({ message: "Invalid id." });
    if (ex.name === "PrismaClientKnownRequestError")
        return res.status(400).json({ message: ex.meta.cause });
    return res.status(500).json({ message: ex });
}

export function Capitalize(str: String) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
