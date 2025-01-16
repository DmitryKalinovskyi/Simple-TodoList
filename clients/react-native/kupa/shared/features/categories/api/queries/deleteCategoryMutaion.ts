export const deleteCategoryMutation = `
mutation DeleteCategory($id: Int){
  categoryMutation{
    deleteCategory(id: $id)
  }
}`