import {ApolloClient, InMemoryCache} from "@apollo/client";
import {loadDevMessages, loadErrorMessages} from "@apollo/client/dev";

loadDevMessages();
loadErrorMessages();

export const client = new ApolloClient({
    uri: "https://localhost:7210/graphql",
    cache: new InMemoryCache()
});

