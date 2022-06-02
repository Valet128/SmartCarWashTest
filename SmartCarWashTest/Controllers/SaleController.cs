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
                var Sales = await _db.Sales.Where(x => x.Id == id).ToListAsync();
                if (Sales == null) return NotFound();
                return Ok(Sales);
            }
            [HttpPost]
            public async Task<ActionResult<Sale>> Post(Sale sale)
            {
                if (sale != null)
                {
                    _db.Sales.Add(sale);
                    await _db.SaveChangesAsync();
                    return Ok(sale);
                }
                return BadRequest();

            }
            [HttpPut]
            public async Task<ActionResult<Sale>> Put(Sale sale)
            {
                if (sale != null)
                {
                    _db.Update(sale);
                    await _db.SaveChangesAsync();
                    return Ok(sale);
                }
                return NotFound();
            }
            [HttpDelete("{id}")]
            public async Task<ActionResult<Sale>> Delete(int id)
            {
                var sale = await _db.Sales.FirstOrDefaultAsync(x => x.Id == id);
                if (sale != null)
                {
                    _db.Remove(sale);
                    await _db.SaveChangesAsync();
                    return Ok(sale);
                }
                return BadRequest();
            }
        
    }
}
