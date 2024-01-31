import { model } from "mongoose";
import { Schema, models } from "mongoose";

const commentSchema = new Schema({
  pinId: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Comment = models.Comment || model("Comment", commentSchema);

export default Comment;
