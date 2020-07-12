using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VillageCircle.Models
{
    public class CircleMember
    {
        public int CircleMemberId { get; set; }
        public int UserId { get; set; }
        public int CircleId { get; set; }
    }
}
