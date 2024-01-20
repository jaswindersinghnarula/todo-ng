import dotenv from "dotenv";
dotenv.config();

export default function Config() {
  const port = process.env.SERVER_PORT || 3000;
  const origins = process.env.SERVER_ORIGINS?.split(" ") || "*";
  const server = process.env.SERVER_URL || "http://localhost:3002";

  return { port, origins, server };
}
