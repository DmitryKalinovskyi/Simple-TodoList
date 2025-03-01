export default interface GraphQLResponse{
    data: any,
    errors? : GraphQLError[]
} 

interface GraphQLError{
    message: string,
    extensions: {
        code: string,
        codes: string[]
        details: string,
    }
}