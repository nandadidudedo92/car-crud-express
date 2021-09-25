

# Buat Build Run

## install dependencies 
    npm install express esm mysql2 nodemon dotenv typeorm  --save-dev

## ubah package.json

tambahkan code ini dibawah script
	
    "start": "node index",
    "dev": "nodemon index || true"

## create Index.js & .env
	1. create index.js,
    2. create .env

## edit index.js

    // High Order Function
    require = require("esm")(module);

setelah selesai configurasi file dan app       
    module.exports = require("./src/app.js");

## edit dotenv
    APP_NAME    =   car-crud-api
    APP_PORT    =   3000
    DB_HOST     =   localhost
    DB_PORT     =   3306
    DB_USERNAME =   root
    DB_PASSWORD =   P@ssw0rd
    DB_NAME     =   ship
    DB_TYPE     =   mysql
    LOG_ACTIVE  =   true

## buat folder src

## buat folder src/config

## buat src/config/config.js

    import dotenv from "dotenv";


    export default function configure() {
    dotenv.config();
    if (!process.env.APP_NAME) {
        console.error("Environment file .env cannot be found");
        process.exit(1);
    } else {
        return {
            appName: process.env.APP_NAME,
            appPort: process.env.APP_PORT,
            dbHost: process.env.DB_HOST,
            dbPort: process.env.DB_PORT,
            dbUser: process.env.DB_USERNAME,
            dbPassword: process.env.DB_PASSWORD,
            dbName: process.env.DB_NAME,
            dbType: process.env.DB_TYPE,
            logActive: process.env.LOG_ACTIVE
        };
    }
    }

## ubah ./app.js
 
    import configure from '../config';
    import express from "express";

    configure();
    const app = express();
    app.listen(process.env.APP_PORT, () => {
    console.log(`${process.env.APP_NAME} listening on port ${process.env.APP_PORT}`);
    })

# RUN APP

    npm run dev

## buat folder src/models


## buat src/models/car.model.js

    export default class Car {
    constructor(id, carName, type, number, color) {
        this.id = id;
        this.carName = carName;
        this.type = type;
        this.number = number;
        this.color = color;
    }
    }

## buat folder src/entities


## buat  src/entities/car.schema.js
  
    import { EntitySchema } from "typeorm";
    import Car from "../models/car.model";

    const CarSchema = new EntitySchema({
    name: "Car",
    target: Car,
    tableName: "car",
    columns: {
        carId: {
            name: "id",
            primary: true,
            type: "bigint",
            generated: true
        },
        carName: {
            name: "car_name",
            type: "varchar",
        },
        type: {
            name: "type",
            type: "varchar",
        },
        number: {
            number: "number",
            type: "varchar"
        },
        color: {
            color: "color",
            type: "varchar"
        }
    }
    });

    export default CarSchema;


## buat src/config/connection.js

    import configure from "./config";
    import { createConnection } from "typeorm";
    import CarSchema from "../entities/car.schema";

    const { dbHost, dbPort, dbUser, dbPassword, dbName, dbType, logActive
    } = configure();

    const createDbConnection = async () => {
    const connection = await
        createConnection({
            type: dbType,
            host: dbHost,
            port: dbPort,
            username: dbUser,
            password: dbPassword,
            database: dbName,
            entities: [ CarSchema ] ,
            logging: logActive
        
        });
    await connection.synchronize();
    return connection;
    }

    export default createDbConnection;


## buat src/app.js

    import configure from "./config/config";
    import { Express } from "express";
    import createDbConnection from "./config/connection";

    configure();
    createDbConnection()
    .then((connection) => {
        if (connection.isConnected) {
            const app = express();
            app.listen(process.env.APP_PORT, () => {
                console.log(`${process.env.APP_NAME} listening on port ${process.env.APP_PORT}`);
            });
        } else {
            throw new Error(`connection failed to ${process.env.DB_HOST} using current credential.`);
        }
    }).catch((error) => {
        console.log("error starting  server");
        console.error(error);
    });

---
# RUN
    npm run dev selesai jalan di server dan konek ke database

---

## buat folder ./src/middleware/

## buat file ./src/middleware/app-middleware.js

    import express from 'express';
    export default express.Router()
    .use(express.json());

Buat CREATE CAR POST  API 

## buat folder ./src/repository/

## buat file ./src/repository/car-repository.js

    import { getRepository } from "typeorm";
import Car from "../models/car.model";

export default class CarRepository {

    carRepository() {
        return getRepository(Car);
    }

    async createCar(car) {
        return await this.carRepository().save(car);
    }

}

## create ./src/services

## create ./src/services/car.service.js


    import CarRepository from "../repositories/car-repositories";

    export default class CarService {


        async addNewCar(car) {
            const result = await new CarRepository().createCar(car); 
        }

    }

## create ./src/routes

## create ./src/routes/car.route.js

import { Router } from "express";
import CarService from "../services/car.service";

const CarRouter = Router()

    .post('/', async (req, res, next) => {
        const car = { ...req.body };
        const result = await new CarService().addNewCar(car);
        res.json(result);
    });

export default CarRouter;

## create ./src/routes/index.js

    import express from "express";
    import CarRouter from "./car.route";

    export default express.Router()
        .use('/car', CarRouter)
        .use((req, res, next) => {
            res.status(404).json({ message: "not found" });
        });

## ubah ./app.js


    import configure from "./config/config";
    import express from "express";
    import createDbConnection from "./config/connection";
    import AppMiddleware from "./middleware/app-middleware"
    import AppRouter from "./routes/index"

    configure();
    createDbConnection()
        .then((connection) => {
            if (connection.isConnected) {
                const app = express();
                app.use(AppMiddleware);
                app.use(AppRouter);
                app.listen(process.env.APP_PORT, () => {
                    console.log(`${process.env.APP_NAME} listening on port ${process.env.APP_PORT}`);
                });
            } else {
                throw new Error(`connection failed to ${process.env.DB_HOST} using current credential.`);
            }
        }).catch((error) => {
            console.log("Error starting  server");
            console.error(error);
        });

---

##RUN APPLICATION

    npm run dev

---

# TAMBAHKAN RESPONSE SAAT ADD NEW CAR

## Tambahkan function findOne(id) pada CarRepository


    async findOne(id) {
        const car = await this.carRepository().find({
            where: {carId: id},
        });
        return car;
    }

## Ubah Add new Car Pada Service

    async addNewCar(car) {
            const result = await new CarRepository().createCar(car);
            return await new CarRepository().findOne(result.carId);
        }

##RUN APPLICATION

coba post api

    npm run dev

---