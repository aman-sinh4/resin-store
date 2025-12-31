import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Product from '@/models/Product';
import bcrypt from 'bcryptjs';

export async function GET() {
    if (process.env.NODE_ENV === 'production') {
        return NextResponse.json({ error: 'Not allowed in production' }, { status: 403 });
    }

    try {
        await dbConnect();

        // Seed Admin
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@resinstore.com';
        const existingAdmin = await User.findOne({ email: adminEmail });

        if (!existingAdmin) {
            const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10);
            await User.create({
                name: 'Admin User',
                email: adminEmail,
                passwordHash,
                role: 'admin',
            });
            console.log('Admin user created');
        }

        // Seed Products
        const productCount = await Product.countDocuments();
        if (productCount === 0) {
            const products = [
                {
                    title: 'Crystal Clear Resin 2:1 (1.5KG)',
                    description: 'High gloss, bubble-free epoxy resin for art and craft. Includes 1kg Resin + 500g Hardener.',
                    category: 'Resin',
                    price: 1850,
                    images: ['https://placehold.co/600x400/png?text=Resin+2:1'],
                    stock: 50,
                    type: 'raw_material',
                },
                {
                    title: 'Premium Silicone Coaster Mold',
                    description: 'Durable silicone mold for making geode style coasters.',
                    category: 'Molds',
                    price: 250,
                    images: ['https://placehold.co/600x400/png?text=Coaster+Mold'],
                    stock: 100,
                    type: 'raw_material',
                },
                {
                    title: 'Bridal Bouquet Preservation',
                    description: 'Preserve your wedding flowers in a beautiful resin block forever.',
                    category: 'Preservation',
                    price: 12000,
                    images: ['https://placehold.co/600x400/png?text=Bouquet+Preservation'],
                    stock: 10,
                    type: 'preservation_service',
                },
            ];
            await Product.insertMany(products);
            console.log('Products seeded');
        }

        return NextResponse.json({ success: true, message: 'Database seeded successfully' });
    } catch (error) {
        console.error('Seed Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
