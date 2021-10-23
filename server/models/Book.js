const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    bookName: {
      type: String,
      required: true,
    },
    bookType:{
      type: String,
    },
    desc: {
      type: String,
      max: 500,
    },
    rating:{
        type:Number
    },
    img: {
      type: String,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", BookSchema);