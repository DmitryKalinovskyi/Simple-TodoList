using GraphQL.Types;

namespace Simple_TodoList.GraphQL.Tasks
{
    public class TaskInputType : InputObjectGraphType
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
