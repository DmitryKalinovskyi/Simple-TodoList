export const createCategoryMutation = `
mutation CreateCategory($input: CreateCategoryInputType!){
  categoryMutation{
    createCategory(input: $input){
      id,
      name
    }
  }
}`