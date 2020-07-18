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

        public IEnumerable<MessageProfileView> GetMessagesByUser(int userId)
        {
            var sql = @"
                        select [messageBoard].boardName
                        from [message]
                        join [MessageBoard] on [MessageBoard].messageBoardId = [Message].boardId
                        where [message].userId = @UserId
                      ";
            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { UserId = userId };
                var result = db.Query<MessageProfileView>(sql, parameters);
                return result;
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

        public Message DeleteMessage(int messageId)
        {
            var sql = @"DELETE from [Message]
                        WHERE MessageId = @MessageId";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { MessageId = messageId };
                var result = db.QueryFirstOrDefault<Message>(sql, parameters);
                return result;
            }
        }

        public Message Update(Message messageToUpdate)
        {
            var sql = @"
                        update [Message]
                        set messageText = @MessageText
                        where MessageId = @MessageId;
                       ";
            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { MessageText = messageToUpdate.MessageText, MessageId = messageToUpdate.MessageId };
                var result = db.QueryFirstOrDefault<Message>(sql, parameters);
                return result;
            }
        }
    }
}
