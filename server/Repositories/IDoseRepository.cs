namespace MediVault.Server.Repositories;

public interface IDoseRepository
{
    Task<IEnumerable<DoseLog>> GetTodayDosesAsync();
    Task<DoseLog?> GetByIdAsync(Guid id);
    Task UpdateStatusAsync(DoseLog dose);
}
