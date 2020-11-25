const { getWords, getWord, getGroups, getGroup } = require("./queries")
const {
  addGroup,
  addNewWordToGroup,
  removeGroup,
  removeWordFromGroup,
  editWord,
  editGroupName,
} = require("./mutations")

const resolvers = {
  words: getWords,
  word: getWord,
  groups: getGroups,
  group: getGroup,
  addGroup: addGroup,
  addNewWordToGroup: addNewWordToGroup,
  removeGroup: removeGroup,
  removeWordFromGroup: removeWordFromGroup,
  editWord: editWord,
  editGroupName: editGroupName,
}

module.exports = resolvers
