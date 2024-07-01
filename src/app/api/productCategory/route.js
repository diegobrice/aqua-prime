import ProductCategory from '@/models/product/productCategory';
import { connectDB } from '@/utils/mongoose';
import { NextResponse } from 'next/server';

export async function GET() {
  connectDB();
  const productCategories = await ProductCategory.find();
  return NextResponse.json(productCategories);
}

export async function POST(request) {
  try {
    const data = await request.json();
    const newProductCategory = new ProductCategory(data);
    const savedProductCategory = await newProductCategory.save();
    return NextResponse.json(savedProductCategory);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}
