import { Schema, model, models } from "mongoose";

const tagSchema = new Schema({
  name: { type: String, required: true, unique: true },
});

const Tag = models.Tag || model("Tag", tagSchema);

export default Tag;
