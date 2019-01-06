import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

import recipesQuery from "./recipesQuery";

const addRecipeQuery = gql`
  mutation addRecipe($recipe: RecipeInput!) {
    addRecipe(recipe: $recipe) {
      id
      title
    }
  }
`;

class AddRecipe extends Component {
  state = {
    title: "",
    vegetarian: false
  };

  updateVegetarian = ({ target: { checked } }) => {
    this.setState({ vegetarian: checked });
  };

  updateTitle = ({ target: { value } }) => {
    this.setState({ title: value });
  };

  resetFields = () => {
    this.setState({ title: "", vegetarian: false });
  };

  render() {
    return (
      <>
        <Mutation
          mutation={addRecipeQuery}
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
          {(addRecipe, { loading, error }) => (
            <form
              onSubmit={evt => {
                evt.preventDefault();
                addRecipe({
                  variables: {
                    recipe: {
                      title: this.state.title,
                      vegetarian: this.state.vegetarian
                    }
                  }
                });
                this.resetFields();
              }}
            >
              <label>
                <span>Title</span>
                <input
                  type="text"
                  value={this.state.title}
                  onChange={this.updateTitle}
                />
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={this.state.vegetarian}
                  onChange={this.updateVegetarian}
                />
                <span>vegetarian</span>
              </label>
              <div>
                <button>Add Recipe</button>
              </div>
              {loading && <p>Loading...</p>}
              {error && <p>Error...</p>}
            </form>
          )}
        </Mutation>
      </>
    );
  }
}

export default AddRecipe;
