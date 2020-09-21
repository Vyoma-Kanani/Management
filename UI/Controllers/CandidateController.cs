//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;

//namespace UI.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class CandidateController : ControllerBase
//    {
//        private readonly ICandidateService candidateService;

//        public CandidateController(ICandidateService candidateService)
//        {
//            this.candidateService = candidateService;
//        }

//        [HttpGet]
//        [Route("Index")]
//        public IEnumerable<CandidateInfo> Index()
//        {
//            return this.candidateService.GetAllCandidate();
//        }
//    }
//}