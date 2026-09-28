namespace MediVault.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DosesController : ControllerBase
{
    private readonly IDoseService _doseService;

    public DosesController(IDoseService doseService)
    {
        _doseService = doseService;
    }

    [HttpGet("today")]
    public async Task<IActionResult> GetTodayDoses()
    {
        var doses = await _doseService.GetTodayDosesAsync();
        return Ok(doses);
    }

    [HttpPatch("{id}/status")]
    public async Task<IActionResult> UpdateStatus(Guid id, [FromBody] UpdateDoseStatusDto dto)
    {
        var updated = await _doseService.UpdateStatusAsync(id, dto.Status);
        if (updated == null)
        {
            return NotFound(new { message = $"Dose with {id} not found." });
        }
        return Ok(updated);
    }
}

public class UpdateDoseStatusDto
{
    public string Status { get; set; } = "Taken";
}
