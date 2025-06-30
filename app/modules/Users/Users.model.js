import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    UserName: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);
export default User;