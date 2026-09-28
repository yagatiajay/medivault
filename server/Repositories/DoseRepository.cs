namespace MediVault.Server.Repositories;

public class DoseRepository : IDoseRepository
{
    private readonly MediVaultDbContext _context;

    public DoseRepository(MediVaultDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<DoseLog>> GetTodayDosesAsync()
    {
        return await _context.DoseLogs
            .Include(d => d.Medication)
            .OrderBy(d => d.ScheduledFor)
            .ToListAsync();
    }

    public async Task<DoseLog?> GetByIdAsync(Guid id)
    {
        return await _context.DoseLogs
            .Include(d => d.Medication)
            .FirstOrDefaultAsync(d => d.Id == id);
    }

    public async Task UpdateStatusAsync(DoseLog doseLog)
    {
        _context.Entry(doseLog).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }
}
