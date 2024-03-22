using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SentinelOne.ApiGateway.Business.Services;

public class DatabaseSettings
{
    public string ConnectionString { get; set; }

    public int SqlCommandTimeout { get; set; }
}
