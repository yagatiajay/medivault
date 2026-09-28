namespace MediVault.Server.Services;

public interface IDoseService{
    Task<IEnumerable<DoseLog>> GetTodayDosesAsync();
    Task<DoseLog?> UpdateStatusAsync(Guid id, string status);
}