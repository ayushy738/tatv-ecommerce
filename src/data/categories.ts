
export interface Category {
  id: string;
  name: string;
  image: string;
}

export const categories: Category[] = [
  {
    id: "c1",
    name: "Women",
    image: "/products/pink-low-heels.jpg"
  },
  {
    id: "c2",
    name: "Sports Shoes",
    image: "/placeholder.svg"
  },
  {
    id: "c3",
    name: "Sliders & Flip Flops",
    image: "/placeholder.svg"
  },
  {
    id: "c4",
    name: "Electronic Accessories",
    image: "/placeholder.svg"
  },
  {
    id: "c5",
    name: "Sports & Outdoors",
    image: "/placeholder.svg"
  }
];
