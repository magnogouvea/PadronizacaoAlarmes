import type { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'naruto123',
        database: 'padronizacao_alarmes',
      });

      const [rows] = await connection.execute('SELECT * FROM firewall');
      await connection.end();

      res.status(200).json(rows);
    } catch (error) {
      console.error('Erro ao buscar dados do banco:', error);
      res.status(500).json({ error: 'Erro ao buscar dados do banco' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: `Método ${req.method} não permitido` });
  }
}
