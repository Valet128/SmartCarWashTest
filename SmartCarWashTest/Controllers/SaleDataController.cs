using Microsoft.AspNetCore.Mvc;
using SmartCarWashTest.Models;

namespace SmartCarWashTest.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SaleDataController : Controller
    {
        private ApplicationContext _db;
        public SaleDataController(ApplicationContext db)
        {
            _db = db;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SaleData>>> Get()
        {
            var sales = await _db.SaleDatas.ToListAsync();
            return Ok(sales);
        }

        [HttpGet("{id}")]
        public ActionResult<IEnumerable<SaleData>> Get(int id)
        {
            var details = _db.SaleDatas.Where(x => x.Id == id).ToList();
            return details;
        }

        
        [HttpPost]
        public async Task<ActionResult<SaleData>> Post(SaleData saleData)
        {
            if (saleData != null)
            {
                _db.SaleDatas.Add(saleData);
                await _db.SaveChangesAsync();
                return Ok(saleData);
            }
            return BadRequest();

        }
        [HttpPut]
        public async Task<ActionResult<SaleData>> Put(SaleData saleData)
        {
            if (saleData != null)
            {
                _db.Update(saleData);
                await _db.SaveChangesAsync();
                return Ok(saleData);
            }
            return NotFound();
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<SaleData>> Delete(int id)
        {
            var salesdata = await _db.SaleDatas.FirstOrDefaultAsync(x => x.Id == id);
            if (salesdata != null)
            {
                _db.Remove(salesdata);
                await _db.SaveChangesAsync();
                return Ok(salesdata);
            }
            return BadRequest();
        }

    }
}
