namespace MediVault.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MedicationsController : ControllerBase
{
    private readonly IMedicationService _medicationService;

    public MedicationsController(IMedicationService medicationService)
    {
        _medicationService = medicationService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] string? status)
    {
        var medications = await _medicationService.GetMedicationsAsync(status);
        return Ok(medications);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var medication = await _medicationService.GetMedicationByIdAsync(id);
        if (medication == null)
        {
            return NotFound(new { message = $"Medication with {id} not found." });
        }
        return Ok(medication);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Medication medication)
    {
        if (string.IsNullOrWhiteSpace(medication.Name))
        {
            return BadRequest(new { message = "Medication name is required." });
        }

        var created = await _medicationService.CreateMedicationAsync(medication);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }
}
