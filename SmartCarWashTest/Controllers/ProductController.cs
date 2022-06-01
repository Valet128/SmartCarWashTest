using SmartCarWashTest.Models;

namespace SmartCarWashTest.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        private ApplicationContext _db;
        public ProductController(ApplicationContext db)
        { 
            _db = db;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> Get()
        {
            return await _db.Products.ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> Get(int id)
        {
            var product = await _db.Products.FirstOrDefaultAsync(x => x.Id == id);
            if (product == null) return NotFound();
            return product;
        }
        [HttpPost]
        public async Task<ActionResult<Product>> Post(Product product)
        {
            if (product != null)
            {
                _db.Products.Add(product);
                await _db.SaveChangesAsync();
                return product;
            }
                return BadRequest();
            
        }
        [HttpPut]
        public async Task<ActionResult<Product>> Put(Product product)
        {
                if (product != null)
                {
                    _db.Update(product);
                    await _db.SaveChangesAsync();
                    return product;
                }
            return NotFound();
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Product>> Delete(int id)
        {
                var product = await _db.Products.FirstOrDefaultAsync(x => x.Id == id);
                if (product != null)
                {
                    _db.Remove(product);
                    await _db.SaveChangesAsync();
                    return product;
                }
            return BadRequest();
        }
    }
}
