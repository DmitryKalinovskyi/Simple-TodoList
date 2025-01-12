namespace Simple_TodoList.Services.XMLStorage
{
    public interface IXMLStorage<TKey>
    {
        public Task<IEnumerable<TRecord>> GetRecords<TRecord>(string collection);

        public Task<TRecord> AddRecord<TRecord>(string collection, TRecord record);

        public Task<TRecord> FindRecord<TRecord>(string collection, TKey key);

        public Task UpdateRecord<TRecord>(string collection, TKey key, TRecord record);

        public Task DeleteRecord(string collection, TKey key);
    }
}
