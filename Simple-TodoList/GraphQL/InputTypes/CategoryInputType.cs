﻿using GraphQL.Types;

namespace Simple_TodoList.GraphQL.InputTypes
{
    public class CategoryInputType: InputObjectGraphType
    {
        public CategoryInputType() 
        {
            Field<IntGraphType>("id");
            Field<StringGraphType>("name");
        }
    }
}
