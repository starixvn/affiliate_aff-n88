namespace Affiliate.N88.Jobs.Configurations
{
    public class RedisSetting
    {
        public string Server { get; set; }

        public int Port { get; set; }

        public string Pass { get; set; }

        public int Database { get; set; }

        public string AppName { get; set; }

        public string KeepAlive { get; set; }

        public string ProtectionDataKey { get; set; }

    }
}
