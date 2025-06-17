import userModel from '../models/userModel.js';


export const addToCart = async (req, res) => {
  try {
    const userId = req.userId
    const { itemId, size = '' } = req.body; // fallback size to ''
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Initialize cartData if not present
    if (!user.cartData) {
      user.cartData = {};
    }

    if (!user.cartData[itemId]) {
      user.cartData[itemId] = {};
    }

    if (user.cartData[itemId][size]) {
      user.cartData[itemId][size] += 1;
    } else {
      user.cartData[itemId][size] = 1;
    }

    await user.save(); // safer than findByIdAndUpdate for nested structures

    res.status(200).json({
      success: true,
      message: 'Product added to cart successfully',
      cartData: user.cartData,
    });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const updateCartItem = async (req, res) => {
  const userId = req.userId; // Authenticated user from middleware
  const { itemId, quantity, size = '' } = req.body;

  console.log("Update request received with:", { userId, itemId, size, quantity });

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const parsedQuantity = Number(quantity);
    if (!user.cartData) user.cartData = {};

    // ✅ If size is specified (e.g., for shoes)
    if (size) {
      if (!user.cartData[itemId]) {
        if (parsedQuantity <= 0) {
          return res.status(400).json({ success: false, message: "Invalid: Item not in cart" });
        }
        user.cartData[itemId] = {};
      }

      if (parsedQuantity > 0) {
        user.cartData[itemId][size] = parsedQuantity;
      } else {
        // Delete size
        delete user.cartData[itemId][size];
        // If no sizes left under the item, delete the item itself
        if (Object.keys(user.cartData[itemId]).length === 0) {
          delete user.cartData[itemId];
        }
      }

    } else {
      // ✅ No size provided (e.g., general product)
      if (parsedQuantity > 0) {
        user.cartData[itemId] = parsedQuantity;
      } else {
        delete user.cartData[itemId];
      }
    }

    // Save user with modified cartData
    user.markModified('cartData');
    await user.save();

    console.log("User cart saved successfully");
    return res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cartData: user.cartData,
    });

  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating cart",
    });
  }
};

export const removeCartItem = async (req, res) => {
  const userId = req.userId;
  const { itemId, size = '' } = req.body;

  try {
    const user = await userModel.findById(userId);
    if (!user || !user.cartData) {
      return res.status(404).json({ success: false, message: "User or cart not found" });
    }

    if (user.cartData[itemId]) {
      if (size && user.cartData[itemId][size]) {
        delete user.cartData[itemId][size];

        // If no sizes left under the product, remove the product key
        if (Object.keys(user.cartData[itemId]).length === 0) {
          delete user.cartData[itemId];
        }
      } else if (!size) {
        // If no size provided, remove the entire itemId
        delete user.cartData[itemId];
      }

      user.markModified("cartData");
      await user.save();

      return res.status(200).json({ message: "Item removed", success: true });
    } else {
      return res.status(400).json({ success: false, message: "Item not found in cart" });
    }

  } catch (err) {
    console.error("Remove error:", err);
    res.status(500).json({ message: "Failed to remove item", success: false });
  }
};

export const getUserCart = async (req, res) => {
  try {
    const userId = req.userId; // from auth middleware
    console.log("Fetching cart for userId:", userId);

    if (!userId) {
      return res.status(400).json({ success: false, message: "Missing userId in request" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    const cartData = userData.cartData || {};
    console.log("Cart data from DB:", JSON.stringify(cartData, null, 2));

    res.status(200).json({ success: true, cartData });
  } catch (error) {
    console.error("Error fetching user cart:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};
