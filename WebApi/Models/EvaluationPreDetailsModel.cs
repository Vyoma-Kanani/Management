using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class EvaluationPreDetailsModel
    {
        public int? CandidateId { get; set; }
        public int? PracticalId { get; set; }
        public string CandidateName { get; set; }
        public int? CandidateStatus { get; set; }
        public double? CandidateExperience { get; set; }
        public string Technology { get; set; }
        public string PracticalName { get; set; }
        public string PracticalDefination { get; set; }
    }
}
