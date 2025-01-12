using GraphQL.Types;
using Simple_TodoList.GraphQL.Types;

namespace Simple_TodoList.GraphQL.InputTypes
{
    public class TaskInputType: InputObjectGraphType
    {
        public TaskInputType()
        {
            Field<StringGraphType>("name");
            Field<BooleanGraphType>("isCompleted");
            Field<DateTimeGraphType>("deadline");
            Field<IntGraphType>("categoryId");
        }
    }
}
