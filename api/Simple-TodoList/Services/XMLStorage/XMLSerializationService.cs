using System.Xml.Serialization;

namespace Simple_TodoList.Services.XMLStorage
{
    public class XMLSerializationService
    {
        public string Serialize<TRecord>(TRecord record)
        {
            using var stringWriter = new StringWriter();

            var serializer = new XmlSerializer(typeof(TRecord));
            serializer.Serialize(stringWriter, record);
            return stringWriter.ToString();
        }

        public TRecord Deserialize<TRecord>(string xml)
        {
            using var stringReader = new StringReader(xml);

            var serializer = new XmlSerializer(typeof(TRecord));
            var deserialized = serializer.Deserialize(stringReader)
                ?? throw new InvalidOperationException("Failed to deserialize object.");

            return (TRecord)deserialized;
        }
    }
}
