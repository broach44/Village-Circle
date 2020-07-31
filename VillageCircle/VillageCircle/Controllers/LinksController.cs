using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VillageCircle.DataAccess;

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

    }
}