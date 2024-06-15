import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      require: false,
    },
    name: {
      type: String,
      require: false,
    },
    firstname: {
      type: String,
      require: false,
    },
    lastname: {
      type: String,
      require: false,
    },
    age: {
      type: Number,
      require: false,
    },
    userID: {
      type: Number,
      require: true,
      unique: true,
    },
    image: {
      type: String,
      require: false,
    },
  },
  { timestamps: true }
);

const mongooseUser = models["users"] || model("users", UserSchema);
export default mongooseUser;
