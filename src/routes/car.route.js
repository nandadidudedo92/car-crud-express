import { Router } from "express";
import CarService from "../services/car.service";

const CarRouter = Router()

    .post('/', async (req, res, next) => {
        const car = { ...req.body };
        const result = await new CarService().addNewCar(car);
        res.json(result);
    });

export default CarRouter;
