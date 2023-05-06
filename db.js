const Mongoose = require("mongoose")
const localDB = `mongodb://localhost:270127/user-auth`

const connectDB = async () => {
    await Mongoose.connect(localDB, {
        useNewUrlParser: true,
        useInifiedTopology: true,
    })
    console.log("MongoDB Connected")
}
module.exports = connectDB