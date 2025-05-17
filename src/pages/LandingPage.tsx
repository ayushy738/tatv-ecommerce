
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import CategorySection from "../components/CategorySection";
import { categories } from "../data/categories";
import { getFlashDeals, getProductsByCategory } from "../data/products";

const LandingPage: React.FC = () => {
  const flashDeals = getFlashDeals();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Shop Smarter with <span className="text-primary">Tatv</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover amazing products at unbeatable prices. Your one-stop destination for all things trendy and essential.
            </p>
          </div>
        </section>
        
        {/* Flash Deals Section */}
        <section className="py-12 bg-muted">
          <div className="container">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Flash Deals</h2>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Ends in:</span>
                <span className="bg-destructive text-white px-2 py-1 rounded text-sm">23:59:59</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {flashDeals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Categories Sections */}
        {categories.map((category) => (
          <CategorySection
            key={category.id}
            category={category}
            products={getProductsByCategory(category.id).slice(0, 4)}
          />
        ))}
      </main>
      
      <Footer />
    </div>
  );
};

export default LandingPage;
