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

        public Circle GetSingleCircle(int circleId)
        {
            var sql = @"
                        select *
                        from [Circle]
                        where CircleId = @CircleId;
                      ";
            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { CircleId = circleId };
                return db.QueryFirstOrDefault<Circle>(sql, parameters);
            }
        }

        public bool VerifyMembership(int userId, int circleId)
        {
            var sql = @"
                        select *
                        from [CircleMember]
                        where UserId = @UserId and CircleId = @CircleId;
                      ";
            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { UserId = userId, CircleId = circleId };
                var member = db.QueryFirstOrDefault<CircleMember>(sql, parameters);
                if (member == null)
                {
                    return false;
                }
                return true;
            }
        }

        public CircleMember AddMember(CircleMember circleMemberToAdd)
        {
            var sql = @"
                        insert into [CircleMember](UserId, CircleId)
                        output inserted.*
                        values(@UserId,@CircleId);
                      ";
            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { UserId = circleMemberToAdd.UserId, CircleId = circleMemberToAdd.CircleId };
                var result = db.QueryFirstOrDefault<CircleMember>(sql, parameters);
                return result;
            }
        }
    }

}
