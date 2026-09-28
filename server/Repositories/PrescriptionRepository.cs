namespace MediVault.Server.Repositories;

public class PrescriptionRepository : IPrescriptionRepository
{
    private readonly MediVaultDbContext _context;

    public PrescriptionRepository(MediVaultDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Prescription>> GetAllAsync()
    {
        return await _context.Prescriptions.OrderByDescending(p => p.CreatedAt).ToListAsync();
    }

    public async Task<Prescription?> GetByIdAsync(Guid id)
    {
        return await _context.Prescriptions.FindAsync(id);
    }

    public async Task<Prescription> AddAsync(Prescription prescription)
    {
        _context.Prescriptions.Add(prescription);
        await _context.SaveChangesAsync();
        return prescription;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var item = await _context.Prescriptions.FindAsync(id);
        if (item == null) return false;
        _context.Prescriptions.Remove(item);
        await _context.SaveChangesAsync();
        return true;
    }
}
