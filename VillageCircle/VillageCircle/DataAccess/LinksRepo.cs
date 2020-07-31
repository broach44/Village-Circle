using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VillageCircle.Models;
using Dapper;
using System.Data.SqlClient;

namespace VillageCircle.DataAccess
{
    public class LinksRepo
    {
        string connectionString;
        public LinksRepo(IConfiguration config)
        {
            connectionString = config.GetConnectionString("VillageCircle");
        }

        public IEnumerable<Link> GetAllLinks(int circleId)
        {
            var sql = @"select * from links
                        where CircleId = @CircleId and IsAvailable = 1;";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { CircleId = circleId };
                var result = db.Query<Link>(sql, parameters);
                return result;
            }
        }

        public Link AddLink(Link linkToAdd)
        {
            var sql = @"
                        insert into[Links](LinkTitle, LinkDescription, LinkUrl, IsAvailable, CircleId)
                        output inserted.*
                        values(@LinkTitle, @LinkDescription, @LinkUrl, 1, @CircleId);
                        ";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new
                {
                    LinkTitle = linkToAdd.LinkTitle,
                    LinkDescription = linkToAdd.LinkDescription,
                    LinkUrl = linkToAdd.LinkUrl,
                    CircleId = linkToAdd.CircleId
                };
                var result = db.QueryFirstOrDefault<Link>(sql, parameters);
                return result;
            }
        }

        public Link DeleteLink(int linkId)
        {
            var sql = @"update[Links]
                        set IsAvailable = 0
                        where LinkId = @LinkId;";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { LinkId = linkId };
                var result = db.QueryFirstOrDefault<Link>(sql, parameters);
                return result;
            }
        }
    }
}
