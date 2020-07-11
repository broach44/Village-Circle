using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VillageCircle.DataAccess;

namespace VillageCircle.Controllers
{
    [Route("api/circles")]
    [ApiController]
    public class CirclesController : ControllerBase
    {
        CirclesRepo _circlesRepository;
        public CirclesController(CirclesRepo circlesRepository)
        {
            _circlesRepository = circlesRepository;
        }
        // api/Circles
        public IActionResult GetAllCircles()
        {
            var circles = _circlesRepository.GetCircles();
            var isEmpty = !circles.Any();
            if (isEmpty)
            {
                return NotFound("No Circles were found.");
            }
            return Ok(circles);
        }
    }
}