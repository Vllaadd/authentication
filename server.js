const express = require("express")
const app = express()
const PORT = 3000
const connectDB = require("./db")
const authRouter = require("./auth/route");
const cookieParser = require('cookie-parser');
const { adminAuth, userAuth } = require("./middleware/auth");

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
app.use(express.json());

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