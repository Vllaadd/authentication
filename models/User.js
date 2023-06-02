import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minlength: 6,
        required: true
    }, 
    role: {
        type: String,
        default: "Basic",
        required: true
    },
})

const User = model("user", UserSchema)

export default User;