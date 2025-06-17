
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
      <div className="group relative bg-white rounded-2xl md:rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:scale-[1.02]">
        {/* Image Container */}
        <div className="relative overflow-hidden rounded-t-2xl md:rounded-t-3xl">
          <div className="aspect-square overflow-hidden">
            <img
              src={productImage}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
            />
          </div>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Badges */}
          <div className="absolute top-2 md:top-3 left-2 md:left-3 flex flex-col gap-1">
            {showDiscountBadge && (
              <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold text-[10px] md:text-xs px-2 md:px-3 py-1 shadow-md transform transition-transform duration-300 group-hover:scale-105">
                {discountPercentage}% OFF
              </Badge>
            )}
            {showBestsellerBadge && (
              <Badge className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold text-[10px] md:text-xs px-2 md:px-3 py-1 shadow-md transform transition-transform duration-300 group-hover:scale-105">
                ⭐ Bestseller
              </Badge>
            )}
          </div>
          
          {/* Wishlist Button */}
          <Button
            size="sm"
            variant="secondary"
            className="absolute top-2 md:top-3 right-2 md:right-3 w-7 h-7 md:w-9 md:h-9 p-0 rounded-full bg-white/90 hover:bg-white shadow-md border-0 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-1 group-hover:translate-y-0"
            onClick={handleAddToWishlist}
          >
            <Heart 
              className={`h-3 w-3 md:h-4 md:w-4 transition-colors duration-200 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-red-500'}`} 
            />
          </Button>
        </div>
        
        {/* Content */}
        <div className="p-3 md:p-4 lg:p-5 space-y-2 md:space-y-3">
          {/* Product Name */}
          <h3 className="font-semibold md:font-bold text-gray-900 text-sm md:text-base lg:text-lg leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
            {product.name}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center gap-1 md:gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-3 w-3 md:h-4 md:w-4 transition-colors duration-200 ${i < Math.floor(product.rating || 4.5) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`}
                />
              ))}
            </div>
            <span className="text-xs md:text-sm text-gray-500 font-medium">({product.reviewCount || 0})</span>
          </div>
          
          {/* Price */}
          <div className="flex items-center gap-2 md:gap-3">
            {product.discountedPrice ? (
              <>
                <span className="text-lg md:text-xl lg:text-2xl font-bold text-green-600">₹{product.discountedPrice}</span>
                <span className="text-sm md:text-base text-gray-500 line-through">₹{product.price}</span>
              </>
            ) : (
              <span className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">₹{product.price}</span>
            )}
          </div>
          
          {/* Add to Cart Button - Only on larger screens or when explicitly shown */}
          {showAddToCart && (
            <Button 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white font-medium md:font-semibold py-2 md:py-3 rounded-lg md:rounded-xl text-sm md:text-base opacity-0 md:group-hover:opacity-100 transition-all duration-200 transform translate-y-2 md:group-hover:translate-y-0 shadow-md hover:shadow-lg"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 mr-1 md:mr-2" />
              Add to Cart
            </Button>
          )}
        </div>
        
        {/* Floating Ring Effect */}
        <div className="absolute inset-0 rounded-2xl md:rounded-3xl ring-1 ring-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </Link>
  );
};

export default ProductCard;
