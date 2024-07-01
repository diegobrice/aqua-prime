import ProductCategory from '@/models/product/productCategory';
import { connectDB } from '@/utils/mongoose';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    connectDB();
    const productCategoryFound = await ProductCategory.findById(params.id);

    if (!productCategoryFound)
      return NextResponse.json(
        {
          message: 'Tipo de producto no encontrado',
        },
        {
          status: 404,
        }
      );
    return NextResponse.json(productCategoryFound);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}

export async function DELETE(request, { params }) {
  try {
    const deletedProductCategory = await ProductCategory.findByIdAndDelete(
      params.id
    );

    if (deletedProductCategory) {
      return NextResponse.json(deletedProductCategory);
    } else {
      return NextResponse.json(
        { message: 'Tipo de producto no encontrado' },
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
    const updatedProductCategory = await ProductCategory.findByIdAndUpdate(
      params.id,
      data,
      {
        new: true,
      }
    );
    return NextResponse.json(updatedProductCategory);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}
