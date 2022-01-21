using System;
using Fanex.Affiliate.User.Core.DTO;
using Fanex.Data;
using Fanex.Data.SqlServer;

namespace Fanex.Affiliate.User.Core.Repository
{
    public class ObjectDBBuilder : IObjectDBBuilder, IDisposable
    {
        public IObjectDb DB { get; private set; }

        public ObjectDBBuilder() { }

        public ObjectDBBuilder(string spKey, string dbMode = DBMode.Main)
        {
            DB = new SqlObjectDb(spKey + dbMode);
        }

        public IObjectDb Build(string spKey, string dbMode = DBMode.Main)
            => DB = new SqlObjectDb(spKey + dbMode);

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing && DB != null)
            {
                DB.Dispose();
            }
        }
    }
}