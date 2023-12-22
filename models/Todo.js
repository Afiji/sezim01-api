import { Schema, model } from "mongoose";

const TodoSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    status: {
      type: Boolean,
      default: false,
      require: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Auth",
      require: true,
    },
    imageUrl: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default model("Todo", TodoSchema);
