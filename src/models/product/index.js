import { Schema, model, models } from 'mongoose';

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre es requerido'],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'La descripción es requerida'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'El precio es requerido'],
      trim: true,
    },
    productCategory: {
      type: String,
      required: [true, 'El tipo de producto es requerido'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Product || model('Product', productSchema);
