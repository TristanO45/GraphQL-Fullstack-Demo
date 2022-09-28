const express = require("express");
const path = require("path");
const cors = require("cors");
const { ApolloServer, gql } = require("apollo-server-express");
const { typeDefs } = require("./schema/typeDefs");
const { resolvers } = require("./schema/resolvers");

// const server = new ApolloServer({ typeDefs, resolvers });

const startServer = async () => {
  const server = new ApolloServer({ typeDefs, resolvers });
  const app = express();
  const bodyParser = require("express").json;
  app.use(express.json());
  app.use(cors());
  app.use(bodyParser());

  await server.start();

  // app.use("/", (req, res) => {
  //   return res
  //     .status(200)
  //     .sendFile(path.join(__dirname, "../client/public/index.html"));
  // });

  server.applyMiddleware({ app: app, bodyParserConfig: true });


  app.listen(4000, () => console.log("Server is running on port 4000"));
};
startServer();
