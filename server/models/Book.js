const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BookSchema = new mongoose.Schema(
  {
    bookName: {
      type: String,
      required: true,
    },
    bookType: {
      type: String,
    },
    desc: {
      type: String,
      max: 500,
    },
    rating: {
      type: Number,
    },
    img: {
      type: String,
    },
    comments: [commentSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Book', BookSchema);
