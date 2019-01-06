import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import "./App.css";

import Content from "./Content";
import AddRecipe from "./AddRecipe";

export const STARRED_RECIPES = "starredRecipes";

const resolvers = {
  Recipe: {
    isStarred: parent => {
      const starredRecipes =
        JSON.parse(localStorage.getItem(STARRED_RECIPES)) || [];
      return starredRecipes.includes(parent.id);
    }
  },
  Mutation: {
    updateRecipeStarred: (_, variables) => {
      const starredRecipes =
        JSON.parse(localStorage.getItem(STARRED_RECIPES)) || [];
      console.log(starredRecipes, variables.id);
      if (variables.isStarred) {
        localStorage.setItem(
          STARRED_RECIPES,
          JSON.stringify(starredRecipes.concat([variables.id]))
        );
      } else {
        localStorage.setItem(
          STARRED_RECIPES,
          JSON.stringify(starredRecipes.filter(item => item !== variables.id))
        );
      }
      return {
        __typename: "Recipe",
        isStarred: variables.isStarred
      };
    }
  }
};

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  clientState: { resolvers }
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img
            src={
              "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/GraphQL_Logo.svg/2000px-GraphQL_Logo.svg.png"
            }
            className="App-logo"
            alt="logo"
          />
          <p>GraphQL</p>
        </header>
        <ApolloProvider client={client}>
          <section>
            <AddRecipe />
            <Content />
          </section>
        </ApolloProvider>
      </div>
    );
  }
}

export default App;
