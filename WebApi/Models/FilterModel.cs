using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class FilterModel
    {
        public string CandidateName { get; set; }
        public string Technology { get; set; }
        public string PracticalStatus { get; set; }
        public double? Mobile { get; set; }
        public string Email { get; set; }

    }
}
