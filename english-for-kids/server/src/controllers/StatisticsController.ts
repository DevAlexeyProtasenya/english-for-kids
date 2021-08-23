import pool from '../dbconfig/dbconnector';
import {Request, Response} from 'express';

class StatisticsController {

  public async getByid(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const client = await pool.connect();
      const sql = "SELECT * FROM statistics WHERE id = $1";
      const { rows } = await client.query(sql, [id]);
      const stat = rows;
      client.release();
      res.send(stat);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async getAll(req: Request, res: Response) {
    try {
      const client = await pool.connect();
      const sql = "SELECT * FROM statistics";
      const { rows } = await client.query(sql);
      const stats = rows;
      client.release();
      res.send(stats);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async setStat(req: Request, res: Response) {
    try {
      const { clicks, correct, wrong } = req.body;
      const client = await pool.connect();
      const sql = `INSERT INTO statistics (clicks, correct, wrong)
      VALUES ($1, $2, $3)`;
      await client.query(sql, [clicks, correct, wrong]);
      client.release();
      res.sendStatus(200);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async updateStat(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const { clicks, correct, wrong } = req.body;
      const client = await pool.connect();
      const sql = `UPDATE statistics SET clicks = $1, correct = $2, wrong = $3 WHERE id = $4`;
      await client.query(sql, [clicks, correct, wrong, id]);
      client.release();
      res.sendStatus(200);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async deleteStat(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const client = await pool.connect();
      const sql = `DELETE FROM statistics WHERE id = $1`;
      await client.query(sql, [id]);
      client.release();
      res.sendStatus(200);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

export default StatisticsController;
