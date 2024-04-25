import Client from '@/models/client';
import { connectDB } from '@/utils/mongoose';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    connectDB();
    const clientFound = await Client.findById(params.id);

    if (!clientFound)
      return NextResponse.json(
        {
          message: 'Cliente no encontrado',
        },
        {
          status: 404,
        }
      );
    return NextResponse.json(clientFound);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}

export async function DELETE(request, { params }) {
  try {
    const deletedClient = await Client.findByIdAndDelete(params.id);

    if (deletedClient) {
      return NextResponse.json(deletedClient);
    } else {
      return NextResponse.json(
        { message: 'Cliente no encontrado' },
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
    const updatedClient = await Client.findByIdAndUpdate(params.id, data, {
      new: true,
    });
    return NextResponse.json(updatedClient);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}
