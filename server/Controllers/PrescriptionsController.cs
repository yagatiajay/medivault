namespace MediVault.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PrescriptionsController : ControllerBase
{
    private readonly IPrescriptionRepository _repository;

    public PrescriptionsController(IPrescriptionRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Prescription>>> GetAll()
    {
        var items = await _repository.GetAllAsync();
        return Ok(items);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<Prescription>> GetById(Guid id)
    {
        var item = await _repository.GetByIdAsync(id);
        if (item == null) return NotFound();
        return Ok(item);
    }

    [HttpPost]
    public async Task<ActionResult<Prescription>> Create([FromBody] Prescription prescription)
    {
        if (prescription.Id == Guid.Empty)
        {
            prescription.Id = Guid.NewGuid();
        }
        prescription.CreatedAt = DateTime.UtcNow;
        var created = await _repository.AddAsync(prescription);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var success = await _repository.DeleteAsync(id);
        if (!success) return NotFound();
        return NoContent();
    }
}
