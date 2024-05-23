namespace Simple_TodoList.Services.XMLStorage
{
    public interface IXMLStorage
    {
        public Task<IEnumerable<TRecord>> GetRecords<TRecord>(string collection);

        public Task AddRecord<TRecord>(string collection, TRecord record);

        public Task<TRecord> FindRecord<TRecord>(string collection, string key);

        public Task UpdateRecord<TRecord>(string collection, string key, TRecord record);

        public Task DeleteRecord(string collection, string key);
    }
}
