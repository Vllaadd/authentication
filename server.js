const express = require("express")
const app = express()
const PORT = 3000
const connectDB = require("./db")
const authRouter = require("./auth/route");

connectDB();
app.use(express.json());

app.use("/api/auth", authRouter);


app.listen(PORT, () => console.log(`Server Connected to port ${PORT}`));

//handling error
process.on("unhandled Rejection", err => {
    console.log(`An error occured: ${err.essage}`)
    server.close(() => process.exit(1))
})