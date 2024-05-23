using Simple_TodoList.Extensions;
using System.Xml;
using System.Xml.Serialization;

namespace Simple_TodoList.Services.XMLStorage
{
    public class XMLStorage : IXMLStorage
    {
        private readonly string _storagePath;

        private const string CollectionProperties = "Properties.xaml";

        public XMLStorage(IConfiguration configuration)
        {
            _storagePath = configuration.GetDefaultXMLStorage();
        }

        private void CreateCollectionIfNotSet(string collectionName)
        {
            string path = Path.Combine(_storagePath, collectionName);
            if (Directory.Exists(path) == false)
            {
                Directory.CreateDirectory(path);
            }
        }

        private async Task<XMLCollectionProperties> GetCollectionProperties(string collectionName)
        {
            string path = Path.Combine(_storagePath, collectionName, CollectionProperties);

            if(File.Exists(path) == false)
            {
                return new XMLCollectionProperties();
            }

            using (StreamReader reader = new StreamReader(path))
            {
                return Deserialize<XMLCollectionProperties>(await reader.ReadToEndAsync());
            }
        }

        private async Task SaveCollectionProperties(string collectionName, XMLCollectionProperties properties) 
        {
            string path = Path.Combine(_storagePath, collectionName, CollectionProperties);

            using (StreamWriter writer = new StreamWriter(path))
            {
                var serialized = Serialize(properties);
                await writer.WriteAsync(serialized);
            }
        }

        private string Serialize<TRecord>(TRecord record)
        {
            using (var stringWriter = new StringWriter())
            {
                var serializer = new XmlSerializer(typeof(TRecord));
                serializer.Serialize(stringWriter, record);
                return stringWriter.ToString();
            }
        }

        private TRecord Deserialize<TRecord>(string xml)
        {
            using (var stringReader = new StringReader(xml))
            {
                var serializer = new XmlSerializer(typeof(TRecord));
                return (TRecord)serializer.Deserialize(stringReader);
            }
        }

        public async Task AddRecord<TRecord>(string collection, TRecord record)
        {
            CreateCollectionIfNotSet(collection);
            var properties = await GetCollectionProperties(collection);
            var index = properties.PrimaryKeyIndex;
            properties.PrimaryKeyIndex = index + 1;
            await SaveCollectionProperties(collection, properties);

            var fileName = $"{index}.xml";
            var filePath = Path.Combine(_storagePath, collection, fileName);

            // set up by own id for that record
            var type = record.GetType();
            System.Reflection.PropertyInfo idProperty = type.GetProperty("Id");
            idProperty.SetValue(record, index, null);

            var serialized = Serialize(record);


            using (var writer = new StreamWriter(filePath))
            {
                await writer.WriteAsync(serialized);
            }
        }

        public async Task DeleteRecord(string collection, string key)
        {
            var filePath = Path.Combine(_storagePath, collection, $"{key}.xml");
            if (File.Exists(filePath))
            {
                File.Delete(filePath);
            }
        }

        public async Task<TRecord> FindRecord<TRecord>(string collection, string key)
        {
            var filePath = Path.Combine(_storagePath, collection, $"{key}.xml");
            if (!File.Exists(filePath))
            {
                return default;
            }

            using (var reader = new StreamReader(filePath))
            {
                var content = await reader.ReadToEndAsync();
                return Deserialize<TRecord>(content);
            }
        }

        public async Task<IEnumerable<TRecord>> GetRecords<TRecord>(string collection)
        {
            var path = Path.Combine(_storagePath, collection);
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
                    records.Add(Deserialize<TRecord>(content));
                }
            }

            return records;
        }

        public async Task UpdateRecord<TRecord>(string collection, string key, TRecord record)
        {
            await DeleteRecord(collection, key);
            var serialized = Serialize(record);
            var filePath = Path.Combine(_storagePath, collection, $"{key}.xml");

            using (var writer = new StreamWriter(filePath))
            {
                await writer.WriteAsync(serialized);
            }
        }
    }
}