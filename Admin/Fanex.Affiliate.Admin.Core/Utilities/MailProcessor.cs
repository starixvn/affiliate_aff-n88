namespace Fanex.Affiliate.Admin.Core.Utilities
{
    using System.IO;
    using Fanex.MailDeliver.MailClient.API;
    using MailDeliver.Model;
    using RazorEngine;
    using RazorEngine.Templating;

    public class MailProcessor : IMailProcessor
    {
        public string BuildTemplateContent(string path, string pathBackup, object model)
        {
            try
            {
                var templateContent = File.ReadAllText(path);
                return Engine.Razor.RunCompile(templateContent, path, model: model);
            }
            catch
            {
                var templateContentBackup = File.ReadAllText(pathBackup);
                return Engine.Razor.RunCompile(templateContentBackup, pathBackup, model: model);
            }
        }

        public void Send(string content, string mailTo, string subject, string mailBcc = "", string mailCc = "", int appMailId = 0)
        {
            var mailConfig = new MailConfig { AppID = appMailId };
            var mailItem = new MailRecord
            {
                MailTo = mailTo,
                Subject = SiteFriendlyNameHelper.ReplaceB2C(subject),
                Body = SiteFriendlyNameHelper.ReplaceB2C(content),
                MailBcc = mailBcc,
                MailCc = mailCc,
                Config = mailConfig
            };

            using (var client = new MailDeliver())
            {
                client.SendMail(mailItem);
            }
        }
    }
}