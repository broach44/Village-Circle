using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VillageCircle.Models;
using Dapper;
using System.Data.SqlClient;

namespace VillageCircle.DataAccess
{
    public class LinksRepo
    {
        string connectionString;
        public LinksRepo(IConfiguration config)
        {
            connectionString = config.GetConnectionString("VillageCircle");
        }

        public IEnumerable<Link> GetAllLinks(int circleId)
        {
            var sql = @"select * from links
                        where CircleId = @CircleId and IsAvailable = 1;";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { CircleId = circleId };
                var result = db.Query<Link>(sql, parameters);
                return result;
            }
        }
    }
}
