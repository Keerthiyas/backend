const User = require('../models/user');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
   
    const userexists = await User.findOne({ email });
    if (userexists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashpass = await bcrypt.hash(password,10);
    const user = new User({ name, email,password: hashpass});
    await user.save();
    res.status(201).json({ message: "User created", user });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
exports.login = async (req, res) => {
  try{
    const{email,password} = req.body;
    
    const userexists = await User.findOne({ email });
    if(!userexists){
      return res.status(400).json({message:"User does not exist"});
    }
    const isMatch = await bcrypt.compare(password,userexists.password);
    if(!isMatch){
      return res.status(400).json({message:"Invalid credentials"});
    }
    const jwtToken = jsonwebtoken.sign({id:userexists._id,role:userexists.role},process.env.JWT_SECRET,{expiresIn:"1h"});
    res.status(200).json({ message: "Login successful", token: jwtToken });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};