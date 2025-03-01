export const updateCategoryMutation = `
mutation UpdateCategory($input: UpdateCategoryInputType!){
  categoryMutation{
    updateCategory(input: $input){
      id,
      name
    }
  }    
}`