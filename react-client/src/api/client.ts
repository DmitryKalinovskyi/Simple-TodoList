import {ApolloClient, InMemoryCache} from "@apollo/client";

export const client = new ApolloClient({
    uri: "https://localhost:7210/graphql",
    cache: new InMemoryCache()
});

