const { UserList, MovieList } = require("../FakeData");
const _ = require("lodash");

// // A resolver is a function that's responsible for populating the data for a single field in your schema. It can populate that data in any way you define, such as by fetching data from a back-end database or a third-party API.

// // If you don't define a resolver for a particular field, Apollo Server automatically defines a default resolver for it.

const resolvers = {
  Query: {
    // USER RESOLVERS
    users: () => {
      // if we were using a db, this is where we would make an API call to the db for users
      return UserList;
    },
    user: (parent, args) => {
      const id = args.id;
      const user = _.find(UserList, { id: Number(id) });
      return user;
    },

    // MOVIES RESOLVERS
    movies: () => {
      return MovieList;
    },
    movie: (parents, args) => {
      const name = args.name;
      const movie = _.find(MovieList, { name });
      return movie;
    },
  },
  // we will use this to give users a favorite movie field without adding it statically to our db
  User: {
    favoriteMovies: () => {
      return _.filter(
        MovieList,
        (movie) => movie.year >= 2000 && movie.year <= 2010
      );
    },
  },

  Mutation: {
    createUser: (parent, args) => {
      const user = args.input;
      // we would add logic for inserting into db here
      const lastId = UserList[UserList.length - 1].id;
      user.id = lastId + 1;
      UserList.push(user);
      return user;
    },

    updateUsername: (parent, args) => {
      // destructure to access the id and the newusername that will be passed in the arg
      const { id, newUsername } = args.input;
      let userUpdated;
      // find the user with the given id and change its username
      UserList.forEach((user) => {
        if (user.id === id) {
          user.username = newUsername;
          userUpdated = user;
        }
      });
      return userUpdated;
    },

    deleteUser: (parent, args) => {
      const id = args.id
      _.remove(UserList, (user) => user.id === Number(id))
      return args.name
    }
  },
};

module.exports = { resolvers };
