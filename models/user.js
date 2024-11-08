import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,

});

const User = mongoose.model('User', userSchema);
export default User;
