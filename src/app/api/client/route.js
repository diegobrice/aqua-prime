import Client from '@/models/client';
import { connectDB } from '@/utils/mongoose';
import { NextResponse } from 'next/server';

export async function GET() {
  connectDB();
  const clients = await Client.find();
  return NextResponse.json(clients);
}

export async function POST(request) {
  try {
    const data = await request.json();
    const newClient = new Client(data);
    const savedClient = await newClient.save();
    return NextResponse.json(savedClient);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}
