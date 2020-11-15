const mongoose = require("mongoose")

const { ObjectId, String } = mongoose.Schema.Types

const wordSchema = new mongoose.Schema({
  word: String,
  meaning: String,
  group: {
    type: ObjectId,
    ref: "group",
  },
})

const groupSchema = new mongoose.Schema({
  name: String,
  words: [
    {
      type: ObjectId,
      ref: "word",
    },
  ],
})

module.exports = {
  Word: mongoose.model("word", wordSchema),
  Group: mongoose.model("group", groupSchema),
}
