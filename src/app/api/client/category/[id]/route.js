import ClientCategory from '@/models/client/clientCategory';
import { connectDB } from '@/utils/mongoose';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    connectDB();
    const clientCategoryFound = await ClientCategory.findById(params.id);

    if (!clientCategoryFound)
      return NextResponse.json(
        {
          message: 'Tipo de cliente no encontrado',
        },
        {
          status: 404,
        }
      );
    return NextResponse.json(clientCategoryFound);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}

export async function DELETE(request, { params }) {
  try {
    const deletedClientCategory = await ClientCategory.findByIdAndDelete(
      params.id
    );

    if (deletedClientCategory) {
      return NextResponse.json(deletedClientCategory);
    } else {
      return NextResponse.json(
        { message: 'Tipo de cliente no encontrado' },
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
    const updatedClientCategory = await ClientCategory.findByIdAndUpdate(
      params.id,
      data,
      {
        new: true,
      }
    );
    return NextResponse.json(updatedClientCategory);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}
