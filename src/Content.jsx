import React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

import recipesQuery from "./recipesQuery";

const updateRecipeStarredMutation = gql`
  mutation updateRecipeStarred($id: ID!, $isStarred: Boolean!) {
    updateRecipeStarred(id: $id, isStarred: $isStarred) @client
  }
`;
class Content extends React.Component {
  state = {
    vegetarian: false
  };

  render() {
    return (
      <>
        <label>
          <input
            type="checkbox"
            value={this.state.vegetarian}
            onChange={() =>
              this.setState({ vegetarian: !this.state.vegetarian })
            }
          />
          <span>Is vegetarian</span>
        </label>
        <Query
          query={recipesQuery}
          variables={{ vegetarian: this.state.vegetarian }}
          //Rerun request every 3 seconds
          pollInterval={3000}
        >
          {({ data, loading, error, refetch }) => {
            console.log(data);
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Ooops....</p>;
            return (
              <>
                <ul>
                  {data.recipes.map(({ id, title, isStarred }) => (
                    <li key={id}>
                      {title}
                      <Mutation
                        mutation={updateRecipeStarredMutation}
                        refetchQueries={[
                          {
                            query: recipesQuery,
                            variables: { vegetarian: true }
                          },
                          {
                            query: recipesQuery,
                            variables: { vegetarian: false }
                          }
                        ]}
                        awaitRefetchQueries
                      >
                        {(updateRecipeStarred, { loading }) => (
                          <>
                            <button
                              className="star-btn"
                              style={{
                                color: isStarred ? "orange" : "#fff",
                                animation: loading
                                  ? "inflate 0.7s ease infinite alternate"
                                  : "none",
                                cursor: "pointer"
                              }}
                              onClick={() =>
                                updateRecipeStarred({
                                  variables: {
                                    id,
                                    isStarred: !isStarred
                                  }
                                })
                              }
                            >
                              ★
                            </button>
                          </>
                        )}
                      </Mutation>
                    </li>
                  ))}
                </ul>
                <button onClick={() => refetch()}>
                  Refetch data
                </button>
              </>
            );
          }}
        </Query>
      </>
    );
  }
}

export default Content;
