using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VillageCircle.DataAccess;
using VillageCircle.Models;

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
        [HttpGet]
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

        // api/circles/{circleId}
        [HttpGet("{circleId}")]
        public IActionResult GetCircleByCircleId(int circleId)
        {
            var circle = _circlesRepository.GetSingleCircle(circleId);
            if (circle != null)
            {
                return Ok(circle);
            }
            return NotFound("This circle does not exist");
        }

        // api/circles/owner/{userId}
        [HttpGet("owner/{userId}")]
        public IActionResult GetCirclesByOwnerUserId(int userId)
        {
            var circles = _circlesRepository.GetCirclesByUserId(userId);
            return Ok(circles);
        }

        // api/circles/memberVerify/{userId}/{circleId}
        [HttpGet("memberVerify/{userId}/{circleId}")]
        [Authorize]
        public IActionResult VerifyUserCircleMembership(int userId, int circleId)
        {
            var isMember = _circlesRepository.VerifyMembership(userId, circleId);
            return Ok(isMember);
        }

        // api/circles/newMember
        [HttpPost("newMember")]
        [Authorize]
        public IActionResult AddNewMemberToCircle(CircleMember circleMemberToAdd)
        {
            var member = _circlesRepository.AddMember(circleMemberToAdd);
            return Created("", member);
            
        }

        // api/circles/
        [HttpPost]
        public IActionResult CreateNewCircle(Circle circleToAdd)
        {
            var circle = _circlesRepository.AddCircle(circleToAdd);


            return Created("", circle);
        }
    }
}