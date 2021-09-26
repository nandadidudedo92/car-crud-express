import CarRepository from "../repositories/car-repositories";
import CommonResponseGenerator from "../middleware/common-response-generator";

export default class CarService {


    async addNewCar(car) {
        try {
            const result = await new CarRepository().createCar(car);
            return new CommonResponseGenerator().commonSuccessGenerator("Success", await new CarRepository().findOne(result.id));
        } catch (err) {
            return new CommonResponseGenerator().commonFailedGenerator(err.message);
        }
        
    }

    async findAllCar() {
        try {
            return new CommonResponseGenerator().commonSuccessGenerator("Success", await new CarRepository().findAll());
        } catch (err) {
            return new CommonResponseGenerator().commonFailedGenerator(err.message);
        }
    }

    async deleteCar(id) {
        try {
            return new CommonResponseGenerator().commonSuccessGenerator("Success", await new CarRepository().deleteCar(id));
        } catch (err) {
            return new CommonResponseGenerator().commonFailedGenerator(err.message);
        }
    }


}