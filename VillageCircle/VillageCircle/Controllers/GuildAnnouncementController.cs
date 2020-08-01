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
    [Route("api/guildannouncements")]
    [ApiController]
    public class GuildAnnouncementController : ControllerBase
    {
        GuildAnnouncementsRepo _announcementsRepo;

        public GuildAnnouncementController(GuildAnnouncementsRepo announcementRepo)
        {
            _announcementsRepo = announcementRepo;
        }

        // api/guildannouncements/{guildId}
        [HttpGet("{guildId}")]
        public IActionResult GetAllAnnouncementsByCircleId(int guildId)
        {
            var announcements = _announcementsRepo.GetAllAnnouncements(guildId);
            return Ok(announcements);
        }

        // api/guildannouncements
        [HttpPost]
        public IActionResult CreateNewAnnouncement(GuildAnnouncement newAnnouncementToAdd)
        {
            var announcement = _announcementsRepo.AddAnnouncement(newAnnouncementToAdd);
            return Created("Create new announcement successfully", announcement);
        }

        // api/guildannouncements/{announcementId}
        [HttpDelete("{announcementId}")]
        public IActionResult DeleteAnnouncementById(int announcementId)
        {
            var deletedAnnouncement = _announcementsRepo.DeleteAnnouncement(announcementId);
            return Ok("Announcement has been deleted successfully!");
        }

    }
}