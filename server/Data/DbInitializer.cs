using MediVault.Server.Models;

namespace MediVault.Server.Data;

public static class DbInitializer
{
    public static void Seed(MediVaultDbContext context)
    {
        // Automatically ensure database schema is created/up-to-date
        context.Database.EnsureCreated();

        var defaultProfileId = Guid.Parse("11111111-1111-1111-1111-111111111111");

        // 1. Seed Medications if empty
        if (!context.Medications.Any())
        {
            var atorvastatin = new Medication
            {
                Id = Guid.NewGuid(),
                Name = "Atorvastatin",
                Dosage = "20 mg",
                Form = "1 tablet",
                Instructions = "Take with water after dinner",
                Frequency = "Once Daily",
                ScheduledTime = "08:00 AM",
                StartDate = DateTime.UtcNow.AddDays(-30),
                Status = "Active",
                PrescribingDoctor = "Dr. Evelyn Reed",
                Notes = "For cholesterol management",
                ProfileId = defaultProfileId
            };

            var metformin = new Medication
            {
                Id = Guid.NewGuid(),
                Name = "Metformin",
                Dosage = "500 mg",
                Form = "1 tablet",
                Instructions = "Take with morning meal",
                Frequency = "Once Daily",
                ScheduledTime = "08:30 AM",
                StartDate = DateTime.UtcNow.AddDays(-60),
                Status = "Active",
                PrescribingDoctor = "Dr. Marcus Vance",
                Notes = "Blood sugar support",
                ProfileId = defaultProfileId
            };

            var lisinopril = new Medication
            {
                Id = Guid.NewGuid(),
                Name = "Lisinopril",
                Dosage = "10 mg",
                Form = "1 tablet",
                Instructions = "Take once daily in the afternoon",
                Frequency = "Once Daily",
                ScheduledTime = "01:00 PM",
                StartDate = DateTime.UtcNow.AddDays(-15),
                Status = "Active",
                PrescribingDoctor = "Dr. Evelyn Reed",
                Notes = "Blood pressure maintenance",
                ProfileId = defaultProfileId
            };

            context.Medications.AddRange(atorvastatin, metformin, lisinopril);
            context.SaveChanges();

            // Create Today's Doses
            var today = DateTime.UtcNow.Date;
            var doses = new List<DoseLog>
            {
                new DoseLog
                {
                    Id = Guid.NewGuid(),
                    MedicationId = atorvastatin.Id,
                    ScheduledFor = today.AddHours(8),
                    LoggedAt = today.AddHours(8).AddMinutes(5),
                    Status = "Taken",
                    ActionNotes = "Taken on schedule"
                },
                new DoseLog
                {
                    Id = Guid.NewGuid(),
                    MedicationId = metformin.Id,
                    ScheduledFor = today.AddHours(8).AddMinutes(30),
                    LoggedAt = today.AddHours(8).AddMinutes(32),
                    Status = "Taken",
                    ActionNotes = "Taken with breakfast"
                },
                new DoseLog
                {
                    Id = Guid.NewGuid(),
                    MedicationId = lisinopril.Id,
                    ScheduledFor = today.AddHours(13),
                    Status = "Upcoming"
                }
            };

            context.DoseLogs.AddRange(doses);
            context.SaveChanges();
        }

        // 2. Seed Prescriptions if empty
        if (!context.Prescriptions.Any())
        {
            context.Prescriptions.AddRange(
                new Prescription
                {
                    Id = Guid.NewGuid(),
                    Medication = "Atorvastatin",
                    Dosage = "20 mg",
                    Frequency = "Once daily at bedtime",
                    Doctor = "Dr. Evelyn Reed",
                    Clinic = "Metro Health Clinic",
                    RxNumber = "RX-849201",
                    IssueDate = DateTime.UtcNow.AddMonths(-2),
                    ExpiryDate = DateTime.UtcNow.AddMonths(10),
                    RefillsLeft = 3,
                    TotalRefills = 5,
                    Diagnosis = "Hyperlipidemia",
                    Status = "Active",
                    ProfileId = defaultProfileId
                },
                new Prescription
                {
                    Id = Guid.NewGuid(),
                    Medication = "Metformin HCl",
                    Dosage = "500 mg",
                    Frequency = "Twice daily with meals",
                    Doctor = "Dr. Marcus Vance",
                    Clinic = "Downtown Medical Care",
                    RxNumber = "RX-739102",
                    IssueDate = DateTime.UtcNow.AddMonths(-3),
                    ExpiryDate = DateTime.UtcNow.AddMonths(9),
                    RefillsLeft = 2,
                    TotalRefills = 4,
                    Diagnosis = "Type 2 Diabetes Mellitus",
                    Status = "Active",
                    ProfileId = defaultProfileId
                },
                new Prescription
                {
                    Id = Guid.NewGuid(),
                    Medication = "Lisinopril",
                    Dosage = "10 mg",
                    Frequency = "Once daily in morning",
                    Doctor = "Dr. Evelyn Reed",
                    Clinic = "Metro Health Clinic",
                    RxNumber = "RX-628403",
                    IssueDate = DateTime.UtcNow.AddMonths(-1),
                    ExpiryDate = DateTime.UtcNow.AddMonths(11),
                    RefillsLeft = 4,
                    TotalRefills = 6,
                    Diagnosis = "Essential Hypertension",
                    Status = "Active",
                    ProfileId = defaultProfileId
                }
            );
            context.SaveChanges();
        }

        // 3. Seed Family Members if empty
        if (!context.FamilyMembers.Any())
        {
            context.FamilyMembers.AddRange(
                new FamilyMember
                {
                    Id = Guid.NewGuid(),
                    Name = "Sarah Jenkins",
                    Relationship = "Self (Primary)",
                    Initials = "SJ",
                    MedicationCount = 4,
                    PrescriptionsCount = 3,
                    Color = "#00685f",
                    Notes = "Primary account holder"
                },
                new FamilyMember
                {
                    Id = Guid.NewGuid(),
                    Name = "Eleanor Jenkins",
                    Relationship = "Mother",
                    Initials = "EJ",
                    MedicationCount = 3,
                    PrescriptionsCount = 2,
                    Color = "#0284c7",
                    Notes = "Managing cardiovascular routine"
                },
                new FamilyMember
                {
                    Id = Guid.NewGuid(),
                    Name = "Arthur Jenkins",
                    Relationship = "Father",
                    Initials = "AJ",
                    MedicationCount = 2,
                    PrescriptionsCount = 1,
                    Color = "#7c3aed",
                    Notes = "Joint health & vitamins"
                },
                new FamilyMember
                {
                    Id = Guid.NewGuid(),
                    Name = "Leo Jenkins",
                    Relationship = "Child",
                    Initials = "LJ",
                    MedicationCount = 1,
                    PrescriptionsCount = 1,
                    Color = "#ea580c",
                    Notes = "Seasonal allergy maintenance"
                }
            );
            context.SaveChanges();
        }
    }
}
