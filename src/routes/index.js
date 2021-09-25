import express from "express";
import CarRouter from "./car.route";

export default express.Router()
    .use('/car', CarRouter)
    .use((req, res, next) => {
        res.status(404).json({ message: "not found" });
    });