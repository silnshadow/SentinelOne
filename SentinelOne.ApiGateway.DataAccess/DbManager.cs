using SentinelOne.ApiGateway.Business.Interfaces;
using Microsoft.Extensions.Options;
using System.Data;
using Microsoft.Data.SqlClient;
using SentinelOne.ApiGateway.Business.Services;

namespace SentinelOne.ApiGateway.DataAccess
{
    public class DbManager : IDbManager, IDisposable
    {
        private readonly string ConnectionString;

        private IDbConnection? DbConnection = null;
        private IDbTransaction? DbTransaction = null;

        public DbManager(IOptions<DatabaseSettings> databaseSettings)
        {
            ConnectionString = databaseSettings.Value.ConnectionString;
        }

        public IDbConnection Connection => DbConnection is null ? new SqlConnection(ConnectionString) : DbConnection;
        public IDbTransaction? Transaction => DbTransaction;

        public void BeginTransaction()
        {
            DbConnection = new SqlConnection(ConnectionString);

            if (DbConnection.State == ConnectionState.Closed)
            {
                DbConnection.Open();
            }

            DbTransaction = DbConnection.BeginTransaction();
        }

        public void Commit()
        {
            try
            {
                DbTransaction?.Commit();
                DbConnection?.Close();
                DbConnection = null;
            }
            catch
            {
                Rollback();
            }
        }

        public void Rollback()
        {
            DbTransaction?.Rollback();
            DbConnection?.Close();
            DbConnection = null;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            DbConnection?.Close();
            DbConnection?.Dispose();
            DbTransaction?.Dispose();
        }

        ~DbManager()
        {
            Dispose(false);
        }
    }
}
