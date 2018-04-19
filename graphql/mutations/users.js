import { USERS_CHANGED } from '../topics';
import { usersById, postsById } from '../mockData';
import getPubSub from '../utils/getPubSub.js';

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
	addUser: (root, { name }) => {
    const pubsub = getPubSub();
    const nextId = Math.max.apply(null, Object.keys(usersById)) + 1;
    const newUser = {
      id: nextId,
      name,
    };

    usersById[nextId] = newUser;
    console.log('addUser');

    pubsub.publish(USERS_CHANGED, { userAdded: {message: 'User' + name + 'has been added.' }});

    return new GraphQLUser(newUser)
  },
  renameUser: (root, { id, name }) => {
    usersById[id].name = name;

    return new GraphQLUser(usersById[id]);
  },
  deleteUser: (root, { id }) => {
    delete usersById[id];

    return {
      deletedUserId: id,
    };
  },
}