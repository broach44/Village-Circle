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
    public class GatheringHallsRepo
    {
        string connectionString;
        public GatheringHallsRepo(IConfiguration config)
        {
            connectionString = config.GetConnectionString("VillageCircle");
        }
        public IEnumerable<GatheringHall> GetGatheringHalls()
        {
            using (var db = new SqlConnection(connectionString))
            {
                return db.Query<GatheringHall>("select * from GatheringHall;");
            }
        }

        public GatheringHall GetSingleGatheringHall(int gatheringHallId)
        {
            var sql = @"
                        select [GatheringHall].*, [user].firstName + ' ' + [user].lastName as GatheringHallLeader
                        from [GatheringHall]
                        join [User] on [User].UserId = [GatheringHall].UserId
                        where GatheringHallId = @GatheringHallId;
                      ";
            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { GatheringHallId = gatheringHallId };
                return db.QueryFirstOrDefault<GatheringHall>(sql, parameters);
            }
        }


        public IEnumerable<GatheringHall> GetGatheringHallByUserId(int userId)
        {
            var sql = "select * from [GatheringHall] where userId = @UserId;";
            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { UserId = userId };
                return db.Query<GatheringHall>(sql, parameters);
            }
        }

        public bool VerifyMembership(int userId, int gatheringHallId)
        {
            var sql = @"
                        select *
                        from [GatheringHallMember]
                        where UserId = @UserId and GatheringHallId = @GatheringHallId;
                      ";
            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { UserId = userId, GatheringHallId = gatheringHallId };
                var member = db.QueryFirstOrDefault<GatheringHallMember>(sql, parameters);
                if (member == null)
                {
                    return false;
                }
                return true;
            }
        }

        public GatheringHallMember AddMember(GatheringHallMember gatheringHallMemberToAdd)
        {
            var sql = @"
                        insert into [GatheringHallMember](UserId, GatheringHallId)
                        output inserted.*
                        values(@UserId,@GatheringHallId);
                      ";
            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { UserId = gatheringHallMemberToAdd.UserId, GatheringHallId = gatheringHallMemberToAdd.GatheringHallId };
                var result = db.QueryFirstOrDefault<GatheringHallMember>(sql, parameters);
                return result;
            }
        }

        public GatheringHall AddGatheringHall(GatheringHall gatheringHallToAdd)
        {

            var sql1 = @"
                        insert into [MessageBoard](BoardName, BoardDescription)
                        output inserted.*
                        values(@BoardName, @BoardDescription);
                      ";

            var sql2 = @"
                        insert into [GatheringHall](UserId, GatheringHallName, GatheringHallDescription, BoardId)
                        output inserted.*
                        values(@UserId, @GatheringHallName, @GatheringHallDescription, @BoardId)
                        ";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters1 = new { BoardName = gatheringHallToAdd.GatheringHallName, BoardDescription = gatheringHallToAdd.GatheringHallDescription };
                var result1 = db.QueryFirstOrDefault<MessageBoard>(sql1, parameters1);

                var parameters2 = new
                {
                    UserId = gatheringHallToAdd.UserId,
                    GatheringHallName = gatheringHallToAdd.GatheringHallName,
                    GatheringHallDescription = gatheringHallToAdd.GatheringHallDescription,
                    BoardId = result1.MessageBoardId
                };
                var result2 = db.QueryFirstOrDefault<GatheringHall>(sql2, parameters2);

                var newMember = new GatheringHallMember { UserId = gatheringHallToAdd.UserId, GatheringHallId = result2.GatheringHallId };
                AddMember(newMember);
                return result2;
            }
        }



    }
}
