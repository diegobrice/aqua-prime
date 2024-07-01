import Product from '@/models/product';
import { connectDB } from '@/utils/mongoose';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    connectDB();
    const productFound = await Product.findById(params.id);

    if (!productFound)
      return NextResponse.json(
        {
          message: 'Producto no encontrado',
        },
        {
          status: 404,
        }
      );
    return NextResponse.json(productFound);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}

export async function DELETE(request, { params }) {
  try {
    const deletedProduct = await Product.findByIdAndDelete(params.id);

    if (deletedProduct) {
      return NextResponse.json(deletedProduct);
    } else {
      return NextResponse.json(
        { message: 'Producto no encontrado' },
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
    const updatedProduct = await Product.findByIdAndUpdate(params.id, data, {
      new: true,
    });
    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}
