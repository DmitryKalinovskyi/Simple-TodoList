import { GraphQLError } from "graphql";

export default interface GraphQLResponse{
    data: any,
    errors?: GraphQLError[]
}