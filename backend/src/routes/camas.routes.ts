import express, {
  response,
  Router,
  type Request,
  type Response,
} from "express";
import { camaService } from "../services/camas.services.js";
import { CriarCama } from "../types/camas.js";

export const camaRouter = Router();

camaRouter.get("/", async (_request: Request, response: Response) => {
  try {
    const res = await camaService.getAll();
    return response.json(res);
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      error: "Erro Interno",
    });
  }
});

camaRouter.post(
  "/",
  async (request: Request<{}, {}, CriarCama>, response: Response) => {
    try {
      const dados = request.body;
      const cama = await camaService.create(dados);
      return response.status(201).json(cama);
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        error: "Erro Interno",
      });
    }
  },
);

camaRouter.get(
  "/:id",
  async (request: Request<{ id: string }>, response: Response) => {
    const { id } = request.params;
    try {
      const res = await camaService.getById(id);
      if (!res) {
        return response.status(404).json({
          error: "Cama não encontrada",
        });
      }
      return response.json(res);
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        error: "Erro interno",
      });
    }
  },
);

camaRouter.put(
  "/:id",
  async (
    request: Request<{ id: string }, {}, CriarCama>,
    response: Response,
  ) => {
    const { id } = request.params;
    try {
      const dados = request.body;
      const camaAtualizada = await camaService.update(id, dados);

      if (!camaAtualizada) {
        return response.status(404).json({
          error: "Cama não encontrada para atualização",
        });
      }

      return response.json(camaAtualizada);
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        error: "Erro interno",
      });
    }
  },
);

camaRouter.delete(
  "/:id",
  async (request: Request<{ id: string }>, response: Response) => {
    const { id } = request.params;
    try {
      const res = await camaService.deletarCama(id);
      return response.json(res);
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        error: "Erro interno",
      });
    }
  },
);
