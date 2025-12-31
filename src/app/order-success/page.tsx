import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { CheckCircle } from 'lucide-react';

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId: string }>;
}) {
  const { orderId } = await searchParams;
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center bg-white dark:bg-neutral-950 px-4 py-16 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
        <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-500" />
      </div>
      <h1 className="mt-8 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">Order Placed Successfully!</h1>
      <p className="mt-4 text-neutral-600 dark:text-neutral-400">
        Thank you for shopping with us. Your order ID is <span className="font-mono text-black dark:text-white">{orderId}</span>
      </p>
      <div className="mt-10">
        <Link href="/">
          <Button size="lg">Return to Home</Button>
        </Link>
      </div>
    </div>
  );
}
