import User from "./Users.model.js";
import bcrypt from 'bcryptjs';

export const registerUser = async (req, res) => {
  const { name, email, password , image } = req.body;
  if (!name || !email || !password || !image) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword , image });

    res.status(201).json({ message: 'User registered successfully', user: { name: newUser.name, email: newUser.email , image : newUser.image} });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    res.json({ message: 'Login successful', user : {email : user.email , _id : user._id , image : user.image , name : user.name} });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

