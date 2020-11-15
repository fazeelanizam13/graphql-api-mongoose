const { Word, Group } = require('./models')

const resolvers = {
  words: async () => {
    const words = await Word.find().populate('group')
    return words
  },
  word: async ({ id }) => {
    const word = await Word.findById({ _id: id }).populate('group')
    return word
  },
  groups: async () => {
    const groups = await Group.find().populate('words')
    return groups
  },
  group: async ({ id }) => {
    const group = await Group.findById({ _id: id }).populate('words')
    return group
  },
  addGroup: async ({ name }) => { // creates new group
    const a = new Group({ name }) // create new group
    const newGroup = await a.save() // save new group
    return newGroup
  },
  addNewWordToGroup: async ({ word, meaning, group }) => { // creates new word for existing group
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

    return newWordResult
  },
  addNewWordToNewGroup: async ({ word, meaning, input: { name } }) => { // creates new word for a new group
    const a = new Word({ // create new word
      word: word,
      meaning: meaning
    })
    const newWord = await a.save() // save new word

    const b = new Group({ name }) // create new group
    const newGroup = await b.save() // save new group

    const c = await Word.findByIdAndUpdate( // assign new group to new word
      { _id: newWord._id },
      { group: newGroup._id }
    )

    const d = await Group.findByIdAndUpdate( // add new word to new group
      { _id: newGroup._id },
      { $push: { words: newWord._id } }
    )

    const result = await Word.findById({ _id: newWord._id }).populate('group')
    return result
  },
  removeGroup: async ({ id }) => { // deletes group with its words
    const oldData = await Group.findById({ _id: id })

    const a = await Group.findByIdAndDelete({ _id: id })

    for(let i=0; i < oldData.words.length; i++) {
      const b = await Word.findByIdAndDelete({ _id: oldData.words[i]})
    }

    return a
  },
  removeWordFromGroup: async ({ id }) => { // deletes word
    const oldData = await Word.findById({ _id: id })

    const a = await Word.findByIdAndDelete({ _id: id })

    const b = await Group.findByIdAndUpdate(
      { _id: oldData.group },
      { $pull: { words: id } }
    )
    
    const newGroup = await Group.findById({ _id: oldData.group }).populate('words')
    return newGroup
  },
  editWord: async ({ id, word, meaning, group }) => {
    const oldData = await Word.findById({ _id: id })

    const a = await Word.findByIdAndUpdate( // update word details
      { _id: id },
      { word, meaning, group }
    )

    if(oldData.group != group){ // if new group is different
      const b = await Group.findByIdAndUpdate( // pull word from old group
        { _id: oldData.group },
        { $pull: { words: word } }
      )
      const c = await Group.findByIdAndUpdate( // push word to new group
        { _id: group },
        { $push: { words: word } }
      )
    }

    const newWord = await Word.findById({ _id: id }).populate('group')
    return newWord
  },
  editGroupName: async ({ id, name }) => { // edits group name
    const a = await Group.findByIdAndUpdate({ _id: id }, { name })
    const newGroup = await Group.findById({ _id: id })
    return newGroup
  },
}

module.exports = resolvers