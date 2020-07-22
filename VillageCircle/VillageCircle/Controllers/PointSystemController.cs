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
    [Route("api/pointsystem")]
    [ApiController]
    public class PointSystemController : ControllerBase
    {
        PointSystemRepo _pointSystemRepository;
        public PointSystemController(PointSystemRepo pointSystemRepository)
        {
            _pointSystemRepository = pointSystemRepository;
        }

        // api/pointsystem/{userId}
        [HttpGet("{userId}")]
        public IActionResult GetPointTotal(int userId)
        {
            var pointTotal = _pointSystemRepository.GetTotal(userId);
            return Ok(pointTotal);
        }

        // api/pointsystem/log/{userId}
        [HttpGet("log/{userId}")]
        public IActionResult GetUserPointLog(int userId)
        {
            var userLog = _pointSystemRepository.GetUserLog(userId);
            return Ok(userLog);
        }

        // api/pointSystem
        [HttpPost]
        public IActionResult AddPointsToLog(PointEntry pointEntryToAdd)
        {
            var pointEntry = _pointSystemRepository.AddPoints(pointEntryToAdd);
            return Created("Successfully created entry for points", pointEntry);
        }
    }
}