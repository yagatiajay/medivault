namespace MediVault.Server.Models;

public class FamilyMember
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = string.Empty;
    public string Relationship { get; set; } = string.Empty;
    public string Initials { get; set; } = string.Empty;
    public int MedicationCount { get; set; } = 0;
    public int PrescriptionsCount { get; set; } = 0;
    public string Color { get; set; } = "#00685f";
    public string Notes { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
