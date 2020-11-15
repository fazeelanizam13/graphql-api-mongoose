const { Word, Group } = require("../models")

async function getWords() {
  // gets all words
  const words = await Word.find().populate("group")
  return words
}
async function getWord({ id }) {
  // gets word with the specified ID
  const word = await Word.findById({ _id: id }).populate("group")
  return word
}
async function getGroups() {
  // gets all groups
  const groups = await Group.find().populate("words")
  return groups
}
async function getGroup({ id }) {
  // gets group with the specified ID
  const group = await Group.findById({ _id: id }).populate("words")
  return group
}

module.exports = {
  getWords,
  getWord,
  getGroups,
  getGroup,
}
