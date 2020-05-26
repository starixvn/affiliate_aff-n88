using Affiliate.N88.Exceptions;
using Affiliate.N88.Services;
using System;
using System.IO;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Linq;
using Xunit;

namespace Affiliate.N88.UnitTests
{
    public class FileTimeTrackerServiceTests
    {
        public const string FILE_NOT_EXIST = "file_not_exist.xml";
        public const string FILE_NOT_CORRECT_FORMAT = "file_not_xml_format.xml";
        public const string FILE_ELEM_NAME_NOT_EXIST = "file_elem_name_not_exist.xml";
        public const string FILE_CORRECT_FORMAT = "file_good_format.xml";
        public const string FILE_WITH_SUBDIRECTORY = "directory/file_good_format.xml";
        public const string ELEM_TEST_PASS_NAME = "pass";
        public const string ELEM_TEST_NOT_PASS_NAME = "notpass";
        private const string ANY_NAME = "random";

        private string GetFilePath(string fileName)
        {
            return Path.Combine(Directory.GetCurrentDirectory(), "testfiles", fileName);
        }

        [Fact]
        public async Task GetTimeAsync_WhenCallFileNotExist_ThrowFileNotFoundException()
        {
            var path = GetFilePath(FILE_NOT_EXIST);
            if (File.Exists(path))
                File.Delete(path);

            var tracker = new FileTimeTrackerService(path);
            await Assert.ThrowsAsync<FileNotFoundException>(() => tracker.GetTimeAsync(ANY_NAME));
        }

        [Fact]
        public async Task GetTimeAsync_WhenCallWithFileNotCorrectXmlFormat_ThrowsXmlFormatException()
        {
            var path = GetFilePath(FILE_NOT_CORRECT_FORMAT);
            var content = FileTimeTrackerServiceHelper.GenerateNotXml();
            var tracker = new FileTimeTrackerService(path);

            WriteToFile(path, content);

            await Assert.ThrowsAsync<XmlException>(() => tracker.GetTimeAsync(ANY_NAME));
        }

        [Fact]
        public async Task GetTimeAsync_WhenCallWithElemNameNotExist_ThrowsXmlElementNotFoundException()
        {
            var path = GetFilePath(FILE_ELEM_NAME_NOT_EXIST);
            var content = FileTimeTrackerServiceHelper.GenerateXmlWithNotHaveElemTestName(ELEM_TEST_NOT_PASS_NAME);
            var tracker = new FileTimeTrackerService(path);

            WriteToFile(path, content);

            await Assert.ThrowsAsync<XmlElementNotFoundException>(() =>
                tracker.GetTimeAsync(ELEM_TEST_PASS_NAME));
        }

        [Fact]
        public async Task GetTimeAsync_WhenCallWithContentNotDateTime_ThrowExcetion()
        {
            var path = GetFilePath(FILE_CORRECT_FORMAT);
            var content = FileTimeTrackerServiceHelper.GenerateXmlHaveContentNotDateTimeFormat(ELEM_TEST_PASS_NAME);
            var tracker = new FileTimeTrackerService(path);

            WriteToFile(path, content);

            await Assert.ThrowsAsync<FormatException>(()
                => tracker.GetTimeAsync(ELEM_TEST_PASS_NAME));
        }

        [Fact]
        public async Task GetTimeAsync_WhenCallWithCorrectXml_ReturnTrue()
        {
            var dateTime = new DateTime(2020, 4, 17);
            var path = GetFilePath(FILE_CORRECT_FORMAT);
            var content = FileTimeTrackerServiceHelper.GeneratePassXmlDoc(ELEM_TEST_PASS_NAME, dateTime);
            var tracker = new FileTimeTrackerService(path);

            WriteToFile(path, content);

            var time = await tracker.GetTimeAsync(ELEM_TEST_PASS_NAME);
            Assert.Equal(dateTime, time);
        }

        [Fact]
        public async Task SaveTimeAsync_WhenCallWithSavedFileNotYetExist_ReturnTrue()
        {
            var path = GetFilePath(FILE_WITH_SUBDIRECTORY);
            var directory = Path.GetDirectoryName(path);
            if (Directory.Exists(directory))
            {
                Directory.Delete(directory, true);
            }

            var saveDate = new DateTime(2020, 4, 17);
            var category = "tests";
            var _trackerService = new FileTimeTrackerService(path);
            await _trackerService.SaveTimeAsync(category, saveDate);

            var loadDate = await _trackerService.GetTimeAsync(category);

            Assert.Equal(saveDate, loadDate);
        }

        [Fact]
        public async Task SaveTimeAsync_WhenCallWithSavedFileExisted_ReturnTrue()
        {
            var category = "tests";
            var savedDate = new DateTime(2020, 4, 17);
            var xml = FileTimeTrackerServiceHelper.GeneratePassXmlDoc(category, DateTime.Now);
            var path = GetFilePath(FILE_CORRECT_FORMAT);
            WriteToFile(path, xml);

            var _trackerService = new FileTimeTrackerService(path);
            await _trackerService.SaveTimeAsync(category, savedDate);

            var loadDate = await _trackerService.GetTimeAsync(category);

            Assert.Equal(savedDate, loadDate);
        }

        private void WriteToFile(string path, string content)
        {
            if (!Directory.Exists(Path.GetDirectoryName(path)))
                Directory.CreateDirectory(Path.GetDirectoryName(path));
            File.WriteAllText(path, content);
        }
    }

    internal static class FileTimeTrackerServiceHelper
    {
        public static string GenerateNotXml() => "test";

        public static string GenerateXmlWithNotHaveElemTestName(string elemName)
        {

            var elem = new XElement(elemName, DateTime.Now);
            var xmlDoc = CreateXml(elem);
            return xmlDoc.ToString();
        }

        public static string GenerateXmlHaveContentNotDateTimeFormat(string elemName)
        {
            var elem = new XElement(elemName, "abc");
            var xmlDoc = CreateXml(elem);
            return xmlDoc.ToString();
        }

        public static string GeneratePassXmlDoc(string elemName, DateTime dateTime)
        {
            var elem = new XElement(elemName, dateTime);
            var xmlDoc = CreateXml(elem);
            return xmlDoc.ToString();
        }

        private static XDocument CreateXml(XElement element)
        {
            var xmlDoc = new XDocument(new XElement("root"));
            xmlDoc.Root.Add(element);
            return xmlDoc;
        }
    }
}
