using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VillageCircle.Models
{
    public class GuildMember
    {
        public int GuildMemberId { get; set; }
        public int UserId { get; set; }
        public int GuildId { get; set; }
    }
}
