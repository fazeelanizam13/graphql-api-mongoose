const { getWords, getWord, getGroups, getGroup } = require("./queries")
const {
  addGroup,
  addNewWordToGroup,
  addNewWordToNewGroup,
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
  addNewWordToNewGroup: addNewWordToNewGroup,
  removeGroup: removeGroup,
  removeWordFromGroup: removeWordFromGroup,
  editWord: editWord,
  editGroupName: editGroupName,
}

module.exports = resolvers
