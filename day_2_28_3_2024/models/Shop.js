import { Schema, model } from "mongoose";

const shopSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: String,
        products: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Product'
            }
        ]
    }
);

const Shop = model('Shop', shopSchema);

export default Shop;