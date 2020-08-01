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
    public class GuildsRepo
    {
        string connectionString;
        public GuildsRepo(IConfiguration config)
        {
            connectionString = config.GetConnectionString("VillageCircle");
        }
        public IEnumerable<Guild> GetGuilds()
        {
            using (var db = new SqlConnection(connectionString))
            {
                return db.Query<Guild>("select * from Guild;");
            }
        }

        public Guild GetSingleGuild(int guildId)
        {
            var sql = @"
                        select [Guild].*, [user].firstName + ' ' + [user].lastName as GuildLeader
                        from [Guild]
                        join [User] on [User].UserId = [Guild].UserId
                        where GuildId = @GuildId;
                      ";
            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { GuildId = guildId };
                return db.QueryFirstOrDefault<Guild>(sql, parameters);
            }
        }
        public IEnumerable<Guild> GetGuildsByUserId(int userId)
        {
            var sql = "select * from [Guild] where userId = @UserId;";
            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { UserId = userId };
                return db.Query<Guild>(sql, parameters);
            }
        }
        public bool VerifyMembership(int userId, int guildId)
        {
            var sql = @"
                        select *
                        from [GuildMember]
                        where UserId = @UserId and GuildId = @GuildId;
                      ";
            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { UserId = userId, GuildId = guildId };
                var member = db.QueryFirstOrDefault<GuildMember>(sql, parameters);
                if (member == null)
                {
                    return false;
                }
                return true;
            }
        }

        public GuildMember AddMember(GuildMember guildMemberToAdd)
        {
            var sql = @"
                        insert into [GuildMember](UserId, GuildId)
                        output inserted.*
                        values(@UserId,@GuildId);
                      ";
            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { UserId = guildMemberToAdd.UserId, GuildId = guildMemberToAdd.GuildId };
                var result = db.QueryFirstOrDefault<GuildMember>(sql, parameters);
                return result;
            }
        }


        public Guild AddGuild(Guild guildToAdd)
        {

            var sql1 = @"
                        insert into [MessageBoard](BoardName, BoardDescription)
                        output inserted.*
                        values(@BoardName, @BoardDescription);
                      ";

            var sql2 = @"
                        insert into [Guild](UserId, GuildName, GuildDescription, BoardId)
                        output inserted.*
                        values(@UserId, @GuildName, @GuildDescription, @BoardId)
                        ";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters1 = new { BoardName = guildToAdd.GuildName, BoardDescription = guildToAdd.GuildDescription };
                var result1 = db.QueryFirstOrDefault<MessageBoard>(sql1, parameters1);

                var parameters2 = new
                {
                    UserId = guildToAdd.UserId,
                    GuildName = guildToAdd.GuildName,
                    GuildDescription = guildToAdd.GuildDescription,
                    BoardId = result1.MessageBoardId
                };
                var result2 = db.QueryFirstOrDefault<Guild>(sql2, parameters2);

                var newMember = new GuildMember { UserId = guildToAdd.UserId, GuildId = result2.GuildId };
                AddMember(newMember);
                return result2;
            }

        }
    }
}
