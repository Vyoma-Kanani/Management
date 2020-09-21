using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class PracticalAllInfoModel
    {
        public int? PracticalId { get; set; }
        public string PracticalName { get; set; }
        public byte? Category { get; set; }
        public string Defination { get; set; }
        public int? VersionNumber { get; set; }
        public string Comment { get; set; }
      
        [NotMapped]
        public IFormFile PracDocument { get; set; }
        [NotMapped]
        public IFormFile RefDocument { get; set; }

        [NotMapped]
        public string PracDocumentName { get; set; }
        [NotMapped]
        public string RefDocumentName { get; set; }

        [NotMapped]
        public string CategoryName { get; set; }

        public string Technology { get; set; }
        public double? ExperienceLb { get; set; }
        public double? ExperienceUb { get; set; }

        public string FileName { get; set; }
        public int FileType { get; set; }
        [NotMapped]
        public string FileTypeName { get; set; }

    }
}
