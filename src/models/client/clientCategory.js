import { Schema, model, models } from 'mongoose';

const clientCategorySchema = new Schema(
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

export default models.ClientCategory ||
  model('ClientCategory', clientCategorySchema);
