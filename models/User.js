import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // username: {
    //     type: String,
    //     required: true,
    //     unique: true,
    //     min: 3,
    //     max: 20,
    // },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    picturePath: {
      type: String,
      default: "",
    },
    firstName: {
      type: String,
      max: 50,
      min: 2,
    },
    lastName: {
      type: String,
      max: 50,
      min: 2,
    },
    // followers: {
    //     type: Array,
    //     default: [],
    // },
    // followings: {
    //     type: Array,
    //     default: [],
    // },
    location: String,
    occupation: String,
    impressions: Number,
    viewedProfile: Number,
    friends: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
