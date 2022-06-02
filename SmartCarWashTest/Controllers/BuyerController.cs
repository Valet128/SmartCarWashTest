using Microsoft.AspNetCore.Mvc;
using SmartCarWashTest.Models;

namespace SmartCarWashTest.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BuyerController : Controller
    {
        private ApplicationContext _db;
        public BuyerController(ApplicationContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Buyer>>> Get()
        {
            return await _db.Buyers.ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Buyer>> Get(int id)
        {
            var Buyer = await _db.Buyers.FirstOrDefaultAsync(x => x.Id == id);
            if (Buyer == null) return NotFound();
            return Buyer;
        }
        [HttpPost]
        public async Task<ActionResult<Buyer>> Post(Buyer Buyer)
        {
            if (Buyer != null)
            {
                _db.Buyers.Add(Buyer);
                await _db.SaveChangesAsync();
                return Buyer;
            }
            return BadRequest();

        }
        [HttpPut]
        public async Task<ActionResult<Buyer>> Put(Buyer Buyer)
        {
            if (Buyer != null)
            {
                _db.Update(Buyer);
                await _db.SaveChangesAsync();
                return Buyer;
            }
            return NotFound();
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Buyer>> Delete(int id)
        {
            var Buyer = await _db.Buyers.FirstOrDefaultAsync(x => x.Id == id);
            if (Buyer != null)
            {
                _db.Remove(Buyer);
                await _db.SaveChangesAsync();
                return Buyer;
            }
            return BadRequest();
        }
    }
}
