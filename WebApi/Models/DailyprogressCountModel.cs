using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class DailyprogressCountModel
    {
        public int? InProgress { get; set; }
        public int? UnderEvaluation { get; set; }
        public int? NotAssigned { get; set; }
        public int? Completed { get; set; }
    }
}
