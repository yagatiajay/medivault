namespace MediVault.Server.Services;

public class MedicationService : IMedicationService
{
    private readonly IMedicationRepository _repo;

    public MedicationService(IMedicationRepository repo)
    {
        _repo = repo;
    }

    public async Task<IEnumerable<Medication>> GetMedicationsAsync(string? status)
    {
        return await _repo.GetAllAsync(status);
    }

    public async Task<Medication?> GetMedicationByIdAsync(Guid id)
    {
        return await _repo.GetByIdAsync(id);
    }

    public async Task<Medication> CreateMedicationAsync(Medication medication)
    {
        medication.Id = Guid.NewGuid();
        medication.CreatedAt = DateTime.UtcNow;
        return await _repo.AddAsync(medication);
    }
}
