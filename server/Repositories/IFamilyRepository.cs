namespace MediVault.Server.Repositories;

public interface IFamilyRepository
{
    Task<IEnumerable<FamilyMember>> GetAllAsync();
    Task<FamilyMember?> GetByIdAsync(Guid id);
    Task<FamilyMember> AddAsync(FamilyMember member);
    Task<bool> DeleteAsync(Guid id);
}
