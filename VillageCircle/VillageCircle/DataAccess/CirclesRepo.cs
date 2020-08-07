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
                        select [Circle].*, [user].firstName + ' ' + [user].lastName as CircleLeader, [user].email as CircleLeaderEmail
                        from [Circle]
                        join [User] on [User].UserId = [Circle].UserId
                        where CircleId = @CircleId;
                      ";
            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { CircleId = circleId };
                return db.QueryFirstOrDefault<Circle>(sql, parameters);
            }
        }

        public IEnumerable<Circle> GetCirclesByUserId(int userId)
        {
            var sql = "select * from [CIRCLE] where userId = @UserId;";
            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { UserId = userId };
                return db.Query<Circle>(sql, parameters);
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

        public Circle AddCircle(Circle circleToAdd)
        {

            var sql1 = @"
                        insert into [MessageBoard](BoardName, BoardDescription)
                        output inserted.*
                        values(@BoardName, @BoardDescription);
                      ";

            var sql2 = @"
                        insert into [Circle](UserId, CircleName, CircleDescription, BoardId)
                        output inserted.*
                        values(@UserId, @CircleName, @CircleDescription, @BoardId)
                        ";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters1 = new { BoardName = circleToAdd.CircleName, BoardDescription = circleToAdd.CircleDescription };
                var result1 = db.QueryFirstOrDefault<MessageBoard>(sql1, parameters1);

                var parameters2 = new
                {
                    UserId = circleToAdd.UserId,
                    CircleName = circleToAdd.CircleName,
                    CircleDescription = circleToAdd.CircleDescription,
                    BoardId = result1.MessageBoardId
                };
                var result2 = db.QueryFirstOrDefault<Circle>(sql2, parameters2);

                var newMember = new CircleMember { UserId = circleToAdd.UserId, CircleId = result2.CircleId };
                AddMember(newMember);
                return result2;
            }
        }
    }

}
