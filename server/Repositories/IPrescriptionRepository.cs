namespace MediVault.Server.Repositories;

public interface IPrescriptionRepository
{
    Task<IEnumerable<Prescription>> GetAllAsync();
    Task<Prescription?> GetByIdAsync(Guid id);
    Task<Prescription> AddAsync(Prescription prescription);
    Task<bool> DeleteAsync(Guid id);
}
