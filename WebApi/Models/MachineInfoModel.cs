using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class MachineInfoModel
    {
        public int? MachineId { get; set; }
        public string MachineIP { get; set; }
        public string MachineName { get; set; }
        public string WorkingDirectoryPath { get; set; }
        public int Floor { get; set; }
        [NotMapped]
        public string FloorName { get; set; }
        public int? isActive { get; set; }
        [NotMapped]
        public string Machinestatus { get; set; }
        public int isOccupied { get; set; }
        [NotMapped]
        public string Occupied { get; set; }
        [NotMapped]
        public bool ExistsPath { get; set; }

    }
}
