import ProductDiscount from '@/models/product/productDiscount';
import { connectDB } from '@/utils/mongoose';
import { NextResponse } from 'next/server';

export async function GET() {
  connectDB();
  const productDiscounts = await ProductDiscount.find();
  return NextResponse.json(productDiscounts);
}

export async function POST(request) {
  try {
    const data = await request.json();
    const newProductDiscount = new ProductDiscount(data);
    const savedProductDiscount = await newProductDiscount.save();
    return NextResponse.json(savedProductDiscount);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}
