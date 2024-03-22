using System.Data;

namespace SentinelOne.ApiGateway.Business.Interfaces
{
    public interface IDbManager
    {
        IDbConnection Connection { get; }
        IDbTransaction? Transaction { get; }
        void BeginTransaction();
        void Commit();
        void Rollback();
    }
}
