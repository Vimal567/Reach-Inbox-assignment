import "dotenv/config";
import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";

import { connectDB } from "./config/db.js";
import "./config/passport.js";

import emailRoutes from "./routes/email.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.set("trust proxy", 1);

await connectDB();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://vimal-reach-inbox.netlify.app"],
    credentials: true
  })
);

app.use(express.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET!,
        resave: false,
        saveUninitialized: false
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/api/emails", emailRoutes);

app.listen(4000, () => console.log("Backend running"));
