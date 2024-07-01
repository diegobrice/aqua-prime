import Product from '@/models/product';
import { connectDB } from '@/utils/mongoose';
import { NextResponse } from 'next/server';

export async function GET() {
  connectDB();
  const products = await Product.find();
  return NextResponse.json(products);
}

export async function POST(request) {
  try {
    const data = await request.json();
    const newProduct = new Product(data);
    const savedProduct = await newProduct.save();
    return NextResponse.json(savedProduct);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}
