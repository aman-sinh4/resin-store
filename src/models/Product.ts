import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
    title: string;
    description: string;
    category: string;
    price: number;
    discountPrice?: number;
    images: string[];
    stock: number;
    type: 'raw_material' | 'preservation_service';
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        category: { type: String, required: true },
        price: { type: Number, required: true },
        discountPrice: { type: Number },
        images: { type: [String], required: true },
        stock: { type: Number, required: true, default: 0 },
        type: {
            type: String,
            enum: ['raw_material', 'preservation_service'],
            required: true,
        },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

const Product: Model<IProduct> =
    mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
