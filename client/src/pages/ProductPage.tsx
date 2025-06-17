
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductReviews from "../components/ProductReviews";
import { Rating } from "./components/Rating";
import { getProducts, getProductById, Product } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuthCheck } from "../hooks/useAuthCheck";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Heart, ShoppingCart, Share2, Minus, Plus, Truck, Shield, RotateCcw } from "lucide-react";

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const { requireAuth } = useAuthCheck();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        await getProducts();
        if (id) {
          const foundProduct = getProductById(id);
          setProduct(foundProduct || null);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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
  
  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600">The product you're looking for doesn't exist.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const productImages = Array.isArray(product.image) ? product.image : [product.image];

  const handleAddToCart = () => {
    if (!requireAuth('add items to cart')) return;
    addToCart(product, quantity, selectedSize);
  };

  const handleAddToWishlist = () => {
    if (!requireAuth('add items to wishlist')) return;
    addToWishlist(product);
  };

  const handleBuyNow = () => {
    if (!requireAuth('purchase items')) return;
    addToCart(product, quantity, selectedSize);
    navigate('/cart')
  };

  const discountPercentage = product.discountedPrice 
    ? Math.round(((product.discountedPrice - product.price) / product.discountedPrice) * 100)
    : 0;

  const deliveryDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg">
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-96 object-cover"
                />
                {discountPercentage > 0 && (
                  <Badge className="absolute top-4 left-4 bg-red-500 text-white">
                    {discountPercentage}% OFF
                  </Badge>
                )}
              </div>
              
              {/* Thumbnail Images */}
              {productImages.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {productImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                        selectedImage === index ? 'border-blue-500' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-20 object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <div className="flex items-center gap-4 mb-4">
                  <Rating value={product.rating || 4.5} />
                  <span className="text-sm text-gray-500">({product.reviewCount || 0} reviews)</span>
                  <Badge variant="outline" className={(product.stock || 0) > 10 ? 'border-green-500 text-green-600' : 'border-red-500 text-red-600'}>
                    {(product.stock || 0) > 10 ? 'In Stock' : 'Limited Stock'}
                  </Badge>
                </div>
              </div>

              {/* Price - Always show discounted price */}
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-green-600">₹{product.price}</span>
                <span className="text-xl text-gray-500 line-through">₹{product.discountedPrice}</span>
                <span className="text-lg text-green-600 font-semibold">
                  Save ₹{product.discountedPrice - (product.price || 0)}
                </span>
              </div>

              {/* Size Selection */}
              {product.sizes && Array.isArray(product.sizes) && product.sizes.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Size</h3>
                  <div className="flex gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border rounded-lg transition-colors ${
                          selectedSize === size
                            ? 'border-blue-500 bg-blue-50 text-blue-600'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Quantity</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-gray-100"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-2 font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-gray-100"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">
                    {product.stock || 0} items available
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Button
                    onClick={handleBuyNow}
                    size="lg"
                    className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-500 hover:to-orange-500 text-white"
                  >
                    Buy Now
                  </Button>
                  <Button
                    onClick={handleAddToCart}
                    variant="outline"
                    size="lg"
                    className="flex-1"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
                
                <div className="flex gap-4">
                  <Button
                    onClick={handleAddToWishlist}
                    variant="outline"
                    className="flex-1"
                  >
                    <Heart className={`h-4 w-4 mr-2 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                    {isInWishlist(product.id) ? 'In Wishlist' : 'Add to Wishlist'}
                  </Button>
                  <Button variant="outline">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Delivery Info */}
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Truck className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium">Free delivery by {deliveryDate}</p>
                        <p className="text-sm text-gray-500">Order within 2 hours</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center gap-3">
                      <RotateCcw className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Easy 30-day returns</p>
                        <p className="text-sm text-gray-500">No questions asked</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="font-medium">1 year warranty</p>
                        <p className="text-sm text-gray-500">Manufacturer warranty</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-16">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Product Description</h3>
                    <div className="prose max-w-none">
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {product.description || "Experience premium quality with this exceptional product. Crafted with attention to detail and designed for modern lifestyle, this item combines functionality with style."}
                      </p>
                      <div className="mt-6">
                        <h4 className="font-semibold mb-2">Stock Information</h4>
                        <p className="text-gray-700">
                          <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                            (product.stock || 0) > 10 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            <div className={`w-2 h-2 rounded-full ${
                              (product.stock || 0) > 10 ? 'bg-green-500' : 'bg-red-500'
                            }`}></div>
                            {(product.stock || 0) > 10 ? `In Stock (${product.stock} available)` : `Limited Stock (Only ${product.stock || 0} left)`}
                          </span>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="specifications" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Specifications</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="font-medium">Category:</span>
                          <span className="capitalize">{product.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Sub Category:</span>
                          <span className="capitalize">{product.subCategory}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Stock:</span>
                          <span>{product.stock || 0} units</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="font-medium">Rating:</span>
                          <span>{product.rating || 4.5}/5</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Reviews:</span>
                          <span>{product.reviewCount || 0}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Bestseller:</span>
                          <span>{product.bestseller ? 'Yes' : 'No'}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6">
                <ProductReviews productId={product.id} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductPage;
