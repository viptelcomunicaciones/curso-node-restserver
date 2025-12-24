import express from 'express'
import hbs from 'hbs'
import cors from'cors'
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv'
import { router as userRouter } from '../router/user.js';
dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT;
const app = express();

export class Server {

    

    constructor(){
        this.app = express();
        this.PORT = process.env.PORT;
        this.__filename = fileURLToPath(import.meta.url);
        this.__dirname = path.dirname(__filename);
        this.userpath ='/';

        // middlewares
        this.middlewares();
        // rutas app
        this.router();

        
    }

    middlewares(){
        //handlebars
        this.app.set('view engine', 'hbs');
        hbs.registerPartials(path.join(__dirname, '../views/partials'));

        // directorio public 
        this.app.use(express.static('public'));
        //cors
        this.app.use(cors())
        //lectura y parseo body 
        this.app.use(express.json());
    }

    router(){
        this.app.use(this.userpath, userRouter);
    }

    listen(){
        this.app.listen(this.PORT, () => {
            console.log(`Example app listening on port ${this.PORT}`)
        }
    )  
    }
}