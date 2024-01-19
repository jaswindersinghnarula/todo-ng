import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { route as todoRoute } from "./routers/todo";
import { route as itemRoute } from "./routers/item";
import cors from "cors";
dotenv.config();

const app: Express = express();
const PORT = process.env.SERVER_PORT || 3000;

app.use(
    cors({
        origin: [process.env.CLIENT_URL || "*"],
    }),
);
app.use(express.json());
app.use("/todo", todoRoute);
app.use("/item", itemRoute);

app.get("/", (req: Request, res: Response) => {
    return res.json({ Hello: "world!!" });
});

app.listen(PORT, () => {
    console.log(`🚀 Server launched at http://localhost:${PORT} ⚡`);
});
