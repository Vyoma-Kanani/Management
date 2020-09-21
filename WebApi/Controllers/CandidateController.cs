using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using WebApi.HubConfig;
using WebApi.Models;
using WebApi.Services;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CandidateController : ControllerBase
    {
        CandidateDetails objCandidate = new CandidateDetails();
        PracticalsDetails objPractical = new PracticalsDetails();

        private readonly IHubContext<notificationHub> _hub;
        public CandidateController(IHubContext<notificationHub> hub)
        {
            this._hub = hub;
        }

        [HttpPut]
        [Route("PracEdit/{id}")]
        public string PracEdit([FromBody]CandidateInfoModel candidate, int id)
        {
            string data = objPractical.UpdatePracCompletedStatus(id);
            string retMessage = string.Empty;

            try
            {
                _hub
                  .Clients
                  .Group(notificationHub.GROUP_NAME)
                  .SendAsync("taskStarted");

                _hub.Clients.All.SendAsync("transferdata", "Hello");

                retMessage = "Success";
            }
            catch (Exception e)
            {
                retMessage = e.ToString();
            }

            return retMessage;
        }

        [HttpGet]
        [Route("Index")]
        public IEnumerable<CandidateInfoModel> Index()
        {
            try
            {
                _hub
                  .Clients
                  .Group(notificationHub.GROUP_NAME)
                  .SendAsync("taskStarted");

                _hub.Clients.All.SendAsync("transferdata", "Hello");

            }
            catch (Exception e)
            {
               
            }

            return objCandidate.GetAllCandidate();
        }

        CandidateDetails obj = new CandidateDetails();

        [HttpGet]
        [Route("GetCandidateAllDetails/{id}")]
        public IEnumerable<CandidateAllDetailsModel> GetCandidateAllDetails(int id)
        {
            return obj.GetCandidateDetails(id);
        }

        [HttpGet]
        [Route("delete/{id}")]
        public bool delete(int id)
        {
            return objCandidate.deleteCandidate(id);
        }

        [HttpGet]
        [Route("verifyEmail/{email}")]
        public bool verifyEmail(string email)
        {
            return objCandidate.verifyEmail(email);
        }

        [HttpGet]
        [Route("Details")]
        public IEnumerable<CandidateInfoModel> Details([FromQuery] FilterModel filterData)
        {
            return objCandidate.GetCandidateFilteredData(filterData);
        }

        [HttpPost]
        [Route("Detailsfilter")]
        public IEnumerable<CandidateInfoModel> Detailsfilter([FromBody] FilterModel filterData)
        {
            return objCandidate.GetCandidateFilteredData(filterData);
        }

        [HttpGet]
        [Route("DetailsById/{id}")]
        public IEnumerable<CandidateInfoModel> DetailsById(int id)
        {
            return objCandidate.GetCandidateData(id);
        }


        [HttpPost]
        [Route("Create")]
        public int Create([FromBody] CandidateInfoModel candidate)
        {
            return objCandidate.AddCandidate(candidate);

        }

        [HttpPut]
        [Route("Edit/{id}")]
        public int Edit([FromBody]CandidateInfoModel candidate, int id)
        {
            return objCandidate.UpdateCandidate(candidate, id);
        }

        //------------------------------------Evaluation
        evaluation objEval = new evaluation();

        [HttpGet]
        [Route("evaluationPreDetails/{candidateId}")]
        public IEnumerable<EvaluationPreDetailsModel> evaluationPreDetails(int candidateId)
        {
            return objEval.GetPreEvaluationDetails(candidateId);
        }

        [HttpPost]
        [Route("addEvaluationDetails")]
        public string addEvaluationDetails([FromBody] GradeConfigurationModel details)
        {
            return objEval.AddEvaluationDetails(details);
        }

        [HttpGet]
        [Route("GetEvaluationDetails/{candidateId}/{practicalId}")]
        public IEnumerable<GradeConfigurationModel> GetEvaluationDetails(int candidateId, int practicalId)
        {
            return objEval.GetEvaluationDetails(candidateId, practicalId);
        }

        [HttpPut]
        [Route("GradeConfig")]
        public string GradeConfig(GradeConfigModel details)
        {
            return objEval.GradeConfiguration(details);
        }
    }
}