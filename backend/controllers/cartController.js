import userModel from "../models/userModel.js";


// Improved addToCart


const addToCart = async (req, res) => {
  try {
    const { userId,itemId, size } = req.body;

    if (!itemId || !size) {
      return res.status(400).json({ success: false, message: 'Item and size are required' });
    }

    const userData = await userModel.findById(userId);  // Use req.userId from authUser middleware
    if (!userData) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    let cartData = await userData.cartData || {};
    
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    const updatedUser = await userModel.findByIdAndUpdate(userId, { cartData });
    
    if (!updatedUser) {
      return res.status(500).json({ success: false, message: 'Failed to update user cart' });
    }

    res.json({ success: true, message: 'Added to Cart' });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ success: false, message: 'Failed to update cart' });
  }
};



  // Improved updateCart
  const updateCart = async (req, res) => {
    try {
      const { userId, itemId, size, quantity } = req.body;
      
      const userData = await userModel.findById(userId); // Use req.userId from authUser middleware
      if (!userData) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      let cartData = userData.cartData;
  
      if (quantity === 0) {
        // Remove the specific size from the item
        delete cartData[itemId][size];
  
        // If no sizes remain for this item, remove the entire item
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      } else {
        // Update quantity
        if (!cartData[itemId]) {
          cartData[itemId] = {};
        }
        cartData[itemId][size] = quantity;
      }
  
      await userModel.findByIdAndUpdate(userId, { cartData });
  
      return res.json({ success: true, message: 'Cart updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Failed to update cart' });
    }
  };
  // Improved getUserCart
  const getUserCart = async (req, res) => {
    try {
      const {userId}=req.body
      const userData = await userModel.findById(userId);  // Use req.userId from authUser middleware
      
      if (!userData) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      const cartData = userData.cartData || {};
      return res.json({ success: true, cartData });
    } catch (error) {
      console.error('Error retrieving cart:', error.message);
      res.status(500).json({ success: false, message: 'Failed to retrieve cart' });
    }
  };
  const removeCart=async(req,res)=>{
    try {
      const { userId, itemId, size } = req.body;
  
      // Find the user
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Check if item exists in the cart
      if (!user.cartData[itemId] || !user.cartData[itemId][size]) {
        return res.status(400).json({ message: "Item not in cart" });
      }
  
      // Remove the item from cart
      delete user.cartData[itemId][size];
  
      // If no sizes remain, remove the item completely
      if (Object.keys(user.cartData[itemId]).length === 0) {
        delete user.cartData[itemId];
      }
  
      // Save updated cart to DB
      await user.save();
  
      return res.status(200).json({ message: "Item removed successfully", cart: user.cartData });
    } catch (error) {
      console.error("Error removing item from cart:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  
export {addToCart,updateCart,getUserCart,removeCart}