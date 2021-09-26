import { getRepository } from "typeorm";
import Car from "../models/car.model";

export default class CarRepository {

    carRepository() {
        return getRepository(Car);
    }

    async createCar(car) {
        try {
            const result = await this.carRepository().save(car);
            return result;
        } catch (err) {
            throw err;
        }
    }

    async findOne(id) {
        const car = await this.carRepository().findOne({
            where: {id: id}
        });
        return car;
    }

    async findAll() {
        const carList = await this.carRepository().find();
        return carList;
    }

    async deleteCar(id) {

        const result = await this.carRepository().delete(id);

        if (result.affected == 1) {
            return "Delete Success "+id ;
        } else {
            throw new Error(`delete data with id : ${id} failed`);
        }

         
    }

}