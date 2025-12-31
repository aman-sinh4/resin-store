import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import Product from '@/models/Product'; // To check stock

// GET: Fetch all orders (Admin)
export async function GET(req: Request) {
    try {
        await dbConnect();
        const orders = await Order.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: orders });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        const { customer, items, total } = await req.json();

        // 1. Create Order
        const order = await Order.create({
            customerName: customer.name,
            email: customer.email,
            phone: customer.phone,
            address: {
                street: customer.street,
                city: customer.city,
                state: customer.state,
                zip: customer.zip,
            },
            items: items.map((i: any) => ({
                productId: i.productId,
                title: i.title,
                quantity: i.quantity,
                price: i.price
            })),
            totalAmount: total,
            paymentMethod: 'cod_test', // or 'razorpay'
            paymentStatus: 'pending',
        });

        // 2. Reduce Stock (Basic implementation) (Optional for now)
        // for (const item of items) {
        //   await Product.findByIdAndUpdate(item.productId, { $inc: { stock: -item.quantity } });
        // }

        return NextResponse.json({ success: true, orderId: order._id }, { status: 201 });
    } catch (error) {
        console.error('Create Order Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
