import { BASE_GRAPHQL_URL } from "@/lib/config";
import { createClient } from 'graphql-ws';

// Check if we are in a browser environment
const isBrowser = typeof window !== 'undefined';

const wsClient = createClient({
    url: BASE_GRAPHQL_URL,
    webSocketImpl: isBrowser ? WebSocket : require('ws')
})

export default wsClient;

