import { Schema, model, models } from "mongoose";

// export type PinParams = {
//   _id: string;
//   image: string;
//   title: string;
//   description?: string;
//   link?: string;
//   author: {
//     _id: string;
//     username: string;
//     email: string;
//     photo: string;
//   };
//   tag?: { _id: string; name: string };
//   parentId?: string;
//   children?: {

//   };
// };

const pinSchema = new Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  link: { type: String },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  tag: { type: Schema.Types.ObjectId, ref: "Tag" },
  parentId: { type: String },

  children: [{ type: Schema.Types.ObjectId, ref: "Pin" }],
});

const Pin = models.Pin || model("Pin", pinSchema);

export default Pin;
