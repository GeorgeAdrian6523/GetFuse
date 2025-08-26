import Link from 'next/link';
import { getProducts } from '../../lib/woocommerce';


export default async function Home() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
            Premium Products
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Discover our curated collection of exceptional products designed to enhance your lifestyle
          </p>
          <Link
            href="#products"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our handpicked selection of premium products
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product: any) => (
              <Link
                href={`/products/${product.slug}`}
                key={product.id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.images[0]?.src || '/api/placeholder/300/300'}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>

                  <div className="mb-4">
                    <div
                      className="text-gray-600 text-sm line-clamp-2"
                      dangerouslySetInnerHTML={{
                        __html: product.short_description || product.description
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div
                      className="text-2xl font-bold text-blue-600"
                      dangerouslySetInnerHTML={{ __html: product.price_html }}
                    />
                    <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium group-hover:bg-blue-700 transition-colors">
                      View Details
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">&copy; 2025 Premium Products. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}