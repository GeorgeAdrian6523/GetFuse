import Link from "next/link";
import { getProductBySlug, getProductsByCategory } from "../../../../lib/woocommerce";
import { notFound } from "next/navigation";
import BundleCard from "../../components/BundleCard";
import BundleSelector from '../../components/BundleSelector';

export default async function ProductPage(props: { params: Promise<{ slug: string }> }) {
    const { slug } = await props.params;
    const product = await getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    // Check if product belongs to "bundle" category
    const isBundle = product.categories.some(
        (c: any) => c.slug.toLowerCase() === "bundles"
    );

    let bundleProducts: any[] = [];
    if (isBundle) {
        // category "BUNDLES" has id = 55
        bundleProducts = await getProductsByCategory(55);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Navigation */}
            <nav className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <Link
                        href="/"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                    >
                        ← Back to Products
                    </Link>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* ✅ Always show single product layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Product Images */}
                    <div className="space-y-4">
                        <div className="aspect-square bg-white rounded-2xl shadow-lg overflow-hidden">
                            <img
                                src={product.images[0]?.src || "/api/placeholder/600/600"}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {product.images.length > 1 && (
                            <div className="grid grid-cols-4 gap-2">
                                {product.images.slice(1, 5).map((image: any, index: number) => (
                                    <div
                                        key={index}
                                        className="aspect-square bg-white rounded-lg shadow overflow-hidden"
                                    >
                                        <img
                                            src={image.src}
                                            alt={`${product.name} view ${index + 2}`}
                                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        {/* Title + Price */}
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">
                                {product.name}
                            </h1>
                            <div
                                className="text-4xl font-bold text-blue-600 mb-6"
                                dangerouslySetInnerHTML={{ __html: product.price_html }}
                            />
                        </div>

                        {/* Description */}
                        <div className="prose prose-lg max-w-none">
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: product.description || product.short_description,
                                }}
                            />
                        </div>

                        {/* Product Details */}
                        <div className="bg-white rounded-xl p-6 shadow-lg">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                Product Details
                            </h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="font-medium text-gray-600">SKU:</span>
                                    <span className="ml-2 text-gray-900">
                                        {product.sku || "N/A"}
                                    </span>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-600">Stock:</span>
                                    <span
                                        className={`ml-2 ${product.in_stock ? "text-green-600" : "text-red-600"
                                            }`}
                                    >
                                        {product.in_stock ? "In Stock" : "Out of Stock"}
                                    </span>
                                </div>
                                {product.weight && (
                                    <div>
                                        <span className="font-medium text-gray-600">Weight:</span>
                                        <span className="ml-2 text-gray-900">{product.weight}</span>
                                    </div>
                                )}
                                {product.dimensions && (
                                    <div>
                                        <span className="font-medium text-gray-600">Dimensions:</span>
                                        <span className="ml-2 text-gray-900">
                                            {product.dimensions.length}×{product.dimensions.width}×
                                            {product.dimensions.height}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Add to Cart (for non-bundle) */}
                        {!isBundle && (
                            <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl p-6 text-white">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl font-semibold">Ready to order?</h3>
                                        <p className="text-blue-100">Get this amazing product today!</p>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="flex items-center bg-white/10 rounded-lg px-4 py-2">
                                        <label htmlFor="quantity" className="mr-3 font-medium">
                                            Qty:
                                        </label>
                                        <select
                                            id="quantity"
                                            className="bg-transparent border-none outline-none text-white font-medium"
                                            defaultValue="1"
                                        >
                                            {[...Array(10)].map((_, i) => (
                                                <option
                                                    key={i + 1}
                                                    value={i + 1}
                                                    className="text-gray-900"
                                                >
                                                    {i + 1}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <button
                                        className={`flex-1 py-3 px-8 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${product.in_stock
                                            ? "bg-white text-blue-600 hover:bg-blue-50 shadow-lg"
                                            : "bg-gray-400 text-gray-600 cursor-not-allowed"
                                            }`}
                                        disabled={!product.in_stock}
                                    >
                                        {product.in_stock ? "Add to Cart" : "Out of Stock"}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Categories */}
                        {product.categories && product.categories.length > 0 && (
                            <div>
                                <h4 className="font-medium text-gray-900 mb-2">Categories:</h4>
                                <div className="flex flex-wrap gap-2">
                                    {product.categories.map((category: any) => (
                                        <span
                                            key={category.id}
                                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                                        >
                                            {category.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* ✅ Bundle section */}
                {isBundle && (
                    <div className="mt-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            Vælg din Bundle
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <BundleCard
                                name="Lite"
                                price="129 kr."
                                size={30}
                                flavours={["Passion Fruit", "Cranberry", "Mango", "Apple"]}
                            />
                            <BundleCard
                                name="Medium"
                                price="209 kr."
                                size={60}
                                flavours={["Passion Fruit", "Cranberry", "Mango", "Apple"]}
                            />
                            <BundleCard
                                name="Large"
                                price="319 kr."
                                size={100}
                                flavours={["Passion Fruit", "Cranberry", "Mango", "Apple"]}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
