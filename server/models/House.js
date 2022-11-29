import { Schema } from "mongoose";



export const HouseSchema = new Schema(
  {
    year: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    levels: { type: Number, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    imgUrl: { type: String, required: true, maxLength: 255 }
  }
)