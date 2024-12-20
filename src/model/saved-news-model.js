const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  urlToImage: {
    type: String,
    required: true,
  },
  publishedAt: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
});

const SavedNews = mongoose.models.SavedNews ||  mongoose.model('SavedNews', newsSchema);

module.exports = SavedNews;


