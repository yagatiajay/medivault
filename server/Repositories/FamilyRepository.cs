namespace MediVault.Server.Repositories;

public class FamilyRepository : IFamilyRepository
{
    private readonly MediVaultDbContext _context;

    public FamilyRepository(MediVaultDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<FamilyMember>> GetAllAsync()
    {
        return await _context.FamilyMembers.OrderBy(f => f.CreatedAt).ToListAsync();
    }

    public async Task<FamilyMember?> GetByIdAsync(Guid id)
    {
        return await _context.FamilyMembers.FindAsync(id);
    }

    public async Task<FamilyMember> AddAsync(FamilyMember member)
    {
        _context.FamilyMembers.Add(member);
        await _context.SaveChangesAsync();
        return member;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var item = await _context.FamilyMembers.FindAsync(id);
        if (item == null) return false;
        _context.FamilyMembers.Remove(item);
        await _context.SaveChangesAsync();
        return true;
    }
}
