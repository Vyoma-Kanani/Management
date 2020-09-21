using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Models;

namespace WebApi.HubConfig
{
    public class notificationHub : Hub
    {
        public const string GROUP_NAME = "progress";
    }
}
