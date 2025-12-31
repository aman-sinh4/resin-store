import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="border-t border-neutral-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <span className="text-xl font-bold tracking-tight text-neutral-900">Resin Store</span>
            <p className="mt-4 max-w-xs text-sm text-neutral-500">
              Premium resin supplies and preservation services for artists and memory keepers.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-neutral-900">Shop</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/shop" className="text-sm text-neutral-500 hover:text-black">
                  Raw Materials
                </Link>
              </li>
              <li>
                <Link href="/preservation" className="text-sm text-neutral-500 hover:text-black">
                  Preservation Services
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-neutral-900">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/about" className="text-sm text-neutral-500 hover:text-black">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-neutral-500 hover:text-black">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-neutral-500 hover:text-black">
                  Terms & Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-neutral-100 pt-8">
          <p className="text-center text-xs text-neutral-400">
            &copy; {new Date().getFullYear()} Resin Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
