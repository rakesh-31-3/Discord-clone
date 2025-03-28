import mongoose, { Schema, model } from "mongoose";
import MongooseDelete from "mongoose-delete";
const friendRequestSchema = new Schema(
  {
    senderId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      require: true,
    },
    receiverId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      require: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "declined"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);
friendRequestSchema.plugin(MongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});
const FriendRequest = model("FriendRequest", friendRequestSchema);
export default FriendRequest;
