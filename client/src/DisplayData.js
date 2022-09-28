import React, { useState } from "react";
import { useQuery, useLazyQuery, useMutation, gql } from "@apollo/client";

// this is where our tooltip can help us query the graphql schema
const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      age
      username
      nationality
    }
  }
`;

const QUERY_ALL_MOVIES = gql`
  query GetAllMovies {
    movies {
      name
    }
  }
`;

const GET_MOVIE_BY_NAME = gql`
  query Movie($name: String!) {
    movie(name: $name) {
      name
      year
    }
  }
`;

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      name
      id
    }
  }
`;

function DisplayData() {
  // Create movie states
  const [movieSearched, setMovieSearched] = useState("");

  // Create user states
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [nationality, setNationality] = useState("");

  // useQuery will query our data
  const { data, loading, refetch, error } = useQuery(QUERY_ALL_USERS);
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);

  // useLazyQuery returns a query function in its result tuple that you call whenever you're ready to execute the query.
  const [fetchMovie, { data: movieSearchedData, error: movieError }] =
    useLazyQuery(GET_MOVIE_BY_NAME);

  const [createUser] = useMutation(CREATE_USER_MUTATION);

  if (movieError) {
    console.log("Could not find movie ->", movieError);
  }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Name.."
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Username.."
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Age.."
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Nationality.."
          onChange={(event) => {
            setNationality(event.target.value);
          }}
        />
        <button
          onClick={() => {
            createUser({
              variables: {
                input: { name, username, age: Number(age), nationality },
              },
            });
            // refetched data without needed to refresh page
            refetch()
          }}
        >
          {" "}
          Create User{" "}
        </button>
      </div>
      {data &&
        data.users.map((user) => {
          return (
            <div>
              <h1>Name: {user.name}</h1>
              <h1>Username: {user.username}</h1>
              <h1>Age: {user.age}</h1>
              <h1>Nationality: {user.nationality}</h1>
            </div>
          );
        })}

      {movieData &&
        movieData.movies.map((movie) => {
          return <h1>Movie Name: {movie.name}</h1>;
        })}

      <div>
        <input
          type="text"
          placeholder="Search Movies..."
          onChange={(event) => {
            setMovieSearched(event.target.value);
          }}
        />
        <button
          onClick={() => {
            fetchMovie({
              variables: {
                name: movieSearched,
              },
            });
          }}
        >
          Search
        </button>
        <div>
          {movieSearchedData && (
            <div>
              {" "}
              <h1>MovieName: {movieSearchedData.movie.name}</h1>{" "}
              <h1>Year Of Publication: {movieSearchedData.movie.year}</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DisplayData;
