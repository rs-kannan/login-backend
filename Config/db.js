const mongoose = require('mongoose');
require("dotenv").config(); 
// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URL); 
//     console.log(`MongoDB Connected : ${conn.connection.host}`);
//   } catch (error) {
//     console.log(`MongoDB Connection Error : ${error.message}`);
//     process.exit();
//   }
// };

const connectDB = () =>  {
  mongoose.connect(process.env.MONGO_URL) 
.then(()=>console.log("connected to database"))
.catch(err=>console.log(err));
}


module.exports = connectDB;