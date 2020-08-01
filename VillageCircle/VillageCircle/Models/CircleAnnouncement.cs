using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VillageCircle.Models
{
    public class CircleAnnouncement
    {
        public int AnnouncementId { get; set; }
        public int CircleId { get; set; }
        public DateTime AnnouncementDateTime { get; set; }
        public string AnnouncementText { get; set; }
    }
}
