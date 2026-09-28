namespace MediVault.Server.Repositories;
using MediVault.Server.Models;

public interface IMedicationRepository
{
    Task<IEnumerable<Medication>> GetAllAsync(string? Status);
    Task<Medication?> GetByIdAsync(Guid id);
    Task<Medication> AddAsync(Medication Medication);
    Task UpdateAsync(Medication Medication);
    Task DeleteAsync(Guid id);
}