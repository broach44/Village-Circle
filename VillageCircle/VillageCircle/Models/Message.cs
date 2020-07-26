using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VillageCircle.Models
{
    public class Message
    {
        public int MessageId { get; set; }
        public int UserId { get; set; }
        public string MessageText { get; set; }
        public int BoardId { get; set; }
        public DateTime PostDateTime { get; set; }
        public string UserName { get; set; }
    }
}
