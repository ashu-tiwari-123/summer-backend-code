const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  reviewer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  reviewedItem: {
    type: Schema.Types.ObjectId,
    ref: 'Product', 
    required: true,
  },
  text: {
    type: String,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Review', reviewSchema);
