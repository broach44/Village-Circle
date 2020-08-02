using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VillageCircle.Models
{
    public class GatheringHall
    {
        public int GatheringHallId { get; set; }
        public int UserId { get; set; }
        public string GatheringHallName { get; set; }
        public string GatheringHallDescription { get; set; }
        public int BoardId { get; set; }
        public string GatheringHallLeader { get; set; }
    }
}
