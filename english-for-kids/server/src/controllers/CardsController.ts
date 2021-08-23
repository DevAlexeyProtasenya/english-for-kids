import pool from '../dbconfig/dbconnector';
import {Request, Response} from 'express';

interface Card {
  id: number;
  idCategory: number;
  word: string;
  translate: string;
  imageSRC: string;
  sound: string;
}

class CardsController {

  public async getByCategory(req: Request, res: Response) {
    try {
      const idCategory = parseInt(req.params.id);
      const client = await pool.connect();
      const sql = "SELECT * FROM card WHERE id_category = $1";
      const { rows } = await client.query(sql, [idCategory]);
      const cards: Array<Card> = [];
      rows.forEach(element => {
        cards.push({
          id: element.id,
          idCategory: element.id_category,
          word: element.word,
          translate: element.translate,
          sound: element.sound,
          imageSRC: element.img,
        })
      });
      client.release();
      res.send(cards);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async getCardByID(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const client = await pool.connect();
      const sql = "SELECT * FROM card WHERE id = $1";
      const { rows } = await client.query(sql, [id]);
      const card: Card = {
        id: rows[0].id,
        idCategory: rows[0].id_category,
        word: rows[0].word,
        translate: rows[0].translate,
        sound: rows[0].sound,
        imageSRC: rows[0].img,
      }
      client.release();
      res.send(card);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async getAll(req: Request, res: Response) {
    try {
      const client = await pool.connect();
      const sql = "SELECT * FROM card";
      const { rows } = await client.query(sql);
      const cards: Array<Card> = [];
      rows.forEach(element => {
        cards.push({
          id: element.id,
          idCategory: element.id_category,
          word: element.word,
          translate: element.translate,
          sound: element.sound,
          imageSRC: element.img,
        })
      });
      client.release();
      res.send(cards);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async setCard(req: Request, res: Response) {
    try {
      const { idCategory, word, translate, img, sound } = req.body;
      const client = await pool.connect();
      const sql = `INSERT INTO card (id_category, word, translate, img, sound)
      VALUES ($1, $2, $3, $4, %5)`;
      await client.query(sql, [idCategory, word, translate, img, sound]);
      client.release();
      res.sendStatus(200);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async updateCard(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const { idCategory, word, translate, img, sound } = req.body;
      const client = await pool.connect();
      const sql = `UPDATE card SET idCategory = $1, word = $2, translate = $3, img = $4,
      sound = $5 WHERE id = $6`;
      await client.query(sql, [idCategory, word, translate, img, sound, id]);
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
      const sql = `DELETE FROM card WHERE id = $1`;
      await client.query(sql, [id]);
      client.release();
      res.sendStatus(200);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

export default CardsController;
