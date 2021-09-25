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

