import mongoose, { Schema, model } from "mongoose";
import MongooseDelete from "mongoose-delete";
const channelSchema = new Schema(
  {
    server: {
      type: mongoose.Types.ObjectId,
      ref: "Server",
    },
    name: {
      type: String,
      require: true,
    },
    messages: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Message",
      },
    ],
  },
  { timestamps: true }
);
channelSchema.plugin(MongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});
const Channel = model("Channel", channelSchema);
export default Channel;
