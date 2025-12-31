import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IOrderItem {
    productId: mongoose.Types.ObjectId;
    title: string;
    quantity: number;
    price: number;
}

export interface IOrder extends Document {
    customerName: string;
    email: string;
    phone: string;
    address: {
        street: string;
        city: string;
        state: string;
        zip: string;
    };
    items: IOrderItem[];
    totalAmount: number;
    paymentMethod: string;
    paymentStatus: 'pending' | 'paid' | 'failed';
    razorpayOrderId?: string;
    razorpayPaymentId?: string;
    orderStatus: 'placed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    createdAt: Date;
    updatedAt: Date;
}

const OrderSchema: Schema = new Schema(
    {
        customerName: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        address: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            zip: { type: String, required: true },
        },
        items: [
            {
                productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
                title: { type: String, required: true },
                quantity: { type: Number, required: true },
                price: { type: Number, required: true },
            },
        ],
        totalAmount: { type: Number, required: true },
        paymentMethod: { type: String, required: true },
        paymentStatus: {
            type: String,
            enum: ['pending', 'paid', 'failed'],
            default: 'pending',
        },
        razorpayOrderId: { type: String },
        razorpayPaymentId: { type: String },
        orderStatus: {
            type: String,
            enum: ['placed', 'processing', 'shipped', 'delivered', 'cancelled'],
            default: 'placed',
        },
    },
    { timestamps: true }
);

const Order: Model<IOrder> =
    mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
