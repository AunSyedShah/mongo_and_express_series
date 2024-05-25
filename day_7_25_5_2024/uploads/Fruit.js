import { Schema, model } from "mongoose";

const fruitSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        price: Number,
    }
);

export default model('Fruit', fruitSchema);