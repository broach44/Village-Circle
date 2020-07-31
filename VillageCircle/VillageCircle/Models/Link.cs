using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VillageCircle.Models
{
    public class Link
    {
        public int LinkId { get; set; }
        public string LinkTitle { get; set; }
        public string LinkDescription { get; set; }
        public string LinkUrl { get; set; }
        public bool IsAvailable { get; set; }
        public int CircleId { get; set; }
    }
}
