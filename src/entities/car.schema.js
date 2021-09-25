import { EntitySchema } from "typeorm";
import Car from "../models/car.model";

const CarSchema = new EntitySchema({
    name: "Car",
    target: Car,
    tableName: "car",
    columns: {
        carId: {
            name: "id",
            primary: true,
            type: "bigint"
        },
        carName: {
            name: "car_name",
            type: "varchar",
        },
        type: {
            name: "type",
            type: "varchar",
        },
        number: {
            number: "number",
            type: "varchar"
        },
        color: {
            color: "color",
            type: "varchar"
        }
    }
});

export default CarSchema;