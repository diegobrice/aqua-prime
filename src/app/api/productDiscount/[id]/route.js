import ProductDiscount from '@/models/product/productDiscount';
import { connectDB } from '@/utils/mongoose';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    connectDB();
    const productDiscountFound = await ProductDiscount.findById(params.id);

    if (!productDiscountFound)
      return NextResponse.json(
        {
          message: 'Descuento de producto no encontrado',
        },
        {
          status: 404,
        }
      );
    return NextResponse.json(productDiscountFound);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}

export async function DELETE(request, { params }) {
  try {
    const deletedProductDiscount = await ProductDiscount.findByIdAndDelete(
      params.id
    );

    if (deletedProductDiscount) {
      return NextResponse.json(deletedProductDiscount);
    } else {
      return NextResponse.json(
        { message: 'Descuento de producto no encontrado' },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const updatedProductDiscount = await ProductDiscount.findByIdAndUpdate(
      params.id,
      data,
      {
        new: true,
      }
    );
    return NextResponse.json(updatedProductDiscount);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}
