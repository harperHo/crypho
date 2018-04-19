import { usersById, postsById } from '../mockData';

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

export default {
	posts: () => Object.keys(postsById).map(
    id => new GraphQLPost(postsById[id])
  ),
};
