using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class GradeConfigurationModel
    {
        public int? CandidateId { get; set; }
        [NotMapped]
        public string CandidateName { get; set; }
        public int? PracticalId { get; set; }
        [NotMapped]
        public string PracticalName { get; set; }
        public string Implemented { get; set; }
        public int? CanProceed { get; set; }
        public int? PercentageComplete { get; set; }
        public string NotImplemented { get; set; }
        public string Findings { get; set; }
        public string ReviewerComment { get; set; }
        public string Remark { get; set; }
        public string Grade { get; set; }
        public double? CodeReview { get; set; }
        public double? CanDoAttitude { get; set; }
        public double? Communication { get; set; }

    }
}
