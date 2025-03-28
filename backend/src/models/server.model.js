import mongoose, { Schema, model } from "mongoose";
import MongooseDelete from "mongoose-delete";
const serverSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    icon: {
      type: String,
      default: "",
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      require: true,
    },
    members: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    channels: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Channel",
      },
    ],
  },
  {
    timestamps: true,
  },
);
serverSchema.plugin(MongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});
const Server = model("Server", serverSchema);
export default Server;
