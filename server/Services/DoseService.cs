namespace MediVault.Server.Services;

public class DoseService : IDoseService
{
    private readonly IDoseRepository _doseRepo;
    private readonly IDistributedCache _cache;
    private readonly IRabbitMqService _rabbitMqService;
    private readonly ILogger<DoseService> _logger;

    public const string CacheKey = "doses_today_all";

    public DoseService(
        IDoseRepository doseRepo,
        IDistributedCache cache,
        IRabbitMqService rabbitMqService,
        ILogger<DoseService> logger)
    {
        _doseRepo = doseRepo;
        _cache = cache;
        _rabbitMqService = rabbitMqService;
        _logger = logger;
    }

    public async Task<IEnumerable<DoseLog>> GetTodayDosesAsync()
    {
        var cached = await _cache.GetStringAsync(CacheKey);
        if (!string.IsNullOrEmpty(cached))
        {
            _logger.LogInformation("[REDIS HIT] Serving today's doses from in-memory Redis cache");
            return JsonSerializer.Deserialize<List<DoseLog>>(cached) ?? new List<DoseLog>();
        }

        _logger.LogInformation("[REDIS MISS] Fetching from DB");
        var doses = (await _doseRepo.GetTodayDosesAsync()).ToList();
        var options = new DistributedCacheEntryOptions
        {
            AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
        };

        await _cache.SetStringAsync(CacheKey, JsonSerializer.Serialize(doses), options);
        return doses;
    }

    public async Task<DoseLog?> UpdateStatusAsync(Guid id, string status)
    {
        var dose = await _doseRepo.GetByIdAsync(id);
        if (dose == null)
        {
            return null;
        }

        dose.Status = status;
        if (status.Equals("Taken", StringComparison.OrdinalIgnoreCase))
        {
            dose.LoggedAt = DateTime.UtcNow;
        }

        await _doseRepo.UpdateStatusAsync(dose);
        await _cache.RemoveAsync(CacheKey);

        var payload = new
        {
            Event = "DoseStatusChanged",
            DoseId = dose.Id,
            Medication = dose.Medication?.Name,
            Status = dose.Status,
            Timestamp = DateTime.UtcNow
        };

        await _rabbitMqService.PublishMessageAsync("medivault_reminders", payload);
        return dose;
    }
}
