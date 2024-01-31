import { Schema, model, models } from "mongoose";

const savePinSchema = new Schema({
  pinId: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});

const SavePin = models.SavePin || model("SavePin", savePinSchema);

export default SavePin;
