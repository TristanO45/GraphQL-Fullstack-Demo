import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import DisplayData from "./DisplayData";

function App() {
  // instantiate a new instance of ApolloClient to connect to an API
  const client = new ApolloClient({
    // uri specifices the URL of our Graphql server
    uri: "http://localhost:4000/graphql",
    // cache is an instance of inMemoryCache which Apollo Client uses to cache query results after fetching them
    cache: new InMemoryCache(),
  });
  return (
    // ApolloProvider wraps your React app and places Apollo Client on the context, enabling you to access it from anywhere in your component tree.
    <ApolloProvider client={client}>
      <div className="App">
        <DisplayData />
      </div>
    </ApolloProvider>
  );
}

export default App;
