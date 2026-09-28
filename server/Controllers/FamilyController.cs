namespace MediVault.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FamilyController : ControllerBase
{
    private readonly IFamilyRepository _repository;

    public FamilyController(IFamilyRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<FamilyMember>>> GetAll()
    {
        var items = await _repository.GetAllAsync();
        return Ok(items);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<FamilyMember>> GetById(Guid id)
    {
        var item = await _repository.GetByIdAsync(id);
        if (item == null) return NotFound();
        return Ok(item);
    }

    [HttpPost]
    public async Task<ActionResult<FamilyMember>> Create([FromBody] FamilyMember member)
    {
        if (member.Id == Guid.Empty)
        {
            member.Id = Guid.NewGuid();
        }
        member.CreatedAt = DateTime.UtcNow;
        var created = await _repository.AddAsync(member);
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
