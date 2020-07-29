using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VillageCircle.Models
{
    public class Goal
    {
        public int GoalId { get; set; }
        public int UserId { get; set; }
        public int PointTarget { get; set; }
        public bool IsComplete { get; set; }
    }
}
