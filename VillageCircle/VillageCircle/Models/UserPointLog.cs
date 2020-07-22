using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VillageCircle.Models
{
    public class UserPointLog
    {
        public int PointLogId { get; set; }
        public int UserId { get; set; }
        public DateTime EarnedDate { get; set; }
        public int ActivityPointId { get; set; }
        public int NumberOfPoints { get; set; }
        public string ActivityName { get; set; }
    }
}
