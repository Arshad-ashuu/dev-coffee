import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    productName: String,
    quantity: Number,
    date: { type: Date, default: Date.now },
  });
  
 const Order = mongoose.model('Order', orderSchema);
  export default Order