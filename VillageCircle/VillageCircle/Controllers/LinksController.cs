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
    [Route("api/links")]
    [ApiController]
    public class LinksController : ControllerBase
    {
        LinksRepo _linksRepository;
        public LinksController(LinksRepo linkRepository)
        {
            _linksRepository = linkRepository;
        }

        // api/links/{circleId}
        [HttpGet("{circleId}")]
        public IActionResult GetAllLinksByCircleId(int circleId)
        {
            var links = _linksRepository.GetAllLinks(circleId);
            return Ok(links);
        }

        // api/links
        [HttpPost]
        public IActionResult CreateNewLink(Link newLinkToAdd)
        {

            var link = _linksRepository.AddLink(newLinkToAdd);
            return Created("Created new link succesffully", link);
        }

        // api/announcements/{linkId}
        [HttpDelete("{linkId}")]
        public IActionResult DeleteLinkById(int linkId)
        {
            var deletedAnnouncement = _linksRepository.DeleteLink(linkId);
            return Ok("Link has been deleted successfully!");
        }

    }
}