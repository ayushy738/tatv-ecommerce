import React, { createContext, useContext, useState, useEffect } from "react";
import { getProducts, Product } from "../data/products";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { AppContent } from "./AppContext";

interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
}

interface CartContextType {
  backendUrl: string;
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number, size?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number, size?: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const { backendUrl, setIsLoggedin, getUserData, token, setToken } = useContext(AppContent);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!token && storedToken) {
      setToken(storedToken);
      getUserCart(storedToken);
    }
  }, [token]);

  useEffect(() => {
    getProducts();
  }, []);

  const getUserCart = async (token: string) => {
  try {
    const response = await axios.post(`${backendUrl}/api/cart/get`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });


    if (response.data.success) {
      const cartObj = response.data.cartData;
      const products = await getProducts();
      const cartArr: CartItem[] = [];

      for (const productId in cartObj) {
        if (cartObj.hasOwnProperty(productId)) {
          const entry = cartObj[productId];
          const product = products.find(p => String(p.id) === String(productId));

          if (!product) {
            console.warn(`Product with id ${productId} not found in products list.`, products.map(p => p.id));
            continue; // skip unknown products
          }

          // If it's a sized product (e.g. { "8": 2, "9": 1 })
          if (typeof entry === "object" && entry !== null) {
            for (const size in entry) {
              cartArr.push({
                product,
                quantity: entry[size],
                size: size === "undefined" ? undefined : size,
              });
            }
          }

          // If it's a non-sized product (e.g. 3)
          else if (typeof entry === "number") {
            cartArr.push({
              product,
              quantity: entry,
              size: undefined,
            });
          }
        }
      }

      setCartItems(cartArr);
    } else {
      console.error("API returned failure:", response.data.message);
    }
  } catch (error) {
    console.error("Failed to fetch user cart", error);
    toast({
      title: "Error",
      description: error instanceof Error ? error.message : "Failed to fetch user cart",
      variant: "destructive",
    });
  }
};


  const addToCart = async (product: Product, quantity: number, size?: string) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.product.id === product.id && item.size === size
      );

      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        toast({
          title: "Cart updated",
          description: `${product.name} quantity increased to ${updatedItems[existingItemIndex].quantity}`,
        });
        return updatedItems;
      } else {
        toast({
          title: "Added to cart",
          description: `${quantity} x ${product.name} added to your cart`,
        });
        return [...prevItems, { product, quantity, size }];
      }
    });

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId: product.id, size, quantity },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
      } catch (error) {
        console.error("Failed to add item to cart on server", error);
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to add item to cart on server",
          variant: "destructive",
        });
      }
    }
  };

 const removeFromCart = (productId: string, size?: string) => {
  // Optimistic UI update
  setCartItems(prevItems =>
    prevItems.filter(item => !(item.product.id === productId && item.size === size))
  );

  toast({
    title: "Item removed",
    description: "Product has been removed from your cart",
  });

  // Backend sync
  if (token) {
    axios.delete(`${backendUrl}/api/cart/remove`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        itemId: productId,
        size: size || "", // Send empty string if undefined
      },
    }).then(response => {
      if (!response.data.success) {
        toast({
          title: "Warning",
          description: response.data.message || "Could not remove item completely",
          variant: "destructive",
        });
      }
    }).catch(error => {
      console.error("Failed to remove item from cart on server", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to remove item from cart on server",
        variant: "destructive",
      });
    });
  }
};



 const updateQuantity = (productId: string, quantity: number, size?: string) => {
  const parsedQty = Number(quantity);

  setCartItems(prevItems => {
    // Remove item if quantity <= 0
    if (parsedQty <= 0) {
      return prevItems.filter(item => !(item.product.id === productId && item.size === size));
    }

    return prevItems.map(item => {
      if (item.product.id === productId && item.size === size) {
        return { ...item, quantity: parsedQty };
      }
      return item;
    });
  });

  if (token) {
    axios.post(
      `${backendUrl}/api/cart/update`,
      { itemId: productId, quantity: parsedQty, size },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    ).then(res => {
      if (parsedQty <= 0) {
        toast({
          title: "Item removed",
          description: "Product removed from your cart",
        });
      } else {
        toast({
          title: "Quantity updated",
          description: `Item quantity set to ${parsedQty}`,
        });
      }
    }).catch(error => {
      console.error("Failed to update item quantity on server", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update item quantity on server",
        variant: "destructive",
      });
    });
  }
};

  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  };

  const getCartTotal = () => {
    if (!Array.isArray(cartItems)) return 0;
    return cartItems.reduce((total, item) => {
      const price = item.product.price;
      return total + price * item.quantity;
    }, 0);
  };

  const getCartCount = () => {
    if (!Array.isArray(cartItems)) return 0;
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };



  return (
    <CartContext.Provider
      value={{
        backendUrl,
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        setCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
