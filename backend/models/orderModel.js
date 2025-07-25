import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type:String,
      required: true,
    },
    items: {
        type: Array,
        required:true,
    },
    amount: {
      type: Number,
      required: true,
    },
    address: {
        type:Object,
        required:true,
    },
    status: {
      type: String,
      required:true,
      
      default: 'Order Placed',
    },
    paymentMethod: {
      type: String,
      
      required: true,
    },
    payment: {
      type: Boolean,
      required:true,
      default: false, // Default to order placement time
    },
    date:{type:Number,required:true}
  },
   // Automatically adds createdAt and updatedAt timestamps
);

// Export the Order model
const orderModel =mongoose.model.order ||mongoose.model('order', orderSchema);
export default orderModel;
