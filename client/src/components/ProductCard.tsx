
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
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
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

  // Show discount badge if there's a discount, otherwise show bestseller if applicable
  const showDiscountBadge = discountPercentage > 0;
  const showBestsellerBadge = !showDiscountBadge && product.bestseller;

  // Get the first image from the array
  const productImage = Array.isArray(product.image) ? product.image[0] : product.image;

  return (
    <Link to={`/product/${product.id}`}>
      <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-gray-100">
        {/* Image Container */}
        <div className="relative overflow-hidden">
          <img
            src={productImage}
            alt={product.name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {showDiscountBadge && (
              <Badge className="bg-red-500 text-white font-semibold">
                {discountPercentage}% OFF
              </Badge>
            )}
            {showBestsellerBadge && (
              <Badge className="bg-orange-500 text-white font-semibold">
                Bestseller
              </Badge>
            )}
          </div>
          
          {/* Wishlist Button */}
          <Button
            size="sm"
            variant="secondary"
            className="absolute top-3 right-3 w-8 h-8 p-0 rounded-full bg-white/90 hover:bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            onClick={handleAddToWishlist}
          >
            <Heart 
              className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
            />
          </Button>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-3 w-3 ${i < Math.floor(product.rating || 4.5) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">({product.reviewCount || 0})</span>
          </div>
          
          {/* Price */}
          <div className="flex items-center gap-2 mb-4">
            {product.discountedPrice ? (
              <>
                <span className="text-lg font-bold text-green-600">₹{product.discountedPrice}</span>
                <span className="text-sm text-gray-500 line-through">₹{product.price}</span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
            )}
          </div>
          
          {/* Add to Cart Button */}
          <Button 
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
