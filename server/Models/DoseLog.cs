namespace MediVault.Server.Models
{
    public class DoseLog
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid MedicationId { get; set; }
        public Medication? Medication { get; set; }
        public DateTime? LoggedAt { get; set; }
        public DateTime ScheduledFor { get; set;}
        public string? Status { get; set; } = "Upcoming";
        public string? ActionNotes { get; set; }
    }
}