using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class GradeConfigModel
    {
        public int? PercentCompleted { get; set; }
        public double? CanDoAttitude { get; set; }
        public double? CodeReview { get; set; }
        public double? Communication { get; set; }
    }
}
