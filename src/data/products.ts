
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountedPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  images?: string[];
  categoryId: string;
  featured: boolean;
  bestseller: boolean;
  isNew: boolean;
  stock: number;
  sizes?: string[];
}

export const products: Product[] = [
  {
    id: "p1",
    name: "Wireless Bluetooth Earbuds",
    description: "Premium wireless earbuds with noise cancellation and long battery life.",
    price: 129.99,
    discountedPrice: 99.99,
    rating: 4.5,
    reviewCount: 256,
    image: "/placeholder.svg",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    categoryId: "c1",
    featured: true,
    bestseller: true,
    isNew: false,
    stock: 45
  },
  {
    id: "p2",
    name: "Smart Fitness Tracker",
    description: "Track your fitness goals with this advanced smart watch featuring heart rate monitoring.",
    price: 89.99,
    discountedPrice: 69.99,
    rating: 4.3,
    reviewCount: 189,
    image: "/placeholder.svg",
    images: ["/placeholder.svg", "/placeholder.svg"],
    categoryId: "c1",
    featured: true,
    bestseller: false,
    isNew: true,
    stock: 32
  },
  {
    id: "p3",
    name: "Men's Slim-Fit T-Shirt",
    description: "Comfortable cotton t-shirt with a modern slim fit design.",
    price: 24.99,
    discountedPrice: 19.99,
    rating: 4.7,
    reviewCount: 324,
    image: "/placeholder.svg",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    categoryId: "c2",
    featured: false,
    bestseller: true,
    isNew: false,
    stock: 120,
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "p4",
    name: "Women's Running Shoes",
    description: "Lightweight and supportive running shoes with enhanced cushioning.",
    price: 119.99,
    discountedPrice: 89.99,
    rating: 4.6,
    reviewCount: 208,
    image: "/placeholder.svg",
    images: ["/placeholder.svg", "/placeholder.svg"],
    categoryId: "c2",
    featured: true,
    bestseller: true,
    isNew: false,
    stock: 75,
    sizes: ["6", "7", "8", "9", "10"]
  },
  {
    id: "p5",
    name: "Professional Blender",
    description: "High-performance blender for smoothies, soups, and more.",
    price: 149.99,
    discountedPrice: 129.99,
    rating: 4.8,
    reviewCount: 156,
    image: "/placeholder.svg",
    images: ["/placeholder.svg", "/placeholder.svg"],
    categoryId: "c3",
    featured: false,
    bestseller: false,
    isNew: true,
    stock: 28
  },
  {
    id: "p6",
    name: "Natural Face Serum",
    description: "Hydrating serum with natural ingredients for all skin types.",
    price: 34.99,
    discountedPrice: 29.99,
    rating: 4.4,
    reviewCount: 178,
    image: "/placeholder.svg",
    images: ["/placeholder.svg"],
    categoryId: "c4",
    featured: true,
    bestseller: false,
    isNew: true,
    stock: 60
  },
  {
    id: "p7",
    name: "Yoga Mat",
    description: "Non-slip, eco-friendly yoga mat for comfortable practice.",
    price: 39.99,
    discountedPrice: 34.99,
    rating: 4.2,
    reviewCount: 142,
    image: "/placeholder.svg",
    images: ["/placeholder.svg", "/placeholder.svg"],
    categoryId: "c5",
    featured: false,
    bestseller: true,
    isNew: false,
    stock: 85
  },
  {
    id: "p8",
    name: "Wireless Charging Pad",
    description: "Fast wireless charging pad compatible with all Qi-enabled devices.",
    price: 29.99,
    discountedPrice: 24.99,
    rating: 4.1,
    reviewCount: 98,
    image: "/placeholder.svg",
    images: ["/placeholder.svg"],
    categoryId: "c1",
    featured: false,
    bestseller: false,
    isNew: true,
    stock: 110
  }
];

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter(product => product.categoryId === categoryId);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(product => product.featured);
}

export function getBestsellers(): Product[] {
  return products.filter(product => product.bestseller);
}

export function getNewArrivals(): Product[] {
  return products.filter(product => product.isNew);
}

export function getFlashDeals(): Product[] {
  return products.filter(product => product.discountedPrice !== undefined)
    .sort((a, b) => {
      const discountA = a.discountedPrice ? (a.price - a.discountedPrice) / a.price : 0;
      const discountB = b.discountedPrice ? (b.price - b.discountedPrice) / b.price : 0;
      return discountB - discountA;
    })
    .slice(0, 4);
}

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) || 
    product.description.toLowerCase().includes(lowercaseQuery)
  );
}
