import express, { response, type Request, type Response } from "express";
import { camaRouter } from "./routes/camas.routes";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/health", (_request: Request, response: Response) => {
  return response.json({
    status: "ok",
  });
});

app.use("/camas", camaRouter);

app.listen(port, () => {
  console.log(`Server rodando em https://localhost/${port}`);
});
