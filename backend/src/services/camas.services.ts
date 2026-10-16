import { pool } from "../database/connection.js";
import { Cama, CriarCama } from "../types/camas.js";

class CamaService {
  async getAll(): Promise<Cama[]> {
    const res = await pool.query<Cama>("SELECT * FROM camas");
    return res.rows;
  }

  async getById(id: string): Promise<Cama[] | null> {
    const res = await pool.query<Cama>("SELECT * FROM camas WHERE id = \$1", [
      id,
    ]);

    const cama = res.rows[0];

    if (!cama) {
      return null;
    }

    return res.rows;
  }

  async create(dados: CriarCama): Promise<Cama> {
    const res = await pool.query<Cama>(
      `INSERT INTO camas 
            (nome, tamanho, quantidade) VALUES ($1, $2, $3) RETURNING *`,
      [dados.nome, dados.tamanho, dados.quantidade],
    );

    const cama = res.rows[0];

    if (!cama) {
      throw new Error("O banco não retornou a cama cadastrada");
    }

    return cama;
  }

  async update(id: string, dados: CriarCama): Promise<Cama | null> {
    const res = await pool.query<Cama>(
      `UPDATE camas 
       SET nome = $1, tamanho = $2, quantidade = $3 
       WHERE id = $4 RETURNING *`,
      [dados.nome, dados.tamanho, dados.quantidade, id],
    );

    const cama = res.rows[0];
    return cama || null;
  }

  async deletarCama(id: string): Promise<boolean> {
    const res = await pool.query("DELETE FROM camas WHERE id = \$1", [id]);
    return (res.rowCount ?? 0) > 0;
  }
}

export const camaService = new CamaService();
