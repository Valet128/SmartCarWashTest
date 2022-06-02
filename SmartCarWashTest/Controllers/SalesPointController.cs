using SmartCarWashTest.Models;

namespace SmartCarWashTest.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SalesPointController : Controller
    {
        private ApplicationContext _db;
        public SalesPointController(ApplicationContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SalesPoint>>> Get()
        {
            return await _db.SalesPoints.ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<SalesPoint>> Get(int id)
        {
            var SalesPoint = await _db.SalesPoints.FirstOrDefaultAsync(x => x.Id == id);
            if (SalesPoint == null) return NotFound();
            return SalesPoint;
        }
        [HttpPost]
        public async Task<ActionResult<SalesPoint>> Post(SalesPoint SalesPoint)
        {
            if (SalesPoint != null)
            {
                _db.SalesPoints.Add(SalesPoint);
                await _db.SaveChangesAsync();
                return Ok(SalesPoint);
            }
            return BadRequest();

        }
        
        [HttpPut]
        public async Task<ActionResult<SalesPoint>> Put(SalesPoint SalesPoint)
        {
            if (SalesPoint != null)
            {
                _db.SalesPoints.Update(SalesPoint);
                await _db.SaveChangesAsync();
                return Ok(SalesPoint);
            }
            return NotFound();
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<SalesPoint>> Delete(int id)
        {
            var SalesPoint = await _db.SalesPoints.FirstOrDefaultAsync(x => x.Id == id);
            if (SalesPoint != null)
            {
                _db.SalesPoints.Remove(SalesPoint);
                await _db.SaveChangesAsync();
                return Ok(SalesPoint);
            }
            return BadRequest();
        }
    }
}
