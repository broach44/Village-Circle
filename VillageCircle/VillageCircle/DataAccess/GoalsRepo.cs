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
    public class GoalsRepo
    {
        string connectionString;
        public GoalsRepo(IConfiguration config)
        {
            connectionString = config.GetConnectionString("VillageCircle");
        }

        public IEnumerable<Goal> GetGoals(int userId)
        {
            var sql = @"
                        select *
                        from [Goals]
                        where userId = @UserId;
                        ";
            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { UserId = userId };
                var result = db.Query<Goal>(sql, parameters);
                return result;
            }
        }

        public Goal AddNewGoal(Goal goalToAdd)
        {
            var sql = @"
                        insert into [Goals](UserId, PointTarget, IsComplete)
                        output inserted.*
                        values(@UserId, @PointTarget, 0);
                      ";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { UserId = goalToAdd.UserId, PointTarget = goalToAdd.PointTarget };
                var result = db.QueryFirstOrDefault<Goal>(sql, parameters);
                return result;
            }
        }
    }
}
