import express, { Express, Request, Response } from "express";
import Config from "./Config";
import { route as todoRoute } from "./routers/todo";
import { route as itemRoute } from "./routers/item";
import cors from "cors";

const app: Express = express();

app.use(
  cors({
    origin: Config().origins,
  })
);
app.use(express.json());
app.use("/todo", todoRoute);
app.use("/item", itemRoute);

app.get("/", (req: Request, res: Response) => {
  return res.json({ Hello: "world!!" });
});

app.listen(Config().port, () => {
  console.log(`🚀 Server launched at ${Config().server} ⚡`);
});
