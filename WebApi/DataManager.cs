using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Models;

namespace WebApi
{
    public class DataManager
    {
        public static List<CandidateInfoModel> GetData()
        {
            var r = new Random();
            return new List<CandidateInfoModel>()
        {
           new CandidateInfoModel { DataCandidate = new List<int> { r.Next(1, 40) }, CandidateName = "Data1" },
           new CandidateInfoModel { DataCandidate = new List<int> { r.Next(1, 40) }, CandidateName = "Data2" }
        };
        }
    }
}
    