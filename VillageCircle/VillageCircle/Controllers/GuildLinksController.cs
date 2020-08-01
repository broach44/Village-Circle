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
    [Route("api/guildLinks")]
    [ApiController]
    public class GuildLinksController : ControllerBase
    {
        GuildLinksRepo _linksRepository;
        public GuildLinksController(GuildLinksRepo linkRepository)
        {
            _linksRepository = linkRepository;
        }

        // api/guildLinks/{guildId}
        [HttpGet("{guildId}")]
        public IActionResult GetAllLinksByCircleId(int guildId)
        {
            var links = _linksRepository.GetAllLinks(guildId);
            return Ok(links);
        }

        // api/guildLinks
        [HttpPost]
        public IActionResult CreateNewLink(GuildLink newLinkToAdd)
        {

            var link = _linksRepository.AddLink(newLinkToAdd);
            return Created("Created new link succesffully", link);
        }

        // api/guildLinks/{linkId}
        [HttpDelete("{linkId}")]
        public IActionResult DeleteLinkById(int linkId)
        {
            var deletedAnnouncement = _linksRepository.DeleteLink(linkId);
            return Ok("Link has been deleted successfully!");
        }
    }
}