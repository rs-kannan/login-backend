const User = require('../Models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

//OTP Declare
var OTP;

//Get All Users
const allUsers = async (req, res) => {
  const { email } = req.body;
  try {
      const data = await User.find({}, 'name email picLink DOB');

      if (!data || data.length === 0) {
          return res.status(201).json({
              status: false,
              message: "No data found"
          });
      } else {
          return res.status(200).send({
              userCount: data.length,
              success: true,
              message: "All users data",
              data,
          });
      }
  } catch (error) {
      console.error("Error fetching users:", error);
      return res.status(500).json({
          status: false,
          message: "Internal server error"
      });
  }
};


//Register user
const Register = async (req, res) => {
  try {
    const { name, email, DOB, password, picLink } = req.body;
    if (!name || !email || !DOB || !password || !picLink ) {
      return res
        .status(200)
        .json({ status: false, message: 'Please fill the Details' });
    }
    let userExist = await User.findOne({ email });

    if (userExist) {
      return res
        .status(200)
        .json({ status: false, message: 'User already Regsitered' });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        name,
        email,
        DOB,
        password,
        picLink,
      });
      res.status(201).json({ message: 'Register Successfully', user });
    }
  } catch (error) {
    return res.status(200).json({
      status: false,
      message: 'Something went wrong in register',
      error,
    });
  }
};

//Login User
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ status: false, message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ status: false, message: 'User not found' });
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '30d' });
    return res.status(200).json({
      status: true,
      message: 'Login successful',
      user: {
        name: user.name,
        email: user.email,
        DOB: user.DOB,
        picLink: user.picLink,
      },
      token,
    });
  } catch (error) {
    console.error('Error in login:', error);
    return res.status(500).json({ status: false, message: 'Something went wrong in Login' });
  }
};



module.exports = { Register, Login,  allUsers };