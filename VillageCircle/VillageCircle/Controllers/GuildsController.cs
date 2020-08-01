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
    [Route("api/guilds")]
    [ApiController]
    public class GuildsController : ControllerBase
    {
        GuildsRepo _guildsRepository;

        public GuildsController(GuildsRepo guildsRepository)
        {
            _guildsRepository = guildsRepository;
        }

        // api/Guilds
        [HttpGet]
        public IActionResult GetAllGuilds()
        {
            var guilds = _guildsRepository.GetGuilds();
            var isEmpty = !guilds.Any();
            if (isEmpty)
            {
                return NotFound("No Guilds were found.");
            }
            return Ok(guilds);
        }

        //api/Guilds/{guildId}
        [HttpGet("{guildId}")]
        public IActionResult GetGuildByGuildId(int guildId)
        {
            var guild = _guildsRepository.GetSingleGuild(guildId);
            if (guild != null)
            {
                return Ok(guild);
            }
            return NotFound("This guild does not exist");
        }

        // api/Guilds/owner/{userId}
        [HttpGet("owner/{userId}")]
        public IActionResult GetGuildsByOwnerUserId(int userId)
        {
            var guilds = _guildsRepository.GetGuildsByUserId(userId);
            return Ok(guilds);
        }

        // api/guilds/memberverify/{userId}/{guildId}
        [HttpGet("memberverify/{userId}/{guildId}")]
        public IActionResult VerifyUserGuildMembership(int userId, int guildId)
        {
            var isMember = _guildsRepository.VerifyMembership(userId, guildId);
            return Ok(isMember);
        }

        //api/guilds/newMember
        [HttpPost("newMember")]
        public IActionResult AddNewMemberToGuild(GuildMember guildMemberToAdd)
        {
            var member = _guildsRepository.AddMember(guildMemberToAdd);
            return Created("member creation successful", member);
        }

        // api/guilds
        [HttpPost]
        public IActionResult CreateNewGuild(Guild guildToAdd)
        {
            var guild = _guildsRepository.AddGuild(guildToAdd);
            return Created("", guild);
        }

    }
}