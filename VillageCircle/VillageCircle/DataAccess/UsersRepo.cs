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

        public IEnumerable<User> GetChildren(int userId)
        {
            var sql = @"
                        select [user].*
                        from [UserParentConnection]
                        join [user] on [user].userId = [UserParentConnection].childUserId
                        where [UserParentConnection].parentUserId = @UserId;
                      ";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { UserId = userId };
                var result = db.Query<User>(sql, parameters);
                return result;
            }
        }

        public IEnumerable<User> GetCircleMemberUsers(int circleId)
        {
            var circleLeaderIdQuery = "select userId from [circle] where circleid = @CircleId;";

            var sql = @"
                        select [user].*
                        from [CircleMember]
                        join [User] on [user].userId = [CircleMember].userId
                        where CircleId = @CircleId and [User].UserId != @UserId;
                        ";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters1 = new { CircleId = circleId };
                var circleLeaderId = db.QueryFirstOrDefault<int>(circleLeaderIdQuery, parameters1);

                var parameters2 = new { CircleId = circleId, UserId = circleLeaderId };
                var result = db.Query<User>(sql, parameters2);
                return result;
            }
        }
    }
}
