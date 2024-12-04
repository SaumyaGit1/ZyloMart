import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    isAdmin: {
      type: Boolean,
      default: false, // Default to a regular user
    },
    address: {
      type: String,
      default: '',
    },
    phone: {
      type: String,
      default: '',
    },
    cartData: {
      type: Object,
      // { itemId: { size: quantity } }
      default: {},
        },
},
  { minimize:false }
);
const userModel =mongoose.model.user ||mongoose.model('user', userSchema);
export default userModel;