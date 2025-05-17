
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { getProductById, getProductsByCategory, Product } from "../data/products";
import { useCart } from "../context/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  
  const product = id ? getProductById(id) : undefined;
  
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Product Not Found</h2>
          <Button 
            onClick={() => navigate("/")}
            className="mt-4"
          >
            Return to Home
          </Button>
        </div>
      </div>
    );
  }
  
  const similarProducts = getProductsByCategory(product.categoryId)
    .filter(p => p.id !== product.id)
    .slice(0, 4);
  
  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize);
  };
  
  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize);
    navigate("/checkout");
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="bg-muted rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Product Info */}
            <div className="space-y-6">
              <h1 className="text-3xl font-bold">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      {i < Math.floor(product.rating) ? "★" : "☆"}
                    </span>
                  ))}
                </div>
                <span className="ml-2 text-muted-foreground">
                  ({product.reviewCount} reviews)
                </span>
              </div>
              
              {/* Price */}
              <div className="flex items-center gap-3">
                {product.discountedPrice ? (
                  <>
                    <span className="text-3xl font-bold text-destructive">
                      ${product.discountedPrice.toFixed(2)}
                    </span>
                    <span className="text-xl text-muted-foreground line-through">
                      ${product.price.toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>
              
              {/* Size options */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-2">
                  <label className="font-medium">Size</label>
                  <Select value={selectedSize} onValueChange={setSelectedSize}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a size" />
                    </SelectTrigger>
                    <SelectContent>
                      {product.sizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              {/* Quantity */}
              <div className="space-y-2">
                <label className="font-medium">Quantity</label>
                <div className="flex items-center border rounded-md w-32">
                  <button
                    className="px-3 py-1 text-xl"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <span className="flex-1 text-center">{quantity}</span>
                  <button
                    className="px-3 py-1 text-xl"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="flex gap-4 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
                <Button className="flex-1" onClick={handleBuyNow}>
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
          
          {/* Product details tabs */}
          <Tabs defaultValue="description" className="mt-12">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="reviews">Customer Reviews</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="space-y-4">
              <h3 className="text-xl font-semibold">Product Details</h3>
              <p>{product.description}</p>
            </TabsContent>
            
            <TabsContent value="reviews" className="space-y-4">
              <h3 className="text-xl font-semibold">Customer Reviews</h3>
              <p className="text-muted-foreground">
                Reviews will be displayed here.
              </p>
            </TabsContent>
            
            <TabsContent value="faq" className="space-y-4">
              <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
              <p className="text-muted-foreground">
                FAQs will be displayed here.
              </p>
            </TabsContent>
          </Tabs>
          
          {/* Similar products */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6">Similar Products</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {similarProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductPage;
