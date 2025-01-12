using Simple_TodoList.Extensions;

namespace Simple_TodoList.Services.XMLStorage
{
    public class XMLStorage(IConfiguration configuration) : IXMLStorage<int>
    {
        private string StoragePath => configuration.GetDefaultXMLStorage();

        private const string CollectionPropertiesFilename = "Properties.xaml";

        private readonly XMLSerializationService xmlSerializationService = new();

        private void CreateCollectionIfNotSet(string collectionName)
        {
            string collectionPath = Path.Combine(StoragePath, collectionName);

            if (!Directory.Exists(collectionPath))
            {
                Directory.CreateDirectory(collectionPath);
            }
        }

        private async Task<XMLCollectionProperties> GetCollectionProperties(string collectionName)
        {
            string path = Path.Combine(StoragePath, collectionName, CollectionPropertiesFilename);

            if(!File.Exists(path))
            {
                return new XMLCollectionProperties();
            }

            using var reader = new StreamReader(path);

            return xmlSerializationService.Deserialize<XMLCollectionProperties>(await reader.ReadToEndAsync());
        }

        private async Task SaveCollectionProperties(string collectionName, XMLCollectionProperties properties) 
        {
            string path = Path.Combine(StoragePath, collectionName, CollectionPropertiesFilename);

            using var writer = new StreamWriter(path);

            var serialized = xmlSerializationService.Serialize(properties);

            await writer.WriteAsync(serialized);
        }

        public async Task<TRecord> AddRecord<TRecord>(string collection, TRecord record)
        {
            CreateCollectionIfNotSet(collection);
            var properties = await GetCollectionProperties(collection);
            var index = properties.PrimaryKeyIndex;
            properties.PrimaryKeyIndex = index + 1;
            await SaveCollectionProperties(collection, properties);

            var fileName = $"{index}.xml";
            var filePath = Path.Combine(StoragePath, collection, fileName);

            // set up by own id for that record
            var type = record.GetType();
            System.Reflection.PropertyInfo idProperty = type.GetProperty("Id");
            idProperty.SetValue(record, index, null);

            var serialized = xmlSerializationService.Serialize(record);

            using (var writer = new StreamWriter(filePath))
            {
                await writer.WriteAsync(serialized);
            }

            return record;
        }

        public Task DeleteRecord(string collection, int key)
        {
            var filePath = Path.Combine(StoragePath, collection, $"{key}.xml");

            File.Delete(filePath);

            return Task.CompletedTask;
        }

        public async Task<TRecord> FindRecord<TRecord>(string collection, int key)
        {
            var filePath = Path.Combine(StoragePath, collection, $"{key}.xml");
            if (!File.Exists(filePath))
            {
                return default;
            }

            using var reader = new StreamReader(filePath);
            var content = await reader.ReadToEndAsync();

            return xmlSerializationService.Deserialize<TRecord>(content);
        }

        public async Task<IEnumerable<TRecord>> GetRecords<TRecord>(string collection)
        {
            var path = Path.Combine(StoragePath, collection);
            if (!Directory.Exists(path))
            {
                return Enumerable.Empty<TRecord>();
            }

            var records = new List<TRecord>();
            var files = Directory.GetFiles(path, "*.xml");
            foreach (var file in files)
            {
                using (var reader = new StreamReader(file))
                {
                    var content = await reader.ReadToEndAsync();
                    records.Add(xmlSerializationService.Deserialize<TRecord>(content));
                }
            }

            return records;
        }

        public async Task UpdateRecord<TRecord>(string collection, int key, TRecord record)
        {
            // actually is delete + insert, but insert with old id.

            await DeleteRecord(collection, key);

            // set up by own id for that record
            var type = record.GetType();
            System.Reflection.PropertyInfo idProperty = type.GetProperty("Id");
            idProperty.SetValue(record, key, null);
            var serialized = xmlSerializationService.Serialize(record);

            var filePath = Path.Combine(StoragePath, collection, $"{key}.xml");

            using (var writer = new StreamWriter(filePath))
            {
                await writer.WriteAsync(serialized);
            }
        }
    }
}