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