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
            var sql1 = @"
                        select * from [PointLog] where UserId = @UserId;
                        ";

            var sql = @"
                        select sum(numberOfPoints)
                        from PointLog
                        join ActivityPoints on PointLog.ActivityPointId = ActivityPoints.ActivityPointId
                        where pointlog.UserId = @UserId;
                      ";
            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { UserId = userId };
                var hasLog = db.QueryFirstOrDefault<PointEntry>(sql1, parameters);
                if (hasLog != null)
                {
                    var result = db.QueryFirstOrDefault<int>(sql, parameters);
                    return result;
                }
                return 0;
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

        public PointEntry AddPoints(PointEntry pointEntryToAdd)
        {
            DateTime dateTime = DateTime.Now;
            var sql = @"
                           insert into [PointLog](UserId, EarnedDate, ActivityPointId)
                           output inserted.*
                           values(@UserId, @EarnedDate, @ActivityPointId);
                      ";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new
                {
                    UserId = pointEntryToAdd.UserId,
                    EarnedDate = dateTime,
                    ActivityPointId = pointEntryToAdd.ActivityPointId,
                };
                var result = db.QueryFirstOrDefault<PointEntry>(sql, parameters);
                return result;
            }
        }

        public IEnumerable<PointActivity> GetActivityPointOptions()
        {
            var sql = @"select * from [ActivityPoints] where ActivityPointId != 1;";

            using (var db = new SqlConnection(connectionString))
            {
                var result = db.Query<PointActivity>(sql);
                return result;
            }
        }
    }
}
