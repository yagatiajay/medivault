using System.Text;
using System.Text.Json;
using RabbitMQ.Client;

namespace MediVault.Server.Services;

public interface IRabbitMqService
{
    Task PublishMessageAsync<T>(string queueName, T message);
}

public class RabbitMqService : IRabbitMqService
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<RabbitMqService> _logger;

    public RabbitMqService(IConfiguration configuration, ILogger<RabbitMqService> logger)
    {
        _configuration = configuration;
        _logger = logger;
    }

    public async Task PublishMessageAsync<T>(string queueName, T message)
    {
        try
        {
            var factory = new ConnectionFactory
            {
                HostName = _configuration["RabbitMQ:HostName"] ?? "localhost",
                Port = int.Parse(_configuration["RabbitMQ:Port"] ?? "5672"),
                UserName = _configuration["RabbitMQ:UserName"] ?? "medivault_admin",
                Password = _configuration["RabbitMQ:Password"] ?? "medivault_rabbit_pass"
            };

            using var connection = await factory.CreateConnectionAsync();
            using var channel = await connection.CreateChannelAsync();

            // Declare queue (creates it if it doesn't exist)
            await channel.QueueDeclareAsync(
                queue: queueName,
                durable: true,
                exclusive: false,
                autoDelete: false,
                arguments: null);

            // Serialize message object to JSON bytes
            var json = JsonSerializer.Serialize(message);
            var body = Encoding.UTF8.GetBytes(json);

            // Publish message to the queue
            await channel.BasicPublishAsync(
                exchange: string.Empty,
                routingKey: queueName,
                body: body);

            _logger.LogInformation("--> [RabbitMQ] Published event to queue '{Queue}': {Data}", queueName, json);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to publish message to RabbitMQ.");
        }
    }
}
