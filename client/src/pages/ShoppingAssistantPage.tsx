
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { getProducts, Product } from "../data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Sparkles } from "lucide-react";

const ShoppingAssistantPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        setAllProducts(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      // Filter products based on query keywords
      const filtered = allProducts.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description?.toLowerCase().includes(query.toLowerCase()) ||
        product.category?.toLowerCase().includes(query.toLowerCase()) ||
        product.subCategory?.toLowerCase().includes(query.toLowerCase())
      );
      
      setRecommendations(filtered.slice(0, 8));
      setIsLoading(false);
    }, 1500);
  };

  const suggestedQueries = [
    "Show me comfortable running shoes",
    "I need wireless headphones under ₹5000",
    "Find trendy women's shoes",
    "Smart watches with fitness tracking",
    "Casual footwear for daily use"
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header */}
        <section className="bg-gradient-to-r from-purple-600 to-blue-600 py-16 text-white">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <Sparkles className="h-8 w-8 mr-3" />
                <h1 className="text-4xl font-bold">Shopping Assistant</h1>
              </div>
              <p className="text-xl opacity-90 mb-8">
                Tell me what you're looking for and I'll help you find the perfect products
              </p>
              
              {/* Search Input */}
              <div className="flex gap-4 max-w-2xl mx-auto">
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="What are you looking for? (e.g., comfortable running shoes under ₹3000)"
                  className="flex-1 text-gray-900"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button 
                  onClick={handleSearch}
                  className="bg-white text-purple-600 hover:bg-gray-100"
                  disabled={isLoading}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        <div className="container py-12">
          {/* Suggested Queries */}
          {!recommendations.length && !isLoading && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-purple-600" />
                  Try these suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {suggestedQueries.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setQuery(suggestion);
                        setTimeout(handleSearch, 100);
                      }}
                      className="text-left justify-start"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Finding the best products for you...</p>
            </div>
          )}

          {/* Recommendations */}
          {recommendations.length > 0 && !isLoading && (
            <div>
              <h2 className="text-2xl font-bold mb-6">
                Here's what I found for "{query}"
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {recommendations.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {recommendations.length === 0 && !isLoading && query && (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">
                Try different keywords or browse our categories
              </p>
              <Button onClick={() => setQuery("")}>Try again</Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ShoppingAssistantPage;
