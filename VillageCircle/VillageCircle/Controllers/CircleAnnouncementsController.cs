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
    [Route("api/circleannouncements")]
    [ApiController]
    public class CircleAnnouncementsController : ControllerBase
    {
        CircleAnnouncementsRepo _announcementsRepo;

        public CircleAnnouncementsController(CircleAnnouncementsRepo announcementsRepo)
        {
            _announcementsRepo = announcementsRepo;
        }

        // api/circleannouncements/{circleId}
        [HttpGet("{circleId}")]
        public IActionResult GetAllAnnouncementsByCircleId(int circleId)
        {
            var announcements = _announcementsRepo.GetAllAnnouncements(circleId);
            return Ok(announcements);
        }

        // api/circleannouncements
        [HttpPost]
        public IActionResult CreateNewAnnouncement(CircleAnnouncement newAnnouncementToAdd)
        {
            var announcement = _announcementsRepo.AddAnnouncement(newAnnouncementToAdd);
            return Created("Create new announcement successfully", announcement);
        }

        // api/circleannouncements/{announcementId}
        [HttpDelete("{announcementId}")]
        public IActionResult DeleteAnnouncementById(int announcementId)
        {
            var deletedAnnouncement = _announcementsRepo.DeleteAnnouncement(announcementId);
            return Ok("Announcement has been deleted successfully!");
        }

    }
}