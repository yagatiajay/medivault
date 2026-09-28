using Microsoft.EntityFrameworkCore;
using MediVault.Server.Data;
using MediVault.Server.Models;
namespace MediVault.Server.Repositories;

public class MedicationRepository : IMedicationRepository
{
    private readonly MediVaultDbContext _context;
    public MedicationRepository(MediVaultDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Medication>> GetAllAsync(string? status)
    {
        var query = _context.Medications.AsQueryable();
        if(!string.IsNullOrWhiteSpace(status))
        {
            query = query.Where(m => m.Status.ToLower() == status.ToLower());
        }
        return await query.OrderByDescending(m => m.CreatedAt).ToListAsync();
    }

    public async Task<Medication?> GetByIdAsync(Guid id)
    {
        return await _context.Medications.FindAsync(id);
    }

    public async Task<Medication> AddAsync(Medication medication)
    {
        _context.Medications.Add(medication);
        await _context.SaveChangesAsync();
        return medication;
    }

    public async Task UpdateAsync(Medication medication)
    {
        _context.Entry(medication).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }
    public async Task DeleteAsync(Guid id)
    {
        var medication = await _context.Medications.FindAsync(id);
        if(medication != null){
            _context.Medications.Remove(medication);
            await _context.SaveChangesAsync();
        }
    }
}