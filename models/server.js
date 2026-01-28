import express from 'express'
import cors from'cors'
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv'
import { router as userRouter } from '../router/user.js';
import { router as authRouter } from '../router/auth.js';
import { router as categoriasRouter } from '../router/categorias.js';
import { conectionDB } from '../database/config.js';
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
        this.paths ={
            user:   '/api/user',
            auth:   '/api/auth',
            categorias: '/api/categorias'
        }
        // conexion a base de datos 
        this.conectarDB();
        // middlewares
        this.middlewares();
        // rutas app
        this.router();

        
    }

    async conectarDB(){
        await conectionDB();
    }

    middlewares(){
        // directorio public 
        this.app.use(express.static('public'));
        //cors
        this.app.use(cors())
        //lectura y parseo body 
        this.app.use(express.json());
    }

    router(){
        this.app.use(this.paths.user, userRouter);
        this.app.use(this.paths.auth, authRouter);
        this.app.use(this.paths.categorias, categoriasRouter);
    }

    listen(){
        this.app.listen(this.PORT, () => {
            console.log(`Example app listening on port ${this.PORT}`)
        }
    )  
    }
}

