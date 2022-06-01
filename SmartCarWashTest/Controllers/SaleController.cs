using Microsoft.AspNetCore.Mvc;
using SmartCarWashTest.Models;

namespace SmartCarWashTest.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SaleController : Controller
    {
            private ApplicationContext _db;
            public SaleController(ApplicationContext db)
            {
                _db = db;
            }

            [HttpGet]
            public async Task<ActionResult<Sale>> Get()
            {
            var sales = await _db.Sales.ToListAsync();
            return Ok(sales);
            }
        [HttpGet("{id}")]
            public async Task<ActionResult<Sale>> Get(int id)
            {
                var Sales = await _db.Sales.Where(x => x.BuyerId == id).ToListAsync();
                if (Sales == null) return NotFound();
                return Ok(Sales);
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
                var sales = await _db.Sales.FirstOrDefaultAsync(x => x.Id == id);
                if (sales != null)
                {
                    _db.Remove(sales);
                    await _db.SaveChangesAsync();
                    return Ok(sales);
                }
                return BadRequest();
            }
        
    }
}
