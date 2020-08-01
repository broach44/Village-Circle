using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VillageCircle.Models
{
    public class Guild
    {
        public int GuildId { get; set; }
        public int UserId { get; set; }
        public string GuildName { get; set; }
        public string GuildDescription { get; set; }
        public int BoardId { get; set; }
    }
}
