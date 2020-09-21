using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Global
{
    public class enumFile
    {
        public enum practicalCategory
        { 
            [StringValue("Web")]
            Web = 1,

            [StringValue("Windows")]
            Windows = 2,
          
        }
        public enum fileTypeEnum
        {
            [StringValue("Practical Document")]
            Practical = 1,

            [StringValue("Reference Document")]
            Refecence = 2,

        }

        public enum userRole 
        {
            [StringValue("Admin")]
            Admin = 1,

            [StringValue("HR")]
            HR = 2,

        }

        public enum candidateStatus
        {
            [StringValue("Not Assigned")]
            NotAssign = 0,

            [StringValue("In Progress")]
            InProgress = 1,

            [StringValue("Under Evaluation")]
            UnderEvaluation = 2,

            [StringValue("Completed")]
            Completed = 3,
        }

        public enum Floor
        {
            [StringValue("Ground Floor")]
            Ground = 0,

            [StringValue("First Floor")]
            First = 1,

            [StringValue("Second Floor")]
            Second = 2,

            [StringValue("Third Floor")]
            Third = 3,
        }

        public enum MachineStatus
        {
            [StringValue("Inactive")]
            Inactive = 0,

            [StringValue("Active")]
            Active = 1
        }
        public enum InUseStatus
        {
            [StringValue("Not Occupied")]
            NotOccupied = 0,

            [StringValue("Occupied")]
            Occupied = 1
        }
    }
}
