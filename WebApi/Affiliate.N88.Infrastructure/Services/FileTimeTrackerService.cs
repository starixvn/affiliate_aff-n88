using Affiliate.N88.Exceptions;
using System;
using System.IO;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Linq;

namespace Affiliate.N88.Services
{
    public class FileTimeTrackerService : ITimeTrackerService
    {
        private readonly string _filePath;
        private readonly object _locker = new object();

        public FileTimeTrackerService(string filePath)
        {
            _filePath = filePath;
        }

        public async Task<DateTime> GetTimeAsync(string category)
        {
            if (!File.Exists(_filePath))
                throw new FileNotFoundException($"{_filePath}");
            if (!CheckFileIsXmlFormat())
                throw new XmlException($"{_filePath} is not xml format");

            XDocument xmlDoc = null;
            lock (_locker)
            {
                xmlDoc = XDocument.Load(_filePath);
            }
            if (xmlDoc == null)
                throw new NullReferenceException(nameof(xmlDoc));

            var elem = xmlDoc.Root?.Element(category);
            if (elem == null)
                throw new XmlElementNotFoundException($"Not Found {elem}");

            return DateTime.Parse(elem.Value);

        }

        public async Task SaveTimeAsync(string category, DateTime date)
        {
            XDocument xmlDoc;
            if (!File.Exists(_filePath) || !CheckFileIsXmlFormat())
            {
                xmlDoc = new XDocument();
            }
            else
            {
                xmlDoc = XDocument.Load(_filePath);
            }

            if (xmlDoc.Root == null)
            {
                xmlDoc.AddFirst(new XElement("root"));
            }

            var root = xmlDoc.Root;
            var elem = root.Element(category);

            if (elem == null)
            {
                root.Add(new XElement(category, date.ToString()));
            }
            else
            {
                elem.SetValue(date.ToString());
            }

            SaveXml(xmlDoc);
        }

        private void SaveXml(XDocument xmlDoc)
        {
            var directory = Path.GetDirectoryName(_filePath);
            if (!Directory.Exists(directory))
            {
                Directory.CreateDirectory(directory);
            }
            lock (_locker)
            {
                xmlDoc.Save(_filePath);
            }
        }

        private bool CheckFileIsXmlFormat()
        {
            try
            {
                XDocument.Load(_filePath);
            }
            catch (XmlException)
            {
                return false;
            }
            return true;
        }
    }
}
