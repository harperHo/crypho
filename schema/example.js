const express = require('express');
const { graphql, buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql');

exports.schema = buildSchema(`
	type User {
		id: ID!
		name: String!
		posts: [Post!]!
	}
	type Post {
		id: ID!
		author: User!
		title: String!
		body: String!
	}
  type Query {
    users: [User!]!
    posts: [Post!]!
  }
`);

const usersById = {
  1: {
    id: 1,
    name: 'hoho',
  },
};

const postsById = {
  1: {
    id: 1,
    authorId: 1,
    title: '111',
    body: '1111body',
  },
  2: {
    id: 2,
    authorId: 1,
    title: '222',
    body: '222body',
  },
};

class GraphQLUser {
  constructor({ id, name }) {
    this.id = id;
    this.name = name;
  }

  posts() {
    return Object.keys(postsById)
    	.map(id => new GraphQLPost(postsById[id]))
    	.filter(post => post.authorId === this.id);
  }
}

class GraphQLPost {
  constructor({ id, authorId, title, body }) {
    this.id = id;
    this.authorId = authorId;
    this.title = title;
    this.body = body;
  }

  author() {
    return new GraphQLUser(usersById[this.authorId]);
  }
}

exports.resolvers = {
	users: () => Object.keys(usersById).map(
		id => new GraphQLUser(usersById[id])
	),
	posts: () => Object.keys(postsById).map(
    id => new GraphQLPost(postsById[id])
  ),
};

// exports.resolvers = {
// 	users: () => Object.keys(usersById).map(id => usersById[id]),
// 	posts: () => Object.keys(postsById).map(id => postsById[id]),
// };

