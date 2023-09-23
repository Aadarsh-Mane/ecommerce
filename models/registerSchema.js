import  mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address:{
type: String,
required: true,
  },
  cart: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  orders: [
    {
      products: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
          },
          quantity: Number,
          price: Number,
        },
      ],
      total: Number,
    },
  ],
});

// // Hash the user's password before saving it to the database
// userSchema.pre('save', async function (next) {
//   try {
//     const user = this;
//     if (!user.isModified('password')) {
//       return next();
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(user.password, salt);
//     user.password = hashedPassword;
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

 const  User = mongoose.model('User', userSchema);
export default User;

