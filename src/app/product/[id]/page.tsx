import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import { notFound } from 'next/navigation';
import ProductDetailClient from './client'; // Separating client logic

// Server Component for fetching data
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  
  const { id } = await params;

  // Validate ID format (basic check)
  if (id.length !== 24) {
    notFound();
  }

  const product = await Product.findById(id);

  if (!product) {
    notFound();
  }

  // Serializable object
  const productJson = JSON.parse(JSON.stringify(product));

  return <ProductDetailClient product={productJson} />;
}
