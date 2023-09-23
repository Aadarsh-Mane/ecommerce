import jwt  from'jsonwebtoken'
import bcrypt  from 'bcrypt'
import  User  from  '../models/registerSchema.js'
const secretKey = 'adddy';

export const register = async (req, res) => {
  try {
    const { email, password ,address} = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
      address
    });

    await newUser.save();

    // Create a JWT token for the new user
    const token = jwt.sign({ userId: newUser._id }, 'adddy', { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
export const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  export const resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;
  
    try {
      // Find the user by their email
      const user = await User.findOne({ email });
  
      // Check if the user exists
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Generate a new salt
      const salt = await bcrypt.genSalt(10);
  
      // Hash the new password with the generated salt
      const hashedPassword = await bcrypt.hash(newPassword, salt);
  
      // Update the user's password
      user.password = hashedPassword;
  
      // Save the updated user document
      await user.save();
  
      // Create a new JWT token for the user
      const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
  
      res.status(200).json({ token });
    } catch (error) {
      console.error(error); // Log the error to the console
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  
  
  
  
  
  
  
