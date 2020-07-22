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
    public class PointSystemRepo
    {
        string connectionString;
        public PointSystemRepo(IConfiguration config)
        {
            connectionString = config.GetConnectionString("VillageCircle");
        }

        public int GetTotal(int userId)
        {
            var sql = @"
                        select sum(numberOfPoints)
                        from PointLog
                        join ActivityPoints on PointLog.ActivityPointId = ActivityPoints.ActivityPointId
                        where pointlog.UserId = @UserId;
                      ";
            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { UserId = userId };
                var result = db.QueryFirstOrDefault<int>(sql, parameters);
                return result;
            }
        }

        public IEnumerable<UserPointLog> GetUserLog(int userId)
        {
            var sql = @"
                        select PointLog.PointLogId, PointLog.UserId, PointLog.EarnedDate, PointLog.ActivityPointId, ActivityPoints.NumberOfPoints, ActivityPoints.ActivityName
                        from PointLog
                        join ActivityPoints on PointLog.ActivityPointId = ActivityPoints.ActivityPointId
                        where PointLog.UserId = @UserId
                        order by PointLog.EarnedDate desc;
                      ";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { UserId = userId };
                var result = db.Query<UserPointLog>(sql, parameters);
                return result;
            }
        }
    }
}
