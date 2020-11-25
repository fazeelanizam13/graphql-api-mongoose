const { buildSchema } = require("graphql")

module.exports = buildSchema(`
  type Word {
    _id: ID
    word: String
    meaning: String
    group: Group
  }
  
  type Group {
    _id: ID
    name: String
    words: [Word]
  }

  type Query {
    words: [Word]
    groups: [Group]
    word (id: ID): Word
    group (id: ID): Group
  }
  
  type Mutation {
    addGroup(name: String): Group
    addNewWordToGroup(word: String, meaning: String, group: ID): Word

    removeGroup(id: ID): Group
    removeWordFromGroup(id: ID): Group

    editWord(id: ID, word: String, meaning: String, group: ID): Word
    editGroupName(id: ID, name: String): Group
  }
`)