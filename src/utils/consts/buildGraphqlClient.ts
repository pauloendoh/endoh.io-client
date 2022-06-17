import { GraphQLClient } from "graphql-request";
import { urls } from "utils/urls";

const buildGraphqlClient = () => {
  const userStr = localStorage.getItem("user");

  return new GraphQLClient(urls.graphql, {
    headers: {
      "x-auth-token": userStr ? JSON.parse(userStr).token : undefined,
    },
  });
};

export default buildGraphqlClient;
