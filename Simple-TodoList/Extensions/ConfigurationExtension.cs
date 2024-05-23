namespace Simple_TodoList.Extensions
{
    public static class ConfigurationExtension
    {
        public static string GetSQLServerConnectionString(this IConfiguration configuration)
        {
            return configuration.GetConnectionString("SQLServer");
        }

        public static string GetXMLStorage(this IConfiguration configuration, string name)
        {
            return configuration.GetSection("XMLStorages")[name];
        }

        public static string GetDefaultXMLStorage(this IConfiguration configuration)
        {
            return GetXMLStorage(configuration, "DefaultStorage");
        }
    }
}
