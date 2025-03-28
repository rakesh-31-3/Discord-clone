import mongoose, { Schema, model } from "mongoose";
import MongooseDelete from "mongoose-delete";
const notificationsSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["friend_request", "message", "mention"],
    require: true,
  },
  message: {
    type: String,
    require: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
});
notificationsSchema.plugin(MongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});
const Notification = model("Notification", notificationsSchema);
export default Notification;
