import { Schema, model, models } from 'mongoose';

const orderSchema = new Schema(
  {
    client: {
      name: {
        type: String,
        required: [true, 'El nombre es requerido'],
        trim: true,
      },
      address: {
        type: String,
        required: [true, 'La direccion es requerida'],
        trim: true,
      },
      addressTwo: {
        type: String,
        trim: true,
      },
      phoneNumber: {
        type: String,
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
    products: [
      {
        name: {
          type: String,
          required: [true, 'El nombre es requerido'],
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
        quantity: {
          type: Number,
          required: [true, 'La cantidad es requerida'],
          trim: true,
        },
        productCategory: {
          type: String,
          required: [true, 'El tipo de producto es requerido'],
          trim: true,
        },
      },
    ],
    status: {
      type: String,
      trim: true,
    },
    createdDate: { type: Date, default: Date.now },
    deliveredDate: { type: Date, default: Date.now },
    observations: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Order || model('Order', orderSchema);
