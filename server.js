const express = require("express")
const app = express()
const PORT = 3000
const connectDB = require("./db")
const authRouter = require("./auth/route");
const cookieParser = require('cookie-parser');
const { adminAuth, userAuth } = require("./middleware/auth");

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