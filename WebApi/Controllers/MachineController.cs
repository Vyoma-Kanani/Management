using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models;
using WebApi.HubConfig;
using WebApi.Services;
using System.IO;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MachineController : ControllerBase
    {
        Machine objMachine = new Machine();

        [HttpGet]
        [Route("MachineDetails")]
        public IEnumerable<MachineInfoModel> MachineDetails()
        {
            return objMachine.GetAllMachines();
        }

        [HttpGet]
        [Route("MachineDetailsById/{id}")]
        public IEnumerable<MachineInfoModel> MachineDetailsById(int id)
        {
            return objMachine.GetMachineById(id);
        }

        [HttpGet]
        [Route("verifyIp/{currentIp}")]
        public bool verifyIp(string currentIp)
        {
            return objMachine.verifyIp(currentIp);
        }

        [HttpPost]
        [Route("AddMachine")]
        public int AddMachine([FromForm] MachineInfoModel machine)
        {
            return objMachine.AddMachineDetails(machine);
        }


        [HttpPut]
        [Route("editMachine/{id}")]
        public bool editMachine([FromForm] MachineInfoModel machine, int id)
        {
            return objMachine.EditPracticalDetails(machine, id);
        }

        [HttpGet]
        [Route("deleteMachine/{machineId}")]
        public bool deleteMachine(int machineId)
        {
            return objMachine.deleteMachineDetails(machineId);
        }

        [HttpGet]
        [Route("getInactiveMachine")]
        public IEnumerable<MachineInfoModel> getInactiveMachine()
        {
            return objMachine.GetActiveMachines();  
        }
    }
}