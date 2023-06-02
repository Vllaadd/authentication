const { connect } = require("mongoose");
const database = "mongodb+srv://vladzizic:PasQ4fXrDthSHITw@cluster0.omezruv.mongodb.net/user-authentication";

const connectDB = async () => {
    await connect(database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(()=> console.log("Connected to DB"))
    .catch(console.error);
}
module.exports = connectDB;