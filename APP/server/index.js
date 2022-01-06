const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const conversationRoutes=require('./routes/conversation');
const messageRoutes=require('./routes/message');
const postRoutes = require('./routes/posts');
const multer = require('multer');
const path = require('path');


dotenv.config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser : true, useUnifiedTopology : true}, ()=>{
    console.log('connected to mongoDB');
});

app.use("/images", express.static(path.join(__dirname, "public/images")));
// middlewares 
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));


const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "public/images");
    },
    filename: (req,file, cb) =>{
        cb(null, req.body.name);
    }
})

const upload=multer({storage});
app.post("/api/upload", upload.single("file"), (req, res)=>{
    try{
        return res.status(200).json("File uploaded successfully.");
    }catch(err){
        console.log(err);
    }
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/conversation", conversationRoutes);
app.use("/api/messages", messageRoutes);

app.listen(8800, ()=>{
    console.log("server running ");
});