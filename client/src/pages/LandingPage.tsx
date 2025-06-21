
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CategoryCarousel from "../components/CategoryCarousel";
import CategoryBanner from "@/components/CategoryBanner";
import FlashSalesCarousel from "../components/FlashSalesCarousel"
import HeroCarousel from "../components/HeroCarousel";
import {
  getProducts,
  getProductsByCategoryAndSubCategory,
  Product,
} from "../data/products";
import { categories, getMainCategories } from "../data/categories";
import { Badge } from "@/components/ui/badge";
import { Zap, ShoppingBag } from "lucide-react";

const LandingPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const flashSaleProducts = products.filter((p) => p.price).slice(0, 8);
  const mainCategories = getMainCategories();

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <Navbar />
        <main className="flex-grow flex items-center justify-center px-4">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 md:h-16 md:w-16 border-4 border-blue-600 border-t-transparent mx-auto" />
            <p className="text-gray-600 font-medium text-sm md:text-base">Loading amazing products...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-4 md:py-6 lg:py-10 xl:py-14 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <HeroCarousel />
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 space-y-10 md:space-y-16">
          <CategoryBanner />
          {/* Flash Sales Section */}
          {flashSaleProducts.length > 0 && (
            <section className="space-y-4 md:space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-4">
                {/* Left: Icon + Title */}
                <div className="flex items-start sm:items-center gap-3 md:gap-4">
                  <div className="p-2 md:p-3 bg-red-100 rounded-full">
                    <Zap className="h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-red-600" />
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">Flash Sales</h2>
                    <p className="text-gray-600 text-sm md:text-base">
                      Limited time offers - Grab them fast!
                    </p>
                  </div>
                </div>

                {/* Right: Flash Badge */}
                <div className="self-start sm:self-auto">
                  <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse text-xs md:text-sm lg:text-base px-2 py-1 md:px-3 md:py-1 lg:px-4 lg:py-2">
                    Ends Soon! ⚡
                  </Badge>
                </div>
              </div>

              {/* Carousel */}
              <FlashSalesCarousel products={flashSaleProducts} />
            </section>
          )}

          {/* Category Carousels */}
          <div className="space-y-12 md:space-y-20">
            {categories.map((category) => {
              const categoryProducts = getProductsByCategoryAndSubCategory(
                category.category,
                category.subCategory
              ).slice(0, 10);

              return (
                <CategoryCarousel
                  key={category.id}
                  categoryName={category.name}
                  categoryId={category.id}
                  products={categoryProducts}
                />
              );
            })}
          </div>

          {/* No Products Message */}
          {products.length === 0 && (
            <div className="text-center py-12 md:py-16 bg-white rounded-xl md:rounded-2xl shadow-lg">
              <div className="space-y-4 px-4">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                  <ShoppingBag className="h-8 w-8 md:h-10 md:w-10 text-gray-400" />
                </div>
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">No Products Available</h3>
                <p className="text-gray-600 text-sm md:text-base lg:text-lg">
                  Products will appear here once they're loaded from the server.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
