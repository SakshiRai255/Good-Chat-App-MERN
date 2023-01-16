import dotenv from "dotenv";
import cors from 'cors'
import express from "express";
import bodyParser from "body-parser";
import chatDatabase from "./configure/chatDatabase.js"
import AuthRoute from "./Routes/AuthRoute.js"
import UserRoute from "./Routes/UserRoute.js"
import PostRoute from "./Routes/PostRoute.js"
import UploadRoute from "./Routes/UploadRoute.js"
import  ChatRoute from "./Routes/ChatRoute.js"
import MessageRoute from "./Routes/MessageRoute.js"


// Routes


dotenv.config();


const app = express();


// to serve images for public

app.use(express.static('public'));
app.use('/images',express.static("images"));

// Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

chatDatabase();


app.use('/auth',AuthRoute)
app.use('/user',UserRoute)
app.use('/posts',PostRoute)
app.use('/upload',UploadRoute)
app.use('/chat',ChatRoute)
app.use('/message',MessageRoute)

export default app