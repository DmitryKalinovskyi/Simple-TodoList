using GraphQL.Types;

namespace Simple_TodoList.GraphQL.Tasks.Input
{
    public class UpdateTaskInputType : InputObjectGraphType
    {
        public UpdateTaskInputType()
        {
            Field<IntGraphType>("id");
            Field<StringGraphType>("name");
            Field<BooleanGraphType>("isCompleted");
            Field<DateTimeOffsetGraphType>("deadline");
            Field<IntGraphType>("categoryId");
        }
    }
}
