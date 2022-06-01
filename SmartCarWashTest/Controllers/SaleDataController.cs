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

        [HttpGet("{id}")]
        public ActionResult<IEnumerable<SaleData>> Get(int id)
        {
            var details = _db.SaleDatas.Where(x => x.SaleId == id).ToList();
            return details;
        }
        
    }
}
