using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using VillageCircle.Models;

namespace VillageCircle.DataAccess
{
    public class MessagesRepo
    {
        string connectionString;
        public MessagesRepo(IConfiguration config)
        {
            connectionString = config.GetConnectionString("VillageCircle");
        }

        public IEnumerable<Message> GetAllMessages(int boardId)
        {
            var sql = "select * from [Message] where BoardId = @BoardId;";
            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { BoardId = boardId };
                var messages = db.Query<Message>(sql, parameters);
                return messages;
            }
        }

        public Message AddMessage(Message messageToAdd)
        {
            var sql = @"
                        insert into [Message](BoardId, UserId, MessageText)
                        output inserted.*
                        values(@BoardId, @UserId, @MessageText);
                      ";
            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new
                {
                    BoardId = messageToAdd.BoardId,
                    UserId = messageToAdd.UserId,
                    MessageText = messageToAdd.MessageText
                };
                var result = db.QueryFirstOrDefault<Message>(sql, parameters);
                return result;
            }
        }
    }
}
