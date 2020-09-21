using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Models
{
    public class CandidateInfoModel
    {
        public List<int> DataCandidate { get; set; }
        public int? CandidateId { get; set; }
        public string CandidateName { get; set; }
        public string Email { get; set; }
        public double? Mobile { get; set; }
        public double? Experience { get; set; }
        public string Technology { get; set; }
        public int PracticalStatus { get; set; }

        [NotMapped]
        public string PracStatusName { get; set; }
        public CandidateInfoModel()
        {
            DataCandidate = new List<int>();
        }
    }
}
