import mongoose, { Schema, model } from "mongoose";
import MongooseDelete from "mongoose-delete";
const messageSchema = new Schema(
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
    content: {
      type: String,
      require: true,
    },
    channel: {
      type: mongoose.Types.ObjectId,
      ref: "Channel",
    },
    contentType: {
      type: String,
      enum: ["text", "photo", "video"],
      require: true,
      default: "text",
    },
  },
  { timestamps: true }
);
messageSchema.plugin(MongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});
const Message = model("Message", messageSchema);
export default Message;
