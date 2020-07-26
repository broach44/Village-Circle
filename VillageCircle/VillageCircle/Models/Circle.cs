using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VillageCircle.Models
{
    public class Circle
    {
        public int CircleId { get; set; }
        public int UserId { get; set; }
        public string CircleName { get; set; }
        public string CircleDescription { get; set; }
        public int BoardId { get; set; }
        public string CircleLeader { get; set; }

    }
}
