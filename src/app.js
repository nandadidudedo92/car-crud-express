import configure from "./config/config";
import express from "express";
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
        console.log("Error starting  server");
        console.error(error);
    });