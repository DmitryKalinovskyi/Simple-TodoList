using GraphQL;

namespace Simple_TodoList.GraphQL.Errors
{
    public class NotFoundExecutionError: ExecutionError
    {
        public NotFoundExecutionError(string message) : base(message)
        {
            Code = "NOT_FOUND";
        }
    }
}
