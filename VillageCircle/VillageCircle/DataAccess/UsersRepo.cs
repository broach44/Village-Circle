using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using VillageCircle.Models;

namespace VillageCircle.DataAccess
{
    public class UsersRepo
    {
        string connectionString;
        public UsersRepo(IConfiguration config)
        {
            connectionString = config.GetConnectionString("VillageCircle");
        }
        
        public User GetSingleUser(string uid)
        {
            var sql = @"
                        select *
                        from [USER]
                        where Uid = @Uid;
                      ";
            using (var db = new SqlConnection(connectionString)) 
            {
                var parameters = new { Uid = uid };
                var result = db.QueryFirstOrDefault<User>(sql, parameters);
                return result;
            }
        }
    }
}
