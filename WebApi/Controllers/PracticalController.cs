using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Models;
using WebApi.Services;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PracticalController : ControllerBase
    {
        PracticalsDetails objPractical = new PracticalsDetails();
        Machine objMachine = new Machine();

        private readonly string[] ACCEPTED_FILE_TYPES = new[] { ".doc", ".docx", ".xls", ".xlsx", ".mp4", "webmd" };
        private readonly string[] ACCEPTED_PracFILE_TYPES = new[] { ".doc", ".docx", ".xls", ".xlsx", ".pdf" };

        private readonly IHostingEnvironment host;
        public PracticalController(IHostingEnvironment host)
        {
            //this.context = context;
            this.host = host;
        }

        [HttpGet]
        [Route("Index")]
        public IEnumerable<PracticalAllInfoModel> Index()
        {
            return objPractical.GetAllPractical();
        }

        [HttpGet]
        [Route("PracDetailById/{id}")]
        public IEnumerable<PracticalAllInfoModel> PracDetailById(int id)
        {
            return objPractical.GetPracDetailById(id);
        }

        [HttpGet]
        [Route("DocDetails/{pracId}/{fileType}")]
        public string DocDetails(int pracId, string filetype)
        {
            return objPractical.GetDocDetails(pracId, filetype);
        }

        [HttpGet]
        [Route("assignMachine/{practicalId}/{candidateId}/{machineId}/{userId}")]
        public IEnumerable<SelectedMachineDetailModel> assignMachine(int practicalId, int candidateId, int machineId, int userId)
        {
            string mainPath = null;
            IEnumerable<SelectedMachineDetailModel> SelectedDetails = objMachine.assignMachine(practicalId, candidateId, machineId, userId);

            foreach (var item in SelectedDetails)
            {
                mainPath = Path.Combine(item.DirectoryPath, item.CandidateName);

                if (!Directory.Exists(mainPath))
                {
                    Directory.CreateDirectory(mainPath);
                }
                item.DirectoryPath = mainPath;
            }


            return SelectedDetails;
        }
        
        [HttpGet]
        [Route("deletePrac/{practicalId}")]
        public bool deletePrac(int practicalId)
        {
            return objPractical.deletePractical(practicalId);
        }

        [HttpPost]
        [Route("Upload/{userid}")]
        public string Upload(int userid, [FromForm]PracticalAllInfoModel PracticalAllInfo)
        {
            if (PracticalAllInfo.RefDocument != null || PracticalAllInfo.PracDocument != null)
            {

                string mainPath = Path.Combine(host.WebRootPath, "uploads");
                if (!Directory.Exists(mainPath))
                {
                    Directory.CreateDirectory(mainPath);
                }

                if (PracticalAllInfo.RefDocument != null && PracticalAllInfo.RefDocument.Length > 0)
                {
                    if (!ACCEPTED_FILE_TYPES.Any(s => s == Path.GetExtension(PracticalAllInfo.RefDocument.FileName).ToLower()))
                        return "Invalid file type.";

                    var fileName = PracticalAllInfo.RefDocumentName;
                    var filePath = Path.Combine(mainPath, fileName);

                    using (var fileStream = new FileStream(filePath, FileMode.OpenOrCreate))
                    {
                        PracticalAllInfo.RefDocument.CopyTo(fileStream);
                    }
                }
                if (PracticalAllInfo.PracDocument != null && PracticalAllInfo.PracDocument.Length > 0)
                {
                    if (!ACCEPTED_PracFILE_TYPES.Any(s => s == Path.GetExtension(PracticalAllInfo.PracDocument.FileName).ToLower()))
                        return "Invalid file type.";

                    var pracfileName = PracticalAllInfo.PracDocumentName;
                    var pracfilePath = Path.Combine(mainPath, pracfileName);

                    using (var fileStream = new FileStream(pracfilePath, FileMode.OpenOrCreate))
                    {
                        PracticalAllInfo.PracDocument.CopyTo(fileStream);
                    }

                }

                //PracticalAllInfo.RefDocument = fileName;

            }
            return objPractical.AddPractical(userid, PracticalAllInfo);
        }


        [HttpPost]
        [Route("editPractical/{id}/{userId}")]
        public string editPractical([FromForm]PracticalAllInfoModel PracticalAllInfo, int id, int userId)
        {
            if (PracticalAllInfo.RefDocument != null || PracticalAllInfo.PracDocument != null)
            {

                string mainPath = Path.Combine(host.WebRootPath, "uploads");
                if (!Directory.Exists(mainPath))
                {
                    Directory.CreateDirectory(mainPath);
                }

                if (PracticalAllInfo.RefDocumentName != null && PracticalAllInfo.RefDocument.Length > 0)
                {
                    //if (!ACCEPTED_FILE_TYPES.Any(s => s == Path.GetExtension(PracticalAllInfo.RefDocument.FileName).ToLower()))
                    //    return "Invalid file type.";

                    //var fileName = Guid.NewGuid().ToString() + Path.GetExtension(PracticalAllInfo.RefDocument.FileName);
                    var fileName = PracticalAllInfo.RefDocumentName;
                    var filePath = Path.Combine(mainPath, fileName);

                    using (var fileStream = new FileStream(filePath, FileMode.OpenOrCreate))
                    {
                        PracticalAllInfo.RefDocumentName = fileName;
                        PracticalAllInfo.RefDocument.CopyTo(fileStream);
                    }
                }
                if (PracticalAllInfo.PracDocumentName != null && PracticalAllInfo.PracDocument.Length > 0)
                {
                    //if (!ACCEPTED_PracFILE_TYPES.Any(s => s == Path.GetExtension(PracticalAllInfo.PracDocument.FileName).ToLower()))
                    //    return "Invalid file type.";

                    //var pracfileName = Guid.NewGuid().ToString() + Path.GetExtension(PracticalAllInfo.PracDocument.FileName);
                    var pracfileName = PracticalAllInfo.PracDocumentName;
                    var pracfilePath = Path.Combine(mainPath, pracfileName);

                    using (var fileStream = new FileStream(pracfilePath, FileMode.OpenOrCreate))
                    {
                        //PracticalAllInfo.PracDocumentName = pracfileName;
                        PracticalAllInfo.PracDocument.CopyTo(fileStream);
                    }

                }
            }
            return objPractical.EditPractical(PracticalAllInfo, id, userId);
        }

        [HttpPost]
        [Route("AutoDownloadFile")]
        public string AutoDownloadFile([FromBody]SelectedMachineDetailModel details)
        {
            string mainPath = details.DirectoryPath;
            if (!Directory.Exists(mainPath))
            {
                Directory.CreateDirectory(mainPath);
            }

            var currentDirectory = System.IO.Directory.GetCurrentDirectory();
            currentDirectory = currentDirectory + "\\wwwroot";
           

            if (details.ActualPracticalDocName != null || details.ActualPracticalDocName != "")
            {
                var file = Path.Combine(Path.Combine(currentDirectory, "uploads"), details.PracticalDocName);
                var filedownload = new FileStream(file, FileMode.Open, FileAccess.Read);

                var filePath = Path.Combine(mainPath, details.ActualPracticalDocName);

                using (var fileStream = new FileStream(filePath, FileMode.OpenOrCreate))
                {
                    filedownload.CopyTo(fileStream);
                }
            }
            if (details.ActualRefDocName != null || details.ActualRefDocName != "")
            {
                var file = Path.Combine(Path.Combine(currentDirectory, "uploads"), details.RefDocName);
                var filedownload = new FileStream(file, FileMode.Open, FileAccess.Read);

                var filePath = Path.Combine(mainPath, details.ActualRefDocName);

                using (var fileStream = new FileStream(filePath, FileMode.OpenOrCreate))
                {
                    filedownload.CopyTo(fileStream);
                }
            }

            return "Success";
        }

        [HttpPut]
        [Route("DownloadFile/{filename}")]
        public FileStream DownloadFile(string fileName)
        {
            var currentDirectory = System.IO.Directory.GetCurrentDirectory();
            currentDirectory = currentDirectory + "\\wwwroot";
            var file = Path.Combine(Path.Combine(currentDirectory, "uploads"), fileName);
            var filedownload = new FileStream(file, FileMode.Open, FileAccess.Read);
            return filedownload;
        }

        //public string CreateDirectory(Uploads)
        //{
        //    var uploadFilesPath = Path.Combine(host.WebRootPath, "uploads");

        //    if (!Directory.Exists(uploadFilesPath))
        //        Directory.CreateDirectory(uploadFilesPath);

        //    return path
        //}
    }
}
