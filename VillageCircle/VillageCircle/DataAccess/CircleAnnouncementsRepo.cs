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
    public class CircleAnnouncementsRepo
    {
        string connectionString;
        public CircleAnnouncementsRepo(IConfiguration config)
        {
            connectionString = config.GetConnectionString("VillageCircle");
        }

        public IEnumerable<CircleAnnouncement> GetAllAnnouncements(int circleId)
        {
            var sql = @"select * from [CircleAnnouncements]
                        where CircleId = @CircleId
                        order by AnnouncementDateTime desc;";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { CircleId = circleId };
                var result = db.Query<CircleAnnouncement>(sql, parameters);
                return result;
            }
        }

        public CircleAnnouncement AddAnnouncement(CircleAnnouncement announcementToAdd)
        {
            DateTime dateTime = DateTime.Now;

            var sql = @"
                        insert into[CircleAnnouncements](CircleId, AnnouncementDateTime, AnnouncementText)
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
                var result = db.QueryFirstOrDefault<CircleAnnouncement>(sql, parameters);
                return result;
            }
        }

        public CircleAnnouncement DeleteAnnouncement(int announcementId)
        {
            var sql = @"DELETE from [CircleAnnouncements]
                        WHERE AnnouncementId = @AnnouncementId";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { AnnouncementId = announcementId };
                var result = db.QueryFirstOrDefault<CircleAnnouncement>(sql, parameters);
                return result;
            }
        }
    }
}
