import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function PreservationPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        <img
          src="https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?ixlib=rb-4.0.3&auto=format&fit=crop&w=2532&q=80"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center opacity-40"
        />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Preserve Your Memories
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              We turn your wedding bouquets, special flowers, and cherished objects into timeless resin art.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
         <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">Services</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              What we offer
            </p>
         </div>

         <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <span className="text-white font-bold">1</span>
                  </div>
                  Bouquet Preservation
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Turn your wedding or special occasion flowers into a block, frame, or functional art piece.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <span className="text-white font-bold">2</span>
                  </div>
                  Custom Blocks
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                   Preserve photos, invitations, or small tokens in crystal clear resin.
                </dd>
              </div>
            </dl>
         </div>
         
         <div className="mt-16 flex justify-center">
            <Link href="/shop?type=preservation_service">
               <Button size="lg">View Preservation Products</Button>
            </Link>
         </div>
      </div>
    </div>
  );
}
