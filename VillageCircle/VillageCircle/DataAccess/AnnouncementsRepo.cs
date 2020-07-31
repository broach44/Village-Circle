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
            DateTime dateTime = DateTime.Now;

            var sql = @"
                        insert into[Announcements](CircleId, AnnouncementDateTime, AnnouncementText)
                        output inserted.*
                        values(@CircleId, @AnnouncementDateTime, @AnnouncementText);
                        ";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new
                {
                    CircleId = announcementToAdd.CircleId,
                    AnnouncementDateTime = dateTime,
                    AnnouncementText = announcementToAdd.AnnouncementText
                };
                var result = db.QueryFirstOrDefault<Announcement>(sql, parameters);
                return result;
            }
        }

        public Announcement DeleteAnnouncement(int announcementId)
        {
            var sql = @"DELETE from [Announcements]
                        WHERE AnnouncementId = @AnnouncementId";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { AnnouncementId = announcementId };
                var result = db.QueryFirstOrDefault<Announcement>(sql, parameters);
                return result;
            }
        }
    }
}
