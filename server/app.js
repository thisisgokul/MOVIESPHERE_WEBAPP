const express=require("express");
const cors=require("cors");
const cookieparser=require("cookie-parser");
const mongooseConnect=require("./config/config")
const userRoutes = require('./routes/routes');


const app=express();

// Connect to Database
mongooseConnect();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));

// Use cookie-parser middleware
app.use(cookieparser());

// Routes
app.use('/', userRoutes);

app.listen(5000, () => {
    console.log('server running on port 5000');
});