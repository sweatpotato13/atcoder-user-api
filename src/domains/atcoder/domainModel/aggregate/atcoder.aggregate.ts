import { Injectable } from "@nestjs/common";
import { config } from "@src/config";
import fetch from "node-fetch";

@Injectable()
export class AtcoderAggregate {
    async getUserInfo(handle: string): Promise<string> {
        const operation = `
        query MyQuery {
          userinfo(where: {user: {_eq: "${handle}"}}) {
            birth
            highest
            match
            rank
            rating
            user
            win
          }
        }
      `;
        return this.fetchMyQuery(operation)
            .then(({ data, errors }) => {
                if (errors) {
                    console.error(errors);
                }
                return data;
            })
            .catch(error => {
                console.error(error);
            });
    }
    async fetchGraphQL(operationsDoc: string, operationName: string) {
        return fetch(
            `http://${config.hasuraEndPoint}:${config.hasuraPort}/v1/graphql`,
            {
                method: "POST",
                body: JSON.stringify({
                    query: operationsDoc,
                    operationName,
                }),
                headers: {
                    "Content-Type": "application/json",
                    "x-hasura-admin-secret": config.hasuraAdminSecret,
                },
            }
        ).then(result => result.json());
    }
    async fetchMyQuery(operation: string) {
        return this.fetchGraphQL(operation, "MyQuery");
    }
}
