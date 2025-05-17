
import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../data/products";
import { useCart } from "../context/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const discount = product.discountedPrice 
    ? Math.round(((product.price - product.discountedPrice) / product.price) * 100)
    : 0;
  
  return (
    <Card className="h-full overflow-hidden transition-all hover:shadow-md">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden pt-[100%]">
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {product.discountedPrice && (
            <Badge variant="destructive" className="absolute top-2 left-2">
              {discount}% OFF
            </Badge>
          )}
          {product.isNew && (
            <Badge variant="default" className="absolute top-2 right-2 bg-primary">
              NEW
            </Badge>
          )}
        </div>
        
        <CardContent className="p-4">
          <h3 className="text-base font-medium line-clamp-2 mb-2">{product.name}</h3>
          <div className="flex items-center">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-sm">
                  {i < Math.floor(product.rating) ? "★" : "☆"}
                </span>
              ))}
            </div>
            <span className="text-xs text-muted-foreground ml-1">({product.reviewCount})</span>
          </div>
          
          <div className="mt-2 flex items-center gap-2">
            {product.discountedPrice ? (
              <>
                <span className="font-bold text-destructive">${product.discountedPrice.toFixed(2)}</span>
                <span className="text-sm text-muted-foreground line-through">${product.price.toFixed(2)}</span>
              </>
            ) : (
              <span className="font-bold">${product.price.toFixed(2)}</span>
            )}
          </div>
        </CardContent>
      </Link>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => addToCart(product, 1)}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
