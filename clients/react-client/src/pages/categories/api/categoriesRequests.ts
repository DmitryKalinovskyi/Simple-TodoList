import {gql} from "@apollo/client";

const CATEGORIES_QUERY = gql`
    query Categories{
        categoryQuery{
            categories{
                id,
                name
            }
        }
    }
`

export {CATEGORIES_QUERY}