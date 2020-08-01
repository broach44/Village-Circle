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
    [Route("api/circleLinks")]
    [ApiController]
    public class CircleLinksController : ControllerBase
    {
        CircleLinksRepo _linksRepository;
        public CircleLinksController(CircleLinksRepo linkRepository)
        {
            _linksRepository = linkRepository;
        }

        // api/circleLinks/{circleId}
        [HttpGet("{circleId}")]
        public IActionResult GetAllLinksByCircleId(int circleId)
        {
            var links = _linksRepository.GetAllLinks(circleId);
            return Ok(links);
        }

        // api/circleLinks
        [HttpPost]
        public IActionResult CreateNewLink(CircleLink newLinkToAdd)
        {

            var link = _linksRepository.AddLink(newLinkToAdd);
            return Created("Created new link succesffully", link);
        }

        // api/circleLinks/{linkId}
        [HttpDelete("{linkId}")]
        public IActionResult DeleteLinkById(int linkId)
        {
            var deletedAnnouncement = _linksRepository.DeleteLink(linkId);
            return Ok("Link has been deleted successfully!");
        }

    }
}