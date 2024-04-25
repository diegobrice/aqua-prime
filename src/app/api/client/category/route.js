import ClientCategory from '@/models/client/clientCategory';
import { connectDB } from '@/utils/mongoose';
import { NextResponse } from 'next/server';

export async function GET() {
  connectDB();
  const clientCategories = await ClientCategory.find();
  return NextResponse.json(clientCategories);
}

export async function POST(request) {
  try {
    const data = await request.json();
    const newClientCategory = new ClientCategory(data);
    const savedClientCategory = await newClientCategory.save();
    return NextResponse.json(savedClientCategory);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}
