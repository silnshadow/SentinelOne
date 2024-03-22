using SentinelOne.ApiGateway.Business.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SentinelOne.ApiGateway.DataAccess.Repository
{
    public abstract class BaseDbRepository(IDbManager dbManager)
    {
        public IDbConnection Connection { get { return dbManager.Connection; } }
        public IDbTransaction? Transaction { get { return dbManager.Transaction; } }
    }
}
