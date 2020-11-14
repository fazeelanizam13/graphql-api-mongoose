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
    addWord(word: String, meaning: String, group: ID): Word
    # editWord(id: ID, word: String, meaning: String): Word
    # deleteWord(id: ID): Word

    addGroup(name: String, words: [ID]): Group
    # editGroup(id: ID, name: String): Group
    # deleteGroup(id: ID): Group
  }
`)