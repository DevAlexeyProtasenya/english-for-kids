import pool from '../dbconfig/dbconnector';
import {Request, Response} from 'express';

class CategoryController {
  
  public async getCategory(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const client = await pool.connect();
      const sql = "SELECT * FROM category WHERE id = $1";
      const { rows } = await client.query(sql, [id]);
      const card = rows;
      client.release();
      res.send(card);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async getAllCategory(req: Request, res: Response) {
    try {
      const client = await pool.connect();
      const sql = "SELECT * FROM category";
      const { rows } = await client.query(sql);
      const cards = rows;
      client.release();
      res.send(cards);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async setCategory(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const client = await pool.connect();
      const sql = `INSERT INTO category (name) VALUES ($1)`;
      await client.query(sql, [name]);
      client.release();
      res.sendStatus(200);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async updateCategory(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const { name } = req.body;
      const client = await pool.connect();
      const sql = `UPDATE category SET name = $1 WHERE id = $2`;
      await client.query(sql, [name, id]);
      client.release();
      res.sendStatus(200);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async deleteCard(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const client = await pool.connect();
      const sql = `DELETE FROM category WHERE id = $1`;
      await client.query(sql, [id]);
      client.release();
      res.sendStatus(200);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

export default CategoryController;