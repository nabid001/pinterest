import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  photo: {
    type: String,
  },
  savePin: [
    {
      type: Schema.Types.ObjectId,
      ref: "SavePin",
    },
  ],
});

const User = models.User || model("User", userSchema);

export default User;
