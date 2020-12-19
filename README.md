# graphql-api-mongoose

A GraphQL API that uses a local MongoDB connection. 
Built with [express](https://github.com/expressjs/express) and [express-graphql](https://github.com/graphql/express-graphql).

Queries and mutations on this API reflect possible operations one may need to perform on a simple flashcard app.

* <code>words: [Word]</code>
* <code>groups: [Group]</code>
* <code>word(id: ID): Word</code>
* <code>group(id: ID): Group</code>
* <code>addGroup(name: String): Group</code>
* <code>addNewWordToGroup(
word: String,
meaning: String,
group: ID
): Word</code>
* <code>removeGroup(id: ID): Group</code>
* <code>removeWordFromGroup(id: ID): Group</code>
* <code>editWord(
id: ID,
word: String,
meaning: String,
group: ID
): Word</code>
* <code>editGroupName(id: ID, name: String): Group</code>
