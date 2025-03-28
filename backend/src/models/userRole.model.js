import mongoose, { Schema, model } from "mongoose";
import MongooseDelete from "mongoose-delete";
const userRolesSchema = new Schema(
  {
    server: {
      type: mongoose.Types.ObjectId,
      ref: "Server",
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    permissions: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true },
);
userRolesSchema.plugin(MongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});
const Roles = model("Roles", userRolesSchema);
export default Roles;
