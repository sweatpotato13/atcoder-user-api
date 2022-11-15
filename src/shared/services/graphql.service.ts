import { config } from "@config";
import fetch from "cross-fetch"

function fetchGraphQL(
  operationsDoc: string,
  operationName: string,
  variables: Record<string, any>
) {
  return fetch(config.graphqlEndpoint, {
    method: 'POST',
    body: JSON.stringify({
      query: operationsDoc,
      variables,
      operationName,
    }),
    headers: {
      "content-type": "application/json",
      "x-hasura-admin-secret": config.graphqlSecret
    }
  }).then(result => result.json());
}

const operation = `
  query GetUser($handle: String!) {
    user(where: {user: {_eq: $handle}}) {
      bitrh
      highest
      id
      match
      rank
      rating
      user
      win
    }
  }
`;

export class GraphqlService {

  public getUser(handle: string) {
    return fetchGraphQL(operation, "GetUser", { "handle": handle });
  }
}