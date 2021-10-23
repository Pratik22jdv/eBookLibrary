const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
//const multer = require("multer");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const bookRoute = require("./routes/books");
const categoryRoute = require("./routes/category")
const router = express.Router();
const path = require("path");

dotenv.config();

// mongoose.connect(
//   process.env.MONGO_URL,
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   () => {
//     console.log("Connected to MongoDB");
//   }
// );



mongoose.connect(
  'mongodb+srv://itsPratik:Database1234@mycluster.uhjpz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});



// mongoose.connect('mongodb://localhost:27017/projectDB' , () => {
//   console.log("DB connected")
// });
// console.log(mongoose.connection.readyState);


//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));


const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration





app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/products", bookRoute);
app.use("/categories", categoryRoute);

app.get("/", (req, res)=>{
  res.send("Hi");
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Backend server is running at " + port);
});
