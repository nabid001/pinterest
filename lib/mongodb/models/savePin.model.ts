import { Types } from "mongoose";
import { Schema, model, models } from "mongoose";

const savePinSchema = new Schema({
  pinId: {
    type: Schema.Types.ObjectId,
    ref: "Pin",
  },
  author: {
    type: String,
    required: true,
  },
});

const SavePin = models.SavePin || model("SavePin", savePinSchema);

export default SavePin;
