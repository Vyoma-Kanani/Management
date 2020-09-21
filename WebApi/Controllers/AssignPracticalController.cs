using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models;
using WebApi.Services;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssignPracticalController : ControllerBase
    {
        PracticalsDetails obj = new PracticalsDetails();

        [HttpGet]
        [Route("getpracByExp/{canId}/{exp}/{tech}")]
        public IEnumerable<PracticalAllInfoModel> getpracByExp(int canId, decimal exp, string tech)
        {
            return obj.getpracByExp(canId,exp,tech);
        }

        [HttpGet]
        [Route("getActivePracticalStatus")]
        public IEnumerable<ActivePracticalCountModel> getActivePracticalStatus()
        {
            return obj.getActivePracticalStatus();
        }

        [HttpGet]
        [Route("getGradeCount")]
        public IEnumerable<GradeCountModel> getGradeCount()
        {
            return obj.getGradeCount();
        }

        [HttpGet]
        [Route("getOverallPassoutCount")]
        public IEnumerable<OverallPassoutCountModel> getOverallPassoutCount()
        {
            return obj.getOverallPassoutCount();
        }

        [HttpGet]
        [Route("getDailyProgressCount")]
        public IEnumerable<DailyprogressCountModel> getDailyProgressCount()
        {
            return obj.getDailyProgressCount();
        }

        [HttpGet]
        [Route("getTechWisePracticalCount")]
        public IEnumerable<TechWisePracticalCountModel> getTechWisePracticalCount()
        {
            return obj.getTechWisePracticalCount();
        }
    }
}