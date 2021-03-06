﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VillageCircle.DataAccess;

namespace VillageCircle.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        UsersRepo _usersRepository;
        public UsersController(UsersRepo usersRepository)
        {
            _usersRepository = usersRepository;
        }

        // api/users/{uid}
        [HttpGet("{uid}")]
        [Authorize]
        public IActionResult GetSingleUserByUid(string uid)
        {
            var user = _usersRepository.GetSingleUser(uid);
            return Ok(user);
        }

        // api/users/children/{userId}
        [HttpGet("children/{userId}")]
        public IActionResult GetChildrenByUserId(int userId)
        {
            var children = _usersRepository.GetChildren(userId);
            return Ok(children);
        }

        // api/users/circleMembers/{circleId}
        [HttpGet("circleMembers/{circleId}")]
        public IActionResult GetCircleMembersByCircleId(int circleId)
        {
            var members = _usersRepository.GetCircleMemberUsers(circleId);
            return Ok(members);
        }

        // api/users/guildMembers/{guildId}
        [HttpGet("guildMembers/{guildId}")]
        public IActionResult GetGuildMembersByGuildId(int guildId)
        {
            var members = _usersRepository.GetGuildMemberUsers(guildId);
            return Ok(members);
        }

    }
}