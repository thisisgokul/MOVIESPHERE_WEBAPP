const User = require('../model/userModel')
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
dotenv.config()

const options = {
  maxAge: 1000 * 60 * 60 * 24 * 30, 
  httpOnly: true,
  sameSite: 'Strict', 
  secure: true
};
const signup = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const existingUser = await User.findOne({ email }); 
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10); 
        const userDoc = await User.create({ name, email, password: hashedPassword });
        res.json(userDoc);
    } catch (error) {
        res.status(500).json({ error: "An error occurred during signup" });
    }
};


const login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
      const userDoc = await User.findOne({ email }).exec();
    
      if (!userDoc) {
        return res.status(404).json({ error: 'User not found' });
      }
    
      const passOK = bcrypt.compareSync(password, userDoc.password);
    
      if (!passOK) {
        return res.status(401).json({ error: 'Incorrect password' });
      }
    
      const token = jwt.sign({ email: userDoc.email, id: userDoc._id }, process.env.JWT_SECRET);
    
      res.cookie('token', token).json(userDoc);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred during login' });
    }
  };

  const google = async (req, res) => {
    const { name, email } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SECRET);
        res.cookie('token', token, options).json(existingUser);
      } else {
        const userDoc = await User.create({
          name,
          email,
        });
        const token = jwt.sign({ email: userDoc.email, id: userDoc._id }, process.env.JWT_SECRET);
        res.cookie('token', token, options).json(userDoc);
      }
    } catch (error) {
      res.status(500).json({ error: 'An error occurred during login' });
  };
  }
const logout = (req, res) => {
  res.clearCookie('token').status(200).json('Signout success!');
  };

  module.exports={signup,login,logout,google}
