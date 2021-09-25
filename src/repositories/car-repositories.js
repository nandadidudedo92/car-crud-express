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