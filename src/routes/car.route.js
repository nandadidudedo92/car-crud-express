import { Router } from "express";
import CarService from "../services/car.service";

const CarRouter = Router()

    .post('/addNewCar', async (req, res, next) => {
        try {
            const car = { ...req.body };
            const result = await new CarService().addNewCar(car);
            res.json(result);
        } catch (error) {
            res.json(error.message);
        }
        
    })

    .get('/getall', async (req, res, next) => {
        try {
            const result = await new CarService().findAllCar();
            res.json(result);
        } catch (error) {
            res.json(error.message)
        }
    })
    
    .get('/deleteCar', async (req, res, next) => {
        try {
            const result = await new CarService().deleteCar(req.query.id);
            res.json(result);
        } catch (error) {
            res.json(error.message)
        }
    })
    ;

export default CarRouter;
