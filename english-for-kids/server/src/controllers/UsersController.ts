import pool from '../dbconfig/dbconnector';
import * as crypto from 'crypto';
import { send } from 'process';

class UsersController {

    public async get(req, res) {
      try {
          console.log('hi');
          const { login } = req.body;
          const client = await pool.connect();
          const sql = "SELECT * FROM users WHERE login LIKE $1";
          const { rows } = await client.query(sql, [login]);
          const todos = rows as Array<{
            id: number;
            login: string;
            password: string;
          }>;
          client.release();
          if(todos[0].password === 'admin') {
            res.send(todos[0].password);
          } else {
            res.sendStatus(404);
          }
          
      } catch (error) {
          res.status(400).send(error);
      }
    }

    public async autorizedValidation(req, res) {
      try {
          const client = await pool.connect();
          const { login, password } = req.body;
          const sql = `SELECT password FROM users WHERE login = $1`;
          const { rows } = await client.query(sql, [login]);
          const savedPass = rows as Array<{password: string}>
          client.release();
          if(savedPass.length === 0){
            res.sendStatus(401);
          } else {
            const hashPassword = crypto.createHash('md5').update(password).digest('hex');
            if (hashPassword === savedPass[0].password) {
              res.sendStatus(200);
            }
            res.sendStatus(401);
          }
      } catch (error) {
          res.status(400).send(error);
      }
    }

    public async set(req, res) {
      try {
          const client = await pool.connect();
          const { login, password } = req.body;
          const hashPassword = crypto.createHash('md5').update(password).digest('hex');
          const sql = `INSERT INTO users (login, password) VALUES ($1, $2')`;
          await client.query(sql, [login, hashPassword]);
          client.release();
          res.sendStatus(200);
      } catch (error) {
          res.status(400).send(error);
      }
    }
}

export default UsersController;
