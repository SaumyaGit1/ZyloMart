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
      const { userId,itemId, size, quantity } = req.body;
    
      if (quantity <= 0) {
        return res.status(400).json({ success: false, message: 'Quantity must be greater than zero' });
      }
    
      const userData = await userModel.findById(userId);  // Use req.userId from authUser middleware
      if (!userData) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
    
      let cartData = await userData.cartData;
      
        cartData[itemId][size] = quantity;  // Update quantity
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
  
  
export {addToCart,updateCart,getUserCart}