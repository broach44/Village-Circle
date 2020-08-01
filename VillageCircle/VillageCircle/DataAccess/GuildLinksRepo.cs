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
    public class GuildLinksRepo
    {
        string connectionString;
        public GuildLinksRepo(IConfiguration config)
        {
            connectionString = config.GetConnectionString("VillageCircle");
        }

        public IEnumerable<GuildLink> GetAllLinks(int guildId)
        {
            var sql = @"select * from GuildLinks
                        where GuildId = @GuildId and IsAvailable = 1;";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { GuildId = guildId };
                var result = db.Query<GuildLink>(sql, parameters);
                return result;
            }
        }

        public GuildLink AddLink(GuildLink linkToAdd)
        {
            var sql = @"
                        insert into[GuildLinks](LinkTitle, LinkDescription, LinkUrl, IsAvailable, GuildId)
                        output inserted.*
                        values(@LinkTitle, @LinkDescription, @LinkUrl, 1, @GuildId);
                        ";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new
                {
                    LinkTitle = linkToAdd.LinkTitle,
                    LinkDescription = linkToAdd.LinkDescription,
                    LinkUrl = linkToAdd.LinkUrl,
                    GuildId = linkToAdd.GuildId
                };
                var result = db.QueryFirstOrDefault<GuildLink>(sql, parameters);
                return result;
            }
        }

        public GuildLink DeleteLink(int linkId)
        {
            var sql = @"update[GuildLinks]
                        set IsAvailable = 0
                        where LinkId = @LinkId;";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { LinkId = linkId };
                var result = db.QueryFirstOrDefault<GuildLink>(sql, parameters);
                return result;
            }
        }
    }
}
