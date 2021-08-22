import { config } from "@config";
import fetch from "node-fetch"

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