using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VillageCircle.DataAccess;
using VillageCircle.Models;

namespace VillageCircle.Controllers
{
    [Route("api/announcements")]
    [ApiController]
    public class AnnouncementsController : ControllerBase
    {
        AnnouncementsRepo _announcementsRepo;

        public AnnouncementsController(AnnouncementsRepo announcementsRepo)
        {
            _announcementsRepo = announcementsRepo;
        }

        // api/announcements/{circleId}
        [HttpGet("{circleId}")]
        public IActionResult GetAllAnnouncementsByCircleId(int circleId)
        {
            var announcements = _announcementsRepo.GetAllAnnouncements(circleId);
            return Ok(announcements);
        }

        // api/announcements
        [HttpPost]
        public IActionResult CreateNewAnnouncement(Announcement newAnnouncementToAdd)
        {
            var announcement = _announcementsRepo.AddAnnouncement(newAnnouncementToAdd);
            return Created("Create new announcement successfully", announcement);
        }

    }
}