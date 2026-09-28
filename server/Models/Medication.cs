namespace MediVault.Server.Models
{
    public class Medication
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Dosage { get; set; } = string.Empty;
        public string Form { get; set; } = string.Empty;
        public string Instructions { get; set; } = string.Empty;
        public string Frequency { get; set; } = "Once Daily";
        public string ScheduledTime { get; set; } = "08:00 AM";
        public DateTime StartDate { get; set; } = DateTime.UtcNow;
        public DateTime? EndDate { get; set; } = DateTime.UtcNow;
        public string Status { get; set; } = "Active";
        public string? PrescribingDoctor { get; set; }
        public string? Notes { get; set; }
        public Guid ProfileId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}