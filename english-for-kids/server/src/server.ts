import express from 'express';
import bodyParser from 'body-parser';
import usersRouter from './routers/UsersRouter';
import cardsRouter from './routers/CardsRouter';
import categoryRouter from './routers/CategoryRouter';
import statRouter from './routers/StatisticsRouter'
import pool from './dbconfig/dbconnector';
import cors from 'cors';

class Server {
    private app;

    constructor() {
        this.app = express();
        this.config();
        this.routerConfig();
        this.dbConnect();
    }

    private config() {
        this.app.use(bodyParser.urlencoded({ extended:true }));
        this.app.use(bodyParser.json({ limit: '1mb' })); // 100kb default
    }

    private dbConnect() {
      pool.connect(function (err: string) {
        if (err) throw new Error(err);
        console.log('Connected');
      }); 
    }

    private routerConfig() {
      this.app.use(cors());
      this.app.use(express.static('public'));
      this.app.use('/users', usersRouter);
      this.app.use('/card', cardsRouter);
      this.app.use('/categories', categoryRouter);
      this.app.use('/statistics', statRouter);
    }

    public start = (port: number) => {
        return new Promise((resolve, reject) => {
            this.app.listen(port, () => {
                resolve(port);
            }).on('error', (err: Object) => reject(err));
        });
    }
}

export default Server;
