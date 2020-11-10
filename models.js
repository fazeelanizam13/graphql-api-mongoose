const mongoose = require('mongoose')

const wordSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
  },
  meaning: {
    type: String,
    required: true,
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'group',
  },
})

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  words: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'word',
    },
  ],
})

module.exports = {
  word: mongoose.model('word', wordSchema),
  group: mongoose.model('group', groupSchema)
}