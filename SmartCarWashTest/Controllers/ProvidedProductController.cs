using Microsoft.AspNetCore.Mvc;
using SmartCarWashTest.Models;

namespace SmartCarWashTest.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProvidedProductController : Controller
    {
        private ApplicationContext _db;
        public ProvidedProductController(ApplicationContext db)
        {
            _db = db;
        }

        [HttpGet]
        public ActionResult<IEnumerable<ProvidedProduct>> Get()
        {
            var products = _db.ProvidedProducts.ToList();
            return products;
        }

        [HttpGet("{id}")]
        public ActionResult<IEnumerable<ProvidedProduct>> Get(int id)
        {
            var products = _db.ProvidedProducts.Where(x => x.SalesPointId == id).ToList();
            return products;
        }
        [HttpPost]
        public async Task<ActionResult<ProvidedProduct>> Post(ProvidedProduct providedProduct)
        {
            if (providedProduct != null)
            {
                _db.ProvidedProducts.Add(providedProduct);
                await _db.SaveChangesAsync();
                return Ok(providedProduct);
            }
            return BadRequest();

        }

        [HttpPut]
        public async Task<ActionResult> Put(ProvidedProduct providedProduct)
        {
            if (providedProduct != null)
            {
                var storeProduct = await _db.ProvidedProducts.Where(s=>s.SalesPointId == providedProduct.SalesPointId).FirstOrDefaultAsync(p => p.ProductId == providedProduct.ProductId);
                if (storeProduct != null)
                {
                    storeProduct.ProductQuantity += providedProduct.ProductQuantity;
                    
                    _db.ProvidedProducts.Update(storeProduct);
                    await _db.SaveChangesAsync();
                }
                else 
                {
                    _db.ProvidedProducts.Add(providedProduct);
                    await _db.SaveChangesAsync();
                }
                return Ok();
            }
            return BadRequest();
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<ProvidedProduct>> Delete(int id, ProvidedProduct product)
        {
            var storeProduct = await _db.ProvidedProducts.Where(s => s.SalesPointId == product.SalesPointId).FirstOrDefaultAsync(p => p.ProductId == id);
            if (storeProduct != null)
            {
                _db.ProvidedProducts.Remove(storeProduct);
                await _db.SaveChangesAsync();
                return Ok(storeProduct);
            }
            return BadRequest();
        }
    }
}
