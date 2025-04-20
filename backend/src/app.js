import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static("public"))
app.use(cookieParser())

app.get('/', (req, res) => {
    res.status(200).send('Welcome to JamiaRabt Backend');
});
//routes import
import userRouter from './routes/user.routes.js';
import postRouter from "./routes/post.routes.js";
import alumniRouter from "./routes/alumni.routes.js";


// routes declaration
app.use("/api/v1/users", userRouter)


app.use("/api/v1/posts", postRouter);
app.use("/api/v1/alumni", alumniRouter);
export { app }