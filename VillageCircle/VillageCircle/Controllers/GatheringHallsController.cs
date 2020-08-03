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
    [Route("api/gatheringhalls")]
    [ApiController]
    public class GatheringHallsController : ControllerBase
    {
        GatheringHallsRepo _gatheringHallsRepository;
        public GatheringHallsController(GatheringHallsRepo gatheringHallsRepository)
        {
            _gatheringHallsRepository = gatheringHallsRepository;
        }


        // api/gatheringhalls
        [HttpGet]
        public IActionResult GetAllGatheringHalls()
        {
            var gatheringHalls = _gatheringHallsRepository.GetGatheringHalls();
            var isEmpty = !gatheringHalls.Any();
            if (isEmpty)
            {
                return NotFound("No Gathering Halls were found.");
            }
            return Ok(gatheringHalls);
        }

        // api/gatheringhalls/{gatheringHallId}
        [HttpGet("{gatheringHallId}")]
        public IActionResult GetGatheringHallByGatheringHallId(int gatheringHallId)
        {
            var gatheringHall = _gatheringHallsRepository.GetSingleGatheringHall(gatheringHallId);
            if (gatheringHall != null)
            {
                return Ok(gatheringHall);
            }
            return NotFound("This gathering hall does not exist");
        }

        // api/gatheringhalls/owner/{userId}
        [HttpGet("owner/{userId}")]
        public IActionResult GetGatheringHallsByOwnerUserId(int userId)
        {
            var gatheringHalls = _gatheringHallsRepository.GetGatheringHallByUserId(userId);
            return Ok(gatheringHalls);
        }

        // api/gatheringhalls/memberVerify/{userId}/{gatheringHallId}
        [HttpGet("memberVerify/{userId}/{gatheringHallId}")]
        public IActionResult VerifyUserCircleMembership(int userId, int gatheringHallId)
        {
            var isMember = _gatheringHallsRepository.VerifyMembership(userId, gatheringHallId);
            return Ok(isMember);
        }

        // api/gatheringHalls/newMember
        [HttpPost("newMember")]
        public IActionResult AddNewMemberToCircle(GatheringHallMember gatheringHallMemberToAdd)
        {
            var member = _gatheringHallsRepository.AddMember(gatheringHallMemberToAdd);
            return Created("", member);

        }

        // api/gatheringHalls/
        [HttpPost]
        public IActionResult CreateNewGatheringHall(GatheringHall gatheringHallToAdd)
        {
            var gatheringHall = _gatheringHallsRepository.AddGatheringHall(gatheringHallToAdd);


            return Created("", gatheringHall);
        }
    }
}