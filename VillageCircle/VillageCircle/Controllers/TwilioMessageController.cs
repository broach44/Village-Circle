using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using VillageCircle.Models;

namespace VillageCircle.Controllers
{
    public class TwilioMessageController : Controller
    {
        private readonly TwilioAccountDetails _twilioAccountDetails;
        // I’ve injected twilioAccountDetails into the constructor

        public TwilioMessageController(IOptions<TwilioAccountDetails> twilioAccountDetails)
        {
            // We want to know if twilioAccountDetails is null so we throw an exception if it is           
            _twilioAccountDetails = twilioAccountDetails.Value ?? throw new ArgumentException(nameof(twilioAccountDetails));
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Content($"My Account Sid is {_twilioAccountDetails.AccountSid}");
        }
    }
}