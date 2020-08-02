using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VillageCircle.Models
{
    public class GatheringHallMember
    {
        public int GatheringHallMemberId { get; set; }
        public int UserId { get; set; }
        public int GatheringHallId { get; set; }
    }
}
