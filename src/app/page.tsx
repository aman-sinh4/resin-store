'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Sparkles, Box, Palette, Layers, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="flex flex-col w-full overflow-hidden bg-white dark:bg-neutral-950 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative w-full py-24 md:py-32 lg:py-48 bg-neutral-50 dark:bg-neutral-950 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-30 dark:opacity-20">
           <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-200 dark:bg-blue-900/40 blur-[100px]" />
           <div className="absolute top-[30%] -right-[10%] w-[40%] h-[60%] rounded-full bg-purple-200 dark:bg-purple-900/40 blur-[100px]" />
        </div>

        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="flex flex-col items-center space-y-6 text-center max-w-3xl mx-auto">
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.5 }}
               className="inline-flex items-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm px-3 py-1 text-sm font-medium text-neutral-800 dark:text-neutral-200 shadow-sm mb-4"
            >
              <Sparkles className="mr-2 h-3.5 w-3.5 text-amber-500" />
              <span>Premium Quality Art Supplies</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl font-extrabold tracking-tight sm:text-6xl xl:text-7xl/none text-neutral-900 dark:text-white"
            >
              Master the Art of <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Resin & Memory</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto max-w-[700px] text-neutral-700 dark:text-neutral-300 md:text-xl font-light leading-relaxed"
            >
              Everything you need to create stunning resin art, or trust our expert artisans to preserve your most precious botanicals forever.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4 pt-4"
            >
              <Link href="/shop">
                <Button size="lg" className="rounded-full px-8 shadow-lg shadow-blue-900/10 hover:shadow-blue-900/20 dark:text-white">
                  Shop Materials <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/preservation">
                <Button variant="outline" size="lg" className="rounded-full px-8 bg-white/60 dark:bg-neutral-900/60 hover:bg-white dark:hover:bg-neutral-900 backdrop-blur-sm dark:text-white dark:border-neutral-700">
                  Explore Preservation
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Split Journey Section */}
      <section className="w-full py-20 bg-white dark:bg-neutral-900 relative z-20">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
            
            {/* Raw Materials Card */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-3xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/50 p-10 transition-all hover:shadow-2xl hover:shadow-blue-900/5 hover:border-blue-100 dark:hover:border-blue-900"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                 <Box className="w-48 h-48 text-blue-600 dark:text-blue-400" />
              </div>
              
              <div className="relative z-10 flex flex-col items-start h-full">
                <div className="rounded-2xl bg-white dark:bg-neutral-900 p-4 shadow-sm mb-6">
                  <Palette className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-3xl font-bold mb-3 text-neutral-900 dark:text-white">For Creators</h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-lg mb-8 leading-relaxed">
                  Source the finest crystal-clear resin, vivid pigments, and durable molds. 
                  Designed for artists who demand perfection.
                </p>
                <div className="mt-auto">
                  <Link href="/shop">
                    <Button variant="outline" className="rounded-full border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300">
                      Browse Shop
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Preservation Services Card */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-3xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/50 p-10 transition-all hover:shadow-2xl hover:shadow-purple-900/5 hover:border-purple-100 dark:hover:border-purple-900"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                 <Layers className="w-48 h-48 text-purple-600 dark:text-purple-400" />
              </div>

              <div className="relative z-10 flex flex-col items-start h-full">
                <div className="rounded-2xl bg-white dark:bg-neutral-900 p-4 shadow-sm mb-6">
                  <Award className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-3xl font-bold mb-3 text-neutral-900 dark:text-white">For Memories</h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-lg mb-8 leading-relaxed">
                  Trust our preservation experts to turn your wedding bouquets and cherished 
                  flowers into timeless, crystal-clear keepsakes.
                </p>
                <div className="mt-auto">
                  <Link href="/preservation">
                    <Button variant="outline" className="rounded-full border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300">
                      View Services
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Trust/Feature Indicators */}
      <section className="py-16 bg-white dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800">
         <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
               <div className="p-6">
                  <h4 className="text-lg font-bold mb-2 text-neutral-900 dark:text-white">Premium Quality</h4>
                  <p className="text-neutral-600 dark:text-neutral-400">Sourced from top global manufacturers.</p>
               </div>
               <div className="p-6">
                  <h4 className="text-lg font-bold mb-2 text-neutral-900 dark:text-white">Expert Support</h4>
                  <p className="text-neutral-600 dark:text-neutral-400">Guided by professional resin artists.</p>
               </div>
               <div className="p-6">
                  <h4 className="text-lg font-bold mb-2 text-neutral-900 dark:text-white">Secure Shipping</h4>
                  <p className="text-neutral-600 dark:text-neutral-400">Pan-India delivery with careful packaging.</p>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
