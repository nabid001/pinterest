import { Schema, model, models } from "mongoose";

const pinSchema = new Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  link: { type: String },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

const Pin = models.Pin || model("Pin", pinSchema);

export default Pin;
