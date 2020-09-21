using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Models
{
    public class UserDetailsModel
    {
        public int? UserId { get; set; }
        public string LoginName { get; set; }
        public string Password { get; set; }
        public int Role { get; set; }
        public string UserName { get; set; }
       
        [NotMapped]
        public string token { get; set; }

    }
}
