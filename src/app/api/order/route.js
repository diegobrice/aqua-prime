import Order from '@/models/order';
import { connectDB } from '@/utils/mongoose';
import { NextResponse } from 'next/server';

export async function GET() {
  connectDB();
  const orders = await Order.find();
  return NextResponse.json(orders);
}

export async function POST(request) {
  try {
    const data = await request.json();
    const newOrder = new Order(data);
    const savedOrder = await newOrder.save();
    return NextResponse.json(savedOrder);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}
