using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class CandidateAllDetailsModel
    {
        public string UserName { get; set; }
        public string CandidateName { get; set; }
        public string Email { get; set; }
        public double? Mobile { get; set; }
        public double? Experience { get; set; }
        public string CandidateTechnology { get; set; }
        public string MachineIP { get; set; }
        public string MachineName { get; set; }
        public string WorkingDirectoryPath { get; set; }
        public int Floor { get; set; }
        [NotMapped]
        public string FloorName { get; set; }
        public string PracticalName { get; set; }
        public byte? Category { get; set; }
        [NotMapped]
        public string CategoryName { get; set; }
        public string Defination { get; set; }
        public string PracticalTechnology { get; set; }
        public string AssignedTime { get; set; }
        public string TimeTaken { get; set; }
    }
}
