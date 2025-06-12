import axios from "axios";
import { toast } from "react-toastify";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountedPrice?: number;
  image: string[]; // 2-4 photo URLs
  category: string;
  subCategory: string;
  sizes?: string[];
  bestseller?: boolean;
  rating?: number;
  reviewCount?: number;
  stock?: number;
}

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export const getProductData = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(backendUrl + '/api/product/list');

    if (response.data.success) {
      return response.data.products.map((product: any) => {
        // Normalize sizes for applicable subcategories
        let sizes: number[] | undefined = undefined;
        const sizeSubCategories = ['Shoes', 'Sandals', 'Slippers'];
        if (sizeSubCategories.includes(product.subCategory)) {
          sizes = [6, 7, 8, 9, 10, 11];
        }

        return {
          id: product._id,
          name: product.name,
          description: product.description,
          price: product.price,
          discountedPrice: product.discountedPrice,
          image: product.image,
          category: product.category,
          subCategory: product.subCategory,
          sizes: sizes, // will be undefined for other subcategories
          bestseller: product.bestseller,
          rating: product.rating || 4.5,
          reviewCount: product.reviewCount || 0,
          stock: product.stock || 10,
        };
      });
    } else {
      console.error('Failed to fetch products:', response.data.message);
      toast.error('Failed to fetch products: ' + response.data.message);
      return [];
    }
  } catch (error) {
    console.error('Error fetching product data:', error);
    toast.error('Failed to connect to server');
    return [];
  }
}

// Cache for products
let cachedProducts: Product[] = [];
let isLoading = false;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const getProducts = async (): Promise<Product[]> => {
  const now = Date.now();
  
  // Return cached data if it's fresh
  if (cachedProducts.length > 0 && (now - lastFetchTime) < CACHE_DURATION) {
    return cachedProducts;
  }
  
  // Prevent multiple simultaneous fetches
  if (isLoading) {
    return cachedProducts;
  }
  
  isLoading = true;
  try {
    cachedProducts = await getProductData();
    lastFetchTime = now;
  } finally {
    isLoading = false;
  }
  
  return cachedProducts;
};

export function getBestsellers(): Product[] {
  return cachedProducts.filter(product => product.bestseller);
}

export function getProductById(id: string): Product | undefined {
  return cachedProducts.find(product => product.id === id);
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase();
  return cachedProducts.filter(product =>
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery) ||
    product.subCategory.toLowerCase().includes(lowercaseQuery)
  );
}

export function getProductsByCategory(category: string): Product[] {
  return cachedProducts.filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  );
}

// For backwards compatibility, expose products as a reactive array
export const products = {
  get all() {
    return cachedProducts;
  },
  
  filter: (predicate: (product: Product) => boolean) => {
    return cachedProducts.filter(predicate);
  },
  
  find: (predicate: (product: Product) => boolean) => {
    return cachedProducts.find(predicate);
  },
  
  slice: (start: number, end?: number) => {
    return cachedProducts.slice(start, end);
  },
  
  get length() {
    return cachedProducts.length;
  }
};
