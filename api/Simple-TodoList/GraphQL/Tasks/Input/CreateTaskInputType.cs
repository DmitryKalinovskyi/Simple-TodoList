using GraphQL.Types;

namespace Simple_TodoList.GraphQL.Tasks.Input
{
    public class CreateTaskInputType : InputObjectGraphType
    {
        public CreateTaskInputType()
        {
            Field<StringGraphType>("name");
            Field<BooleanGraphType>("isCompleted");
            Field<DateTimeOffsetGraphType>("deadline");
            Field<IntGraphType>("categoryId");
        }
    }
}
