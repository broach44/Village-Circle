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
    public class GuildAnnouncementsRepo
    {
        string connectionString;
        public GuildAnnouncementsRepo(IConfiguration config)
        {
            connectionString = config.GetConnectionString("VillageCircle");
        }

        public IEnumerable<GuildAnnouncement> GetAllAnnouncements(int guildId)
        {
            var sql = @"select * from [GuildAnnouncements]
                        where GuildId = @GuildId
                        order by AnnouncementDateTime desc;";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { GuildId = guildId };
                var result = db.Query<GuildAnnouncement>(sql, parameters);
                return result;
            }
        }

        public GuildAnnouncement AddAnnouncement(GuildAnnouncement announcementToAdd)
        {
            DateTime dateTime = DateTime.Now;

            var sql = @"
                        insert into[GuildAnnouncements](GuildId, AnnouncementDateTime, AnnouncementText)
                        output inserted.*
                        values(@GuildId, @AnnouncementDateTime, @AnnouncementText);
                        ";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new
                {
                    GuildId = announcementToAdd.GuildId,
                    AnnouncementDateTime = dateTime,
                    AnnouncementText = announcementToAdd.AnnouncementText
                };
                var result = db.QueryFirstOrDefault<GuildAnnouncement>(sql, parameters);
                return result;
            }
        }

        public GuildAnnouncement DeleteAnnouncement(int announcementId)
        {
            var sql = @"DELETE from [GuildAnnouncements]
                        WHERE AnnouncementId = @AnnouncementId";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { AnnouncementId = announcementId };
                var result = db.QueryFirstOrDefault<GuildAnnouncement>(sql, parameters);
                return result;
            }
        }
    }
}
