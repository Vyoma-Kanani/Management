using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class SelectedMachineDetailModel
    {
        public string PracticalName { get; set; }
        public string CandidateName { get; set; }
        public string PracticalDocName { get; set; }
        [NotMapped]
        public string ActualPracticalDocName { get; set; }
        public string RefDocName { get; set; }
        [NotMapped]
        public string ActualRefDocName { get; set; }
        public string DirectoryPath { get; set; }
    }
}
