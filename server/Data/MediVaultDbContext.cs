using Microsoft.EntityFrameworkCore;
using MediVault.Server.Models;

namespace MediVault.Server.Data;

public class MediVaultDbContext : DbContext
{
    public MediVaultDbContext(DbContextOptions<MediVaultDbContext> options) : base(options) {}

    public DbSet<Medication> Medications => Set<Medication>();
    public DbSet<DoseLog> DoseLogs => Set<DoseLog>();
    public DbSet<Prescription> Prescriptions => Set<Prescription>();
    public DbSet<FamilyMember> FamilyMembers => Set<FamilyMember>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Medication>().HasIndex(m => m.Name);
        modelBuilder.Entity<DoseLog>().HasIndex(d => d.ScheduledFor);
        modelBuilder.Entity<Prescription>().HasIndex(p => p.RxNumber);
        modelBuilder.Entity<FamilyMember>().HasIndex(f => f.Name);
    }
}
