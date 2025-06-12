
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import FlashSalesCarousel from "../components/FlashSalesCarousel";
import CategoryBanner from "../components/CategoryBanner";
import HeroCarousel from "../components/HeroCarousel";
import { getProducts, Product } from "../data/products";
import { Badge } from "@/components/ui/badge";
import { Zap, TrendingUp, ShoppingBag } from "lucide-react";

const LandingPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </main>
        <Footer />
      </div>
    );
  }

  const flashSaleProducts = products.filter(p => p.discountedPrice).slice(0, 8);
  const trendingProducts = products.filter(p => p.bestseller).slice(0, 8);
  const newArrivals = products.slice(0, 6);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Carousel Section */}
        <section className="relative py-8 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
          <div className="container">
            <HeroCarousel />
          </div>
        </section>

        <div className="container py-12">
          {/* Category Banner */}
          <CategoryBanner />

          {/* Flash Sales */}
          {flashSaleProducts.length > 0 && (
            <section className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-full">
                    <Zap className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">Flash Sales</h2>
                    <p className="text-gray-600">Limited time offers - Grab them fast!</p>
                  </div>
                </div>
                <Badge className="bg-red-500 text-white animate-pulse">
                  Ends Soon!
                </Badge>
              </div>
              <FlashSalesCarousel products={flashSaleProducts} />
            </section>
          )}

          {/* Trending Products */}
          {trendingProducts.length > 0 && (
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-orange-100 rounded-full">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Trending Now</h2>
                  <p className="text-gray-600">Most popular products this week</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {trendingProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}

          {/* New Arrivals */}
          {newArrivals.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-blue-100 rounded-full">
                  <ShoppingBag className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">New Arrivals</h2>
                  <p className="text-gray-600">Fresh products just for you</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {newArrivals.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}

          {/* No Products Message */}
          {products.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Products Available</h3>
              <p className="text-gray-600">Products will appear here once they're loaded from the server.</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LandingPage;
