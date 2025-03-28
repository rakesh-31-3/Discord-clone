import mongoose, { Schema, model } from "mongoose";
import MongooseDelete from "mongoose-delete";
const reactionSchema = new Schema({
  message: {
    type: mongoose.Types.ObjectId,
    ref: "Message",
    require: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  emoji: {
    type: String,
    require: true,
  },
});
reactionSchema.plugin(MongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});
const Reaction = model("Reaction", reactionSchema);
export default Reaction;
