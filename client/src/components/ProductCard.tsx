
import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
  showAddToCart?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, showAddToCart = true }) => {
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };
  
  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToWishlist(product);
  };

  const discountPercentage = product.discountedPrice 
    ? Math.round(((product.price - product.discountedPrice) / product.price) * 100)
    : 0;

  const showDiscountBadge = product.discountedPrice && discountPercentage > 0;
  const showBestsellerBadge = !showDiscountBadge && product.bestseller;
  const productImage = Array.isArray(product.image) ? product.image[0] : product.image;

  return (
    <Link to={`/product/${product.id}`}>
      <div className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:scale-[1.02]">
        {/* Image Container with Enhanced Hover */}
        <div className="relative overflow-hidden rounded-t-3xl">
          <div className="aspect-square overflow-hidden">
            <img
              src={productImage}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
            />
          </div>
          
          {/* Gradient Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Badges with Animation */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {showDiscountBadge && (
              <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold text-xs px-3 py-1 shadow-lg transform transition-transform duration-300 group-hover:scale-110">
                {discountPercentage}% OFF
              </Badge>
            )}
            {showBestsellerBadge && (
              <Badge className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold text-xs px-3 py-1 shadow-lg transform transition-transform duration-300 group-hover:scale-110">
                ⭐ Bestseller
              </Badge>
            )}
          </div>
          
          {/* Wishlist Button with Enhanced Animation */}
          <Button
            size="sm"
            variant="secondary"
            className="absolute top-4 right-4 w-10 h-10 p-0 rounded-full bg-white/95 hover:bg-white shadow-lg border-0 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 hover:scale-110"
            onClick={handleAddToWishlist}
          >
            <Heart 
              className={`h-5 w-5 transition-colors duration-200 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-red-500'}`} 
            />
          </Button>
        </div>
        
        {/* Content with Enhanced Spacing */}
        <div className="p-6 space-y-4">
          {/* Product Name */}
          <h3 className="font-bold text-gray-900 text-lg leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
            {product.name}
          </h3>
          
          {/* Rating with Enhanced Design */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 transition-colors duration-200 ${i < Math.floor(product.rating || 4.5) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 font-medium">({product.reviewCount || 0})</span>
          </div>
          
          {/* Price with Enhanced Design */}
          <div className="flex items-center gap-3">
            {product.discountedPrice ? (
              <>
                <span className="text-2xl font-bold text-green-600">₹{product.price}</span>
                <span className="text-lg text-gray-500 line-through">₹{product.discountedPrice}</span>
              </>
            ) : (
              <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
            )}
          </div>
          
          {/* Add to Cart Button with Enhanced Animation */}
          {showAddToCart && (
            <Button 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 shadow-lg hover:shadow-xl"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>
          )}
        </div>
        
        {/* Floating Animation Effect */}
        <div className="absolute inset-0 rounded-3xl ring-1 ring-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    </Link>
  );
};

export default ProductCard;
