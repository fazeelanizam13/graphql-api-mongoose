const resolvers = {
  Query: {
    words: async (parent, args, { models: { wordModel } }, info) => {
      const words = await wordModel.exec();
      return words;
    },
    word: async (parent, { id }, { models: { wordModel } }, info) => {
      const word = await wordModel.findById({ _id: id }).exec();
      return word;
    },
    groups: async (parent, args, { models: { groupModel } }, info) => {
      const groups = await groupModel.exec();
      return groups;
    },
    group: async (parent, { id }, { models: { groupModel } }, info) => {
      const group = await groupModel.findById({ _id: id }).exec();
      return group;
    },
  },
  Mutation: {
    addWord: async (parent, { word, meaning, group_id }, { models: { wordModel } }, info) => {
      const newWord = await wordModel.create({ word, meaning, group: group_id });
      return newWord;
    }
  }
}

module.exports = resolvers