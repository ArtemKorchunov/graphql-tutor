import gql from "graphql-tag";

export default gql`
  query($vegetarian: Boolean!) {
    recipes(vegetarian: $vegetarian) {
      id
      title
      isStarred @client
    }
  }
`;
