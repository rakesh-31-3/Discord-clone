import mongoose, { Schema, model } from "mongoose";
import MongooseDelete from "mongoose-delete";
const userSchema = new Schema(
  {
    displayName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      unique: true,
    },
    DateOfBirth: {
      type: Date,
      require: true,
    },
    profilePic: {
      type: String,
    },
    friends: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);
userSchema.plugin(MongooseDelete, { deletedAt: true, overrideMethods: "all" });
const User = model("User", userSchema);
export default User;
