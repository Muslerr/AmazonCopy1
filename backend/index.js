import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import User from "./models/user.js";
import dotenv from "dotenv"

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;
const connectionString=process.env.MONGO_CONNECTION_STRING

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.post('/addUser',async(req, res) => {
    // const user = req.body.user;
    const newUser =  await User.create(req.body);
    res.send(newUser);
   
})
mongoose.connect(connectionString).then(()=>{
    app.listen(port,function(){
        console.log("listening on ", port);
    });
}).catch(err => console.log(err.message));

