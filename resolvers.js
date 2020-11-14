const { Word, Group } = require('./models')

const resolvers = {
  words: async () => {
    const words = await Word.find()
    return words
  },
  word: async ({ id }) => {
    const word = await Word.findById({ _id: id })
    return word
  },
  groups: async () => {
    const groups = await Group.find()
    return groups
  },
  group: async ({ id }) => {
    const group = await Group.findById({ _id: id })
    return group
  },
  addWord: async function ({ word, meaning, group }) { // creates new word and assigns given group
    const newWord = new Word({ // creating new word
      word: word,
      meaning: meaning,
      group: group
    })

    const newWordResult = await newWord.save()

    const updatedGroupResult = await Group.findByIdAndUpdate( // adding new word to the given group's word list
      { _id: newWordResult.group }, 
      { $push: { words: newWordResult._id } }
    )

    return {
      _id: newWordResult._id,
      word: newWordResult.word,
      meaning: newWordResult.meaning,
      group: updatedGroupResult
    }
  },
  addGroup: async function ({ name, words }) { // creates new group and adds words to that group
    const newGroup = new Group({ // creating new group
      name: name,
      words: words
    })
    
    const newGroupResult = await newGroup.save()

    let updatedWordsResult = []

    for(let i=0; i < words.length; i++) { // updating group id of given words
      let updateResult = await Word.findByIdAndUpdate(
        { _id: words[i] }, 
        { group: newGroupResult._id }
      )
      updatedWordsResult.push(updateResult)
    }
    
    return {
      _id: newGroupResult._id,
      name: newGroupResult.name,
      words: updatedWordsResult
    }
  },
}

module.exports = resolvers