
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Trash2, Star } from "lucide-react";

const WishlistPage: React.FC = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  const handleAddToCart = (productId: string) => {
    const product = wishlistItems.find(p => p.id === productId);
    if (product) {
      addToCart(product, 1);
    }
  };

  const handleBuyNow = (productId: string) => {
    const product = wishlistItems.find(p => p.id === productId);
    if (product) {
      addToCart(product, 1);
    }
    navigate("/checkout")
  };
  
  if (wishlistItems.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-grow container py-12">
          <div className="text-center py-16">
            <div className="mb-6">
              <Heart className="h-24 w-24 text-gray-300 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Wishlist is Empty</h1>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Looks like you haven't added any items to your wishlist yet. Start exploring and save your favorite products!
              </p>
              <Button 
                onClick={() => navigate("/")}
                className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-red-500 hover:to-pink-500 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
              >
                Start Shopping
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
              <p className="text-gray-600">{wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} saved</p>
            </div>
            {wishlistItems.length > 0 && (
              <Button 
                variant="outline" 
                onClick={clearWishlist}
                className="text-red-600 border-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((product) => {
              const productImage = Array.isArray(product.image) ? product.image[0] : product.image;
              
              return (
                <Card key={product.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg group bg-white">
                  <div className="relative">
                    <img
                      src={productImage}
                      alt={product.name}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <Button
                      size="sm"
                      variant="secondary"
                      className="absolute top-3 right-3 w-8 h-8 p-0 rounded-full bg-white/90 hover:bg-white shadow-md"
                      onClick={() => removeFromWishlist(product.id)}
                    >
                      <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                    </Button>
                    
                    {product.discountedPrice && (
                      <Badge className="absolute top-3 left-3 bg-red-500 text-white">
                        {Math.round(((product.price - product.discountedPrice) / product.price) * 100)}% OFF
                      </Badge>
                    )}
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 
                      className="font-semibold text-lg mb-2 line-clamp-2 cursor-pointer hover:text-blue-600 transition-colors"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      {product.name}
                    </h3>
                    
                    {/* Rating */}
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < Math.floor(product.rating || 4.5) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-2">({product.reviewCount || 0})</span>
                    </div>
                    
                    {/* Price */}
                    <div className="flex items-center gap-2 mb-4">
                      {product.discountedPrice ? (
                        <>
                          <span className="text-xl font-bold text-green-600">₹{product.discountedPrice}</span>
                          <span className="text-sm text-gray-500 line-through">₹{product.price}</span>
                        </>
                      ) : (
                        <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
                      )}
                    </div>
                    
                    {/* Stock status */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className={`w-2 h-2 rounded-full ${(product.stock || 0) > 10 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className={`text-xs font-medium ${(product.stock || 0) > 10 ? 'text-green-600' : 'text-red-600'}`}>
                        {(product.stock || 0) > 10 ? 'In Stock' : 'Limited Stock'}
                      </span>
                    </div>
                    
                    {/* Action buttons */}
                    <div className="space-y-2">
                      <Button 
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-500 hover:to-orange-500 text-white"
                        onClick={() => handleBuyNow(product.id)}
                      >
                        Buy Now
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => handleAddToCart(product.id)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default WishlistPage;
