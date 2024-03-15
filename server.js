const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const PORT =  process.env.PORT || 6700;
const app = express();
const connectDB = require('./Config/db');
const authroutes = require('./Routes/UserRoutes');

//Configrations 
dotenv.config(); 
connectDB();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//Routing EndPoint
app.use('/api', authroutes);


//Testing link
app.get('/', (req, res) => {
  res.send(`Welcome🍪`);
});

//Port Link
app.listen(PORT, () => {
  console.log(`Server Started on ${PORT}`);
});