import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

// routes import
import userRouter from "../routes/user.route.js";
import postRouter from "../routes/post.route.js";

// routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

// example route: http://localhost:5000/api/v1/users/register

export default app;
