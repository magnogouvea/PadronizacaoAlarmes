import type { NextApiRequest, NextApiResponse } from 'next';
import { createPool, PoolConnection } from 'mysql2/promise';

const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let connection: PoolConnection | null = null;
  try {
    connection = await pool.getConnection();

    switch (req.method) {
      case 'GET':
        await handleGet(req, res, connection);
        break;
      case 'POST':
        await handlePost(req, res, connection);
        break;
      case 'PUT':
        await handlePut(req, res, connection);
        break;
      case 'DELETE':
        await handleDelete(req, res, connection);
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).json({ error: `Método ${req.method} não permitido` });
    }
  } catch (error) {
    console.error('Erro na operação do banco de dados:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  } finally {
    if (connection) connection.release();
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse, connection: PoolConnection) {
  const { id } = req.query;
  let query = 'SELECT * FROM firewall';
  let params: any[] = [];

  if (id) {
    query += ' WHERE id = ?';
    params.push(id);
  }

  const [rows] = await connection.execute(query, params);
  res.status(200).json(rows);
}

async function handlePost(req: NextApiRequest, res: NextApiResponse, connection: PoolConnection) {
  const { dispositivo, ...otherFields } = req.body;
  const query = 'INSERT INTO firewall (dispositivo, ...) VALUES (?, ...)';
  const params = [dispositivo, ...Object.values(otherFields)];

  const [result] = await connection.execute(query, params);
  res.status(201).json({ id: result.insertId, message: 'Firewall criado com sucesso' });
}

async function handlePut(req: NextApiRequest, res: NextApiResponse, connection: PoolConnection) {
  const { id } = req.query;
  const { dispositivo, ...otherFields } = req.body;
  const query = 'UPDATE firewall SET dispositivo = ?, ... WHERE id = ?';
  const params = [...Object.values(otherFields), id];

  await connection.execute(query, params);
  res.status(200).json({ message: 'Firewall atualizado com sucesso' });
}
