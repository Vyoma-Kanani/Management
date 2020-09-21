using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using WebApi.HubConfig;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private readonly IHubContext<notificationHub> _hub;

        public NotificationController(IHubContext<notificationHub> hub)
        {
            _hub = hub;
        }
        public IActionResult Get()
        {
            var name = _hub.Clients.All.SendAsync("transferchartdata", DataManager.GetData());

            return Ok(new { Message = "Request Complete" });
        }

        //[HttpPost]
        //public string Post([FromBody]Coordinates coordinates)
        //{
        //    string retMessage = string.Empty;

        //    try
        //    {
        //        _hubContext.Clients.All.GetLocation(coordinates.Latitude, coordinates.Longitude);
        //        retMessage = "Success";
        //    }
        //    catch (Exception e)
        //    {
        //        retMessage = e.ToString();
        //    }

        //    return retMessage;
        //}
    }
}