namespace MediVault.Server.Models;

public class Prescription
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Medication { get; set; } = string.Empty;
    public string Dosage { get; set; } = string.Empty;
    public string Frequency { get; set; } = string.Empty;
    public string Doctor { get; set; } = string.Empty;
    public string Clinic { get; set; } = string.Empty;
    public string RxNumber { get; set; } = string.Empty;
    public DateTime IssueDate { get; set; } = DateTime.UtcNow;
    public DateTime ExpiryDate { get; set; } = DateTime.UtcNow.AddYears(1);
    public int RefillsLeft { get; set; } = 0;
    public int TotalRefills { get; set; } = 0;
    public string Diagnosis { get; set; } = string.Empty;
    public string Status { get; set; } = "Active";
    public string DocumentUrl { get; set; } = string.Empty;
    public Guid ProfileId { get; set; } = Guid.Parse("11111111-1111-1111-1111-111111111111");
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
