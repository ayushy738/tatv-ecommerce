
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
    name: "Skechers Fliantops Performance Sport Shoes",
    description: "Premium sport shoes designed for comfort and performance, perfect for running and training.",
    price: 2498,
    discountedPrice: 1699,
    rating: 4.5,
    reviewCount: 256,
    image: "/products/filantop-sports-shoes.jpg",
    images: ["/products/filantop-sports-shoes2.jpg", "/products/filantop-sports-shoes3.jpg", "/products/filantop-sports-shoes4.jpg","/products/filantop-sports-shoes5.jpg"],
    categoryId: "c2",
    featured: true,
    bestseller: true,
    isNew: false,
    stock: 45
  },
  {
    id: "p2",
    name: "Nike Zoomx Sports Shoes",
    description: "Premium sport shoes designed for comfort and performance, perfect for running and training.",
    price: 2498,
    discountedPrice: 1699,
    rating: 4.5,
    reviewCount: 256,
    image: "/products/Nike-zoomx-sports.jpg",
    images: ["/products/Nike-zoomx-sports2.jpg", "/products/Nike-zoomx-sports3.jpg", "/products/Nike-zoomx-sports4.jpg"],
    categoryId: "c2",
    featured: true,
    bestseller: true,
    isNew: false,
    stock: 45
  },
  {
    id: "p3",
    name: "Nike Zoomax Sports Shoes 2025",
    description: "Premium sport shoes designed for comfort and performance, perfect for running and training.",
    price: 2498,
    discountedPrice: 1699,
    rating: 4.5,
    reviewCount: 256,
    image: "/products/Zoomax-sports-shoes.jpg",
    images: ["/products/Zoomax-sports-shoes2.jpg", "/products/Zoomax-sports-shoes2.jpg", "/products/Zoomax-sports-shoes.jpg"],
    categoryId: "c2",
    featured: true,
    bestseller: true,
    isNew: false,
    stock: 45
  },
  {
    id: "p4",
    name: "Skechers Performance Division Sports Shoes",
    description: "Premium sport shoes designed for comfort and performance, perfect for running and training.",
    price: 2598,
    discountedPrice: 1749,
    rating: 4.5,
    reviewCount: 256,
    image: "/products/skechers-performance.jpg",
    images: ["/products/skechers-performance2.jpg", "/products/skechers-performance3.jpg", "/products/skechers-performance.jpg"],
    categoryId: "c2",
    featured: true,
    bestseller: true,
    isNew: false,
    stock: 45
  },
  {
    id: "p5",
    name: "PUMA Booster51 Sports Shoes",
    description: "Premium sport shoes designed for comfort and performance, perfect for running and training.",
    price: 2598,
    discountedPrice: 1749,
    rating: 4.5,
    reviewCount: 256,
    image: "/products/Booster-51-1.jpg",
    images: ["/products/Booster-51-2.jpg", "/products/Booster-51-2.jpg", "/products/Booster-51-1.jpg"],
    categoryId: "c2",
    featured: true,
    bestseller: true,
    isNew: false,
    stock: 45
  },
  {
    id: "p6",
    name: "Adidas Boost Sports Shoes",
    description: "Premium sport shoes designed for comfort and performance, perfect for running and training.",
    price: 2598,
    discountedPrice: 1749,
    rating: 4.5,
    reviewCount: 256,
    image: "/products/boost-sports-shoes.jpg",
    images: ["/products/boost-sports-shoes2.jpg", "/products/boost-sports-shoes3.jpg", "/products/boost-sports-shoes.jpg"],
    categoryId: "c2",
    featured: true,
    bestseller: true,
    isNew: false,
    stock: 45
  },
  {
    id: "p7",
    name: "PUMA Red Sliders",
    description: "Premium sport shoes designed for comfort and performance, perfect for running and training.",
    price: 998,
    discountedPrice: 499,
    rating: 4.5,
    reviewCount: 256,
    image: "/products/red-puma-slides2.jpg",
    images: ["/products/red-puma-slides.jpg", "/products/red-puma-slides3.jpg", "/products/red-puma-slides4.jpg"],
    categoryId: "c3",
    featured: true,
    bestseller: true,
    isNew: false,
    stock: 45
  },
  {
    id: "p8",
    name: "PUMA Yellow Sliders",
    description: "Premium sport shoes designed for comfort and performance, perfect for running and training.",
    price: 998,
    discountedPrice: 499,
    rating: 4.5,
    reviewCount: 256,
    image: "/products/yellow-puma-slides.jpg",
    images: ["/products/yellow-puma-slides2.jpg", "/products/yellow-puma-slides3.jpg", "/products/yellow -puma-slides4.jpg"],
    categoryId: "c3",
    featured: true,
    bestseller: true,
    isNew: false,
    stock: 45
  },
  {
    id: "p9",
    name: "PUMA White Black printed Sliders",
    description: "Premium sport shoes designed for comfort and performance, perfect for running and training.",
    price: 998,
    discountedPrice: 499,
    rating: 4.5,
    reviewCount: 256,
    image: "/products/white-printed-puma-slides.jpg",
    images: ["/products/white-printed-puma-slides2.jpg", "/products/white-printed-puma-slides3.jpg", "/products/white-printed-puma-slides4.jpg"],
    categoryId: "c3",
    featured: true,
    bestseller: true,
    isNew: false,
    stock: 45
  },
  {
    id: "p10",
    name: "PUMA White Sliders",
    description: "Premium sport shoes designed for comfort and performance, perfect for running and training.",
    price: 998,
    discountedPrice: 499,
    rating: 4.5,
    reviewCount: 256,
    image: "/products/white-puma-slides.jpg",
    images: ["/products/white-puma-slides2.jpg", "/products/white-puma-slides3.jpg", "/products/white-puma-slides4.jpg"],
    categoryId: "c3",
    featured: true,
    bestseller: true,
    isNew: false,
    stock: 45
  },
  {
    id: "p11",
    name: "NIKE Black & White Printed Sliders",
    description: "Premium sport shoes designed for comfort and performance, perfect for running and training.",
    price: 998,
    discountedPrice: 499,
    rating: 4.5,
    reviewCount: 256,
    image: "/products/nike-bw-printed.jpg",
    images: ["/products/nike-bw-printed2.jpg", "/products/nike-bw-printed3.jpg", "/products/nike-bw-printed4.jpg"],
    categoryId: "c3",
    featured: true,
    bestseller: true,
    isNew: false,
    stock: 45
  },
  {
    id: "p11",
    name: "ADIDAS White & Black Designed Sliders",
    description: "Premium sport shoes designed for comfort and performance, perfect for running and training.",
    price: 998,
    discountedPrice: 499,
    rating: 4.5,
    reviewCount: 256,
    image: "/products/adidas-wb-designed.jpg",
    images: ["/products/adidas-wb-designed2.jpg", "/products/adidas-wb-designed3.jpg", "/products/adidas-wb-designed4.jpg"],
    categoryId: "c3",
    featured: true,
    bestseller: true,
    isNew: false,
    stock: 45
  },
  {
    id: "p12",
    name: "JORDAN Black Sliders",
    description: "Premium sport shoes designed for comfort and performance, perfect for running and training.",
    price: 998,
    discountedPrice: 499,
    rating: 4.5,
    reviewCount: 256,
    image: "/products/jordan-black-slides.jpg",
    images: ["/products/jordan-black-slides2.jpg", "/products/jordan-black-slides3.jpg", "/products/jordan-black-slides4.jpg"],
    categoryId: "c3",
    featured: true,
    bestseller: true,
    isNew: false,
    stock: 45
  },
  {
    id: "p13",
    name: "NIKE White Sliders",
    description: "Premium sport shoes designed for comfort and performance, perfect for running and training.",
    price: 998,
    discountedPrice: 499,
    rating: 4.5,
    reviewCount: 256,
    image: "/products/nike-white-slides.jpg",
    images: ["/products/nike-white-slides2.jpg", "/products/nike-white-slides3.jpg", "/products/nike-white-slides4.jpg"],
    categoryId: "c3",
    featured: true,
    bestseller: true,
    isNew: false,
    stock: 45
  },
  {
    id: "p14",
    name: "PUMA Black Sliders",
    description: "Premium sport shoes designed for comfort and performance, perfect for running and training.",
    price: 998,
    discountedPrice: 499,
    rating: 4.5,
    reviewCount: 256,
    image: "/products/nike-white-slides.jpg",
    images: ["/products/nike-white-slides2.jpg", "/products/nike-white-slides3.jpg", "/products/nike-white-slides4.jpg"],
    categoryId: "c3",
    featured: true,
    bestseller: true,
    isNew: false,
    stock: 45
  },
  {
    id: "p15",
    name: "Red Women Wedge Sandals",
    description: "Stylish red wedge sandals for women, perfect for casual outings.",
    price: 499,
    discountedPrice: 370,
    rating: 4.3,
    reviewCount: 189,
    image: "/products/red-wedge-sandal.jpg",
    images: ["/products/red-wedge-sandal.jpg", "/products/red-wedge-sandal2.jpg","/products/red-wedge-sandal3.jpg"],
    categoryId: "c1",
    featured: true,
    bestseller: true,
    isNew: false,
    stock: 32
  },
  {
    id: "p16",
    name: "Maroon Women Wedge Sandals",
    description: "Stylish red wedge sandals for women, perfect for casual outings.",
    price: 499,
    discountedPrice: 370,
    rating: 4.3,
    reviewCount: 189,
    image: "/products/maroon-wedge-sandal.jpg",
    images: ["/products/maroon-wedge-sandal.jpg", "/products/maroon-wedge-sandal2.jpg","/products/maroon-wedge-sandal3.jpg"],
    categoryId: "c1",
    featured: true,
    bestseller: true,
    isNew: false,
    stock: 32
  },
  {
    id: "p17",
    name: "Black Women Wedge Sandals",
    description: "Stylish red wedge sandals for women, perfect for casual outings.",
    price: 499,
    discountedPrice: 370,
    rating: 4.3,
    reviewCount: 189,
    image: "/products/black-wedge-sandal.jpg",
    images: ["/products/black-wedge-sandal.jpg", "/products/black-wedge-sandal2.jpg","/products/black-wedge-sandal3.jpg"],
    categoryId: "c1",
    featured: true,
    bestseller: true,
    isNew: false,
    stock: 32
  },
  {
    id: "p18",
    name: "White Women Wedge Sandals",
    description: "Stylish red wedge sandals for women, perfect for casual outings.",
    price: 499,
    discountedPrice: 370,
    rating: 4.3,
    reviewCount: 189,
    image: "/products/white-wedge-sandal2.jpg",
    images: ["/products/white-wedge-sandal.jpg", "/products/white-wedge-sandal2.jpg","/products/white-wedge-sandal3.jpg"],
    categoryId: "c1",
    featured: true,
    bestseller: false,
    isNew: true,
    stock: 32
  },
  {
    id: "p19",
    name: "Black Women Flat Sandals",
    description: "Stylish red wedge sandals for women, perfect for casual outings.",
    price: 499,
    discountedPrice: 370,
    rating: 4.3,
    reviewCount: 189,
    image: "/products/black-flats.jpg",
    images: ["/products/black-flats.jpg", "/products/black-flats2.jpg","/products/black-flats3.jpg"],
    categoryId: "c1",
    featured: true,
    bestseller: false,
    isNew: true,
    stock: 32
  },
  {
    id: "p20",
    name: "Pink Women Flat Sandals",
    description: "Stylish red wedge sandals for women, perfect for casual outings.",
    price: 499,
    discountedPrice: 370,
    rating: 4.3,
    reviewCount: 189,
    image: "/products/pink-flats.jpg",
    images: ["/products/pink-flats.jpg", "/products/pink-flats2.jpg","/products/pink-flats3.jpg"],
    categoryId: "c1",
    featured: true,
    bestseller: false,
    isNew: true,
    stock: 32
  },
  {
    id: "p21",
    name: "White Women Flat Sandals",
    description: "Stylish red wedge sandals for women, perfect for casual outings.",
    price: 499,
    discountedPrice: 370,
    rating: 4.3,
    reviewCount: 189,
    image: "/products/white-flats.jpg",
    images: ["/products/white-flats.jpg", "/products/white-flats2.jpg","/products/white-flats3.jpg"],
    categoryId: "c1",
    featured: true,
    bestseller: false,
    isNew: true,
    stock: 32
  },
  {
    id: "p22",
    name: "Pink Women Low-Heel Sandals",
    description: "Stylish red wedge sandals for women, perfect for casual outings.",
    price: 499,
    discountedPrice: 370,
    rating: 4.3,
    reviewCount: 189,
    image: "/products/pink-low-heels.jpg",
    images: ["/products/pink-low-heels.jpg", "/products/pink-low-heels2.jpg","/products/pink-low-heels3.jpg"],
    categoryId: "c1",
    featured: true,
    bestseller: false,
    isNew: true,
    stock: 32
  },
  {
    id: "p4",
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
    id: "p5",
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
    id: "p6",
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
    id: "p7",
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
    id: "p8",
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
    id: "p9",
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
