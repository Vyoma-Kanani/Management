using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class AutoDownloaDetailsModel
    {
        public string FileName { get; set; }
        public string EncryptedFileName { get; set; }
        public string Path { get; set; }
    }
}
