import CarRepository from "../repositories/car-repositories";

export default class CarService {


    async addNewCar(car) {
        const result = await new CarRepository().createCar(car); 
    }

}