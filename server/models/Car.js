import { Schema } from "mongoose";



export const CarSchema = new Schema(
  {
    make: { type: String, required: true },//required means exactly what you think
    model: { type: String, required: true },
    year: { type: Number, required: true },
    description: { type: String },
    imgUrl: { type: String, required: true, maxLength: 255 },//maxLength is a way to verofy data
    color: { type: String },
    price: { type: Number, required: true, default: 1 } //default sets value if one isn't given
  },
  { timestamps: true, toJSON: { virtuals: true } }//second object is the options object
)