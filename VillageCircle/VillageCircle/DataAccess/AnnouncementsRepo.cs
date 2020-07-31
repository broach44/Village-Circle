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
    public class AnnouncementsRepo
    {
        string connectionString;
        public AnnouncementsRepo(IConfiguration config)
        {
            connectionString = config.GetConnectionString("VillageCircle");
        }

        public IEnumerable<Announcement> GetAllAnnouncements(int circleId)
        {
            var sql = @"select * from [Announcements]
                        where CircleId = @CircleId
                        order by AnnouncementDateTime desc;";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { CircleId = circleId };
                var result = db.Query<Announcement>(sql, parameters);
                return result;
            }
        }

        public Announcement AddAnnouncement(Announcement announcementToAdd)
        {
            return null;
        }
    }
}
