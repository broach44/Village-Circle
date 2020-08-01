using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VillageCircle.Models
{
    public class GuildAnnouncement
    {
        public int AnnouncementId { get; set; }
        public int GuildId { get; set; }
        public DateTime AnnouncementDateTime { get; set; }
        public string AnnouncementText { get; set; }
    }
}
