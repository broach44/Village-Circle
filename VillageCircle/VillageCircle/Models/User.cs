using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VillageCircle.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public string Email { get; set; }
        public string Uid { get; set; }
        public int UserLevelId { get; set; }
        public bool IsParent { get; set; }
        public bool IsChild { get; set; }
    }
}
