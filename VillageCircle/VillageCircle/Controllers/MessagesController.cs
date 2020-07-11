using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VillageCircle.DataAccess;

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
    }
}