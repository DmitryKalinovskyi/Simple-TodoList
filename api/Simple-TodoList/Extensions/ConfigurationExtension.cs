namespace Simple_TodoList.Extensions
{
    public static class ConfigurationExtension
    {
        public static string GetSQLServerConnectionString(this IConfiguration configuration)
        {
            return configuration.GetConnectionString("SQLServer") 
                ?? throw new InvalidOperationException("Missing sqlServer connection string in configuration.");
        }

        public static string GetXMLStorage(this IConfiguration configuration, string name)
        {
            return configuration.GetConnectionString(name) 
                ?? throw new InvalidOperationException("Missing xmlStorage connection string in configuration.");
        }

        public static string GetDefaultXMLStorage(this IConfiguration configuration)
        {
            return GetXMLStorage(configuration, "DefaultStorage");
        }
    }
}
