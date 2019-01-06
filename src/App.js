import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider, ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";

import "./App.css";

import Content from "./Content";

const client = new ApolloClient({
  uri: "http://localhost:4000/"
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
          <ApolloConsumer>
            {client => {
              client
                .query({
                  query: gql`
                    {
                      recipes {
                        id
                        title
                      }
                    }
                  `
                })
                .then(result => console.log(result));
              return <Content />;
            }}
          </ApolloConsumer>
        </ApolloProvider>
      </div>
    );
  }
}

export default App;
