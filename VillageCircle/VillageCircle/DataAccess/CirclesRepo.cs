using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using VillageCircle.Models;
using Dapper;

namespace VillageCircle.DataAccess
{
    public class CirclesRepo
    {
        string connectionString;
        public CirclesRepo(IConfiguration config)
        {
            connectionString = config.GetConnectionString("VillageCircle");
        }
        public IEnumerable<Circle> GetCircles()
        {
            using (var db = new SqlConnection(connectionString))
            {
                return db.Query<Circle>("select * from Circle;");
            }
        }
    }

}
