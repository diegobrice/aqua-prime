import { Schema, model, models } from 'mongoose';

const productDiscountSchema = new Schema(
  {
    product: {
      name: {
        type: String,
      },
      description: {
        type: String,
      },
      price: {
        type: Number,
      },
      productCategory: {
        type: String,
      },
    },
    clientCategory: {
      name: {
        type: String,
      },
    },
    discountedPrice: {
      type: Number,
      required: [true, 'El nuevo precio es requerido.'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.ProductDiscount ||
  model('ProductDiscount', productDiscountSchema);
