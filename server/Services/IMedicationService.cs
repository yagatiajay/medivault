namespace MediVault.Server.Services;

public interface IMedicationService
{
    Task<IEnumerable<Medication>> GetMedicationsAsync(string? status);
    Task<Medication?> GetMedicationByIdAsync(Guid id);
    Task<Medication> CreateMedicationAsync(Medication medication);
}
