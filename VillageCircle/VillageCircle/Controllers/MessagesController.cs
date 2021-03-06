﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VillageCircle.DataAccess;
using VillageCircle.Models;

namespace VillageCircle.Controllers
{
    [Route("api/messages")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        MessagesRepo _messagesRepository;
        public MessagesController(MessagesRepo messagesRepository)
        {
            _messagesRepository = messagesRepository;
        }

        // api/messages/{boardId}
        [HttpGet("{boardId}")]
        public IActionResult GetMessagesByBoardId(int boardId)
        {
            var messages = _messagesRepository.GetAllMessages(boardId);
            var isEmpty = !messages.Any();
            if (isEmpty)
            {
                return NotFound("No Messages found with that board id.");
            }
            return Ok(messages);
        }

        // api/messages/userPosts/{userId}
        [HttpGet("userPosts/{userId}")]
        public IActionResult GetMessagesByUserId(int userId)
        {
            var messages = _messagesRepository.GetMessagesByUser(userId);
            var isEmpty = !messages.Any();
            if (isEmpty)
            {
                return Ok("This user has not posted any messages");
            }
            return Ok(messages);
        }

        // api/messages
        [HttpPost]
        public IActionResult CreateNewMessage(Message newMessageToAdd)
        {
            var message = _messagesRepository.AddMessage(newMessageToAdd);
            return Created("", message);
        }

        // api/messages/{messageId}
        [HttpDelete("{messageId}")]
        public IActionResult DeleteMessageByMessageId(int messageId)
        {
            var deletedMessage = _messagesRepository.DeleteMessage(messageId);
            return Ok("Message has been deleted successfully!");
        }

        // api/messages
        [HttpPut]
        public IActionResult UpdateMessage(Message messageToUpdate)
        {
            var updatedMessage = _messagesRepository.Update(messageToUpdate);
            return Ok("Message was updated successfully.");
        }
    }
}