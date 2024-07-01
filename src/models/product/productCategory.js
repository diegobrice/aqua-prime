import { Schema, model, models } from 'mongoose';

const productCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre es requerido'],
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.ProductCategory ||
  model('ProductCategory', productCategorySchema);
