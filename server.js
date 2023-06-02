import express, { json } from "express";
const app = express()
const PORT = 3000
import connectDB from "./db";
import authRouter from "./auth/route";
import cookieParser from 'cookie-parser';
import { adminAuth, userAuth } from "./middleware/auth";

//setting EJS as our default view engine
app.set("view engine", "ejs");
app.get("/", (req, res) => res.render("home"))
app.get("/register", (req, res) => res.render("register"))
app.get("/login", (req, res) => res.render("login"))
app.get("/admin", adminAuth, (req, res) => res.render("admin"))
app.get("/basic", userAuth, (req, res) => res.render("user"))
app.get("/logout", (req, res) => {
    res.cookie("jwt", "", { maxAge: "1"})
    res.redirect("/")
})

connectDB();
app.use(json());

app.use("/api/auth", authRouter);
app.use(cookieParser());

app.get("/admin", adminAuth, (req, res) => res.send("Admin Route"));
app.get("/basic", userAuth, (req, res) => res.send("User Route"));


app.listen(PORT, () => console.log(`Server Connected to port ${PORT}`));

//handling error
process.on("unhandled Rejection", err => {
    console.log(`An error occured: ${err.essage}`)
    server.close(() => process.exit(1))
})