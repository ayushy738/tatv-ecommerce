
export interface Category {
  id: string;
  name: string;
  image: string;
  category: string;
  subCategory: string;
}

export const categories: Category[] = [
  {
    id: "men-shoes",
    name: "Men Shoes",
    image: "/placeholder.svg",
    category: "Men",
    subCategory: "Shoes"
  },
  {
    id: "men-slippers",
    name: "Men Slippers",
    image: "/placeholder.svg",
    category: "Men",
    subCategory: "Slippers"
  },
  {
    id: "women-sandals",
    name: "Women Sandals",
    image: "/placeholder.svg",
    category: "Women",
    subCategory: "Sandals"
  },
  {
    id: "watches",
    name: "Watches",
    image: "/placeholder.svg",
    category: "Electonics",
    subCategory: "Watches"
  },  
  {
    id: "women-slippers",
    name: "Women Slippers",
    image: "/placeholder.svg",
    category: "Women",
    subCategory: "Slippers"
  },
  {
    id: "earbuds",
    name: "Earbuds",
    image: "/placeholder.svg",
    category: "Electonics",
    subCategory: "EarBuds"
  }
];

// Get all unique main categories
export const getMainCategories = (): string[] => {
  const uniqueCategories = [...new Set(categories.map(cat => cat.category))];
  return uniqueCategories;
};

// Get all categories for display
export const getAllCategories = (): Category[] => {
  return categories;
};
