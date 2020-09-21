using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class AssignMachineModel
    {
        public int? MachineId { get; set; }
        public string MachineName { get; set; }
        public string SharedPath { get; set; }
        public int Floor { get; set; }
        public int? isOccupied { get; set; }

    }
}
