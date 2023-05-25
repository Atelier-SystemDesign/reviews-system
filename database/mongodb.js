const mongoose = require('mongoose');

mongoose.connect(
  'mongodb://localhost/',
  { useNewUrlParser: true, useUnifiedTopology: true },
);

const reviews = new mongoose.Schema({
  id: { type: Number, unique: true },
  product_id: Number,
  rating: Number,
  date: Date,
  summary: String,
  body: String,
  recommend: Boolean,
  reported: Boolean,
  reviewer_name: String,
  reviewer_email: String,
  response: String,
  helpfulness: { type: Number, default: 0 },
});

const reviews_photos = new mongoose.Schema({
  id: { type: Number, unique: true },
  review_id: Number,
  url: String,
});

const characteristic_reviews = new mongoose.Schema({
  id: { type: Number, unique: true },
  characteristic_id: Number,
  review_id: Number,
  value: Number,
});

const characteristics = new mongoose.Schema({
  id: { type: Number, unique: true },
  product_id: Number,
  name: String,
});
