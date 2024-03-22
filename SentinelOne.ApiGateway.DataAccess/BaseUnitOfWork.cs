using SentinelOne.ApiGateway.Business.Interfaces;

namespace SentinelOne.ApiGateway.DataAccess
{
    public abstract class BaseUnitOfWork : IBaseUnitOfWork
    {
        private readonly IDbManager _dbManager;

        protected BaseUnitOfWork(IDbManager dbManager) => _dbManager = dbManager;

        public void BeginTransaction() => _dbManager.BeginTransaction();
        public void Commit() => _dbManager.Commit();
        public void Rollback() => _dbManager.Rollback();
    }
}
