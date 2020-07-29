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
    [Route("api/goals")]
    [ApiController]
    public class GoalsController : ControllerBase
    {
        GoalsRepo _goalsRepository;
        PointSystemRepo _pointsRepository;
        public GoalsController(GoalsRepo goalsRepository, PointSystemRepo pointsRepository)
        {
            _goalsRepository = goalsRepository;
            _pointsRepository = pointsRepository;
        }

        // api/goals/{userId}
        [HttpGet("{userId}")]
        public IActionResult GetGoalsByUserId(int userId)
        {
            var goals = _goalsRepository.GetGoals(userId);
            return Ok(goals);
        }

        // api/goals
        [HttpPost]
        public IActionResult CreateNewGoal(Goal goalToAdd)
        {
            var currentPointTotal = _pointsRepository.GetTotal(goalToAdd.UserId);
            if (goalToAdd.PointTarget >= currentPointTotal + 10)
            {
                var goal = _goalsRepository.AddNewGoal(goalToAdd);
                return Created("successfully created a new goal", goal);
            }
            return NotFound("Goal to Set is not at least 10 points above current total");
        }
    }
}