import Order from '@/models/order';
import { connectDB } from '@/utils/mongoose';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    connectDB();
    const orderFound = await Order.findById(params.id);

    if (!orderFound)
      return NextResponse.json(
        {
          message: 'Pedido no encontrado',
        },
        {
          status: 404,
        }
      );
    return NextResponse.json(orderFound);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}

export async function DELETE(request, { params }) {
  try {
    const deletedOrder = await Order.findByIdAndDelete(params.id);

    if (deletedOrder) {
      return NextResponse.json(deletedOrder);
    } else {
      return NextResponse.json(
        { message: 'Pedido no encontrado' },
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
    const updatedOrder = await Order.findByIdAndUpdate(params.id, data, {
      new: true,
    });
    return NextResponse.json(updatedOrder);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}
