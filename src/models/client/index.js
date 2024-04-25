import { Schema, model, models } from 'mongoose';

const clientSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre es requerido'],
      unique: true,
      trim: true,
    },
    address: {
      type: String,
      required: [true, 'La direccion es requerida'],
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: [true, 'El numero celular es requerida'],
      trim: true,
    },
    additionalPhoneNumber: {
      type: String,
      trim: true,
    },
    clientCategory: {
      type: String,
      required: [true, 'El tipo de cliente es requerido'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Client || model('Client', clientSchema);
