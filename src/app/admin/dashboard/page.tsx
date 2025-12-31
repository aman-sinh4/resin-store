export default function AdminDashboardHome() {
  return (
    <div className="px-4 py-8 sm:px-0">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Card 1 */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-5">
            <div className="flex items-center">
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">Total Orders</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">12 (Demo)</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-5">
            <div className="flex items-center">
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">Total Sales</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">₹45,000 (Demo)</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3 */}
         <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-5">
            <div className="flex items-center">
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">Products in Stock</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">25 (Demo)</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
