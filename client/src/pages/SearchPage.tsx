
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { getProducts, searchProducts, Product } from "../data/products";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SearchPage: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q") || "";
  
  const [results, setResults] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<string>("relevance");
  const [filteredResults, setFilteredResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchAndSearch = async () => {
      setLoading(true);
      try {
        await getProducts(); // Ensure products are loaded
        if (query) {
          const foundProducts = searchProducts(query);
          setResults(foundProducts);
          setFilteredResults(foundProducts);
        }
      } catch (error) {
        console.error('Error searching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndSearch();
  }, [query]);
  
  useEffect(() => {
    // Apply sorting
    const sortProducts = [...results];
    
    switch (sortBy) {
      case "price-asc":
        sortProducts.sort((a, b) => {
          const priceA = a.discountedPrice || a.price;
          const priceB = b.discountedPrice || b.price;
          return priceA - priceB;
        });
        break;
        
      case "price-desc":
        sortProducts.sort((a, b) => {
          const priceA = a.discountedPrice || a.price;
          const priceB = b.discountedPrice || b.price;
          return priceB - priceA;
        });
        break;
        
      default: // relevance - keep original order
        break;
    }
    
    setFilteredResults(sortProducts);
  }, [results, sortBy]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">
              Search Results for "{query}"
            </h1>
            <p className="text-muted-foreground">
              {filteredResults.length} products found
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters */}
            <aside className="w-full md:w-64 space-y-6">
              <div>
                <h3 className="font-medium mb-3">Sort By</h3>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="relevance">Relevance</SelectItem>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Customer Rating</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </aside>
            
            {/* Results */}
            <div className="flex-grow">
              {filteredResults.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredResults.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <h3 className="text-xl font-medium mb-2">No results found</h3>
                  <p className="text-muted-foreground">
                    Try a different search term or browse our categories
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SearchPage;
