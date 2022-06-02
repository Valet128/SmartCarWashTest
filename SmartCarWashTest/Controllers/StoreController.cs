using Microsoft.AspNetCore.Mvc;
using SmartCarWashTest.Models;

namespace SmartCarWashTest.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StoreController : Controller
    {
        private ApplicationContext _db;
        public StoreController(ApplicationContext db)
        {
            _db = db;
        }

        [HttpPost]
        public async Task<ActionResult<ProvidedProduct>> Post(Sale sale)
        {
            if (sale != null)
            {
                 var providedproduct = await _db.ProvidedProducts.Where(pp => pp.SalesPointId == sale.SalesPointId).ToListAsync();
                 _db.Sales.Add(sale);
                 
                 foreach (var data in sale.SalesData)
                 {
                     data.SaleId = sale.Id;
                    _db.SaleDatas.Add(data);
                    _db.SaveChanges();
                    foreach (var product in providedproduct)
                     {
                         if (data.ProductId == product.ProductId)
                         {
                             product.ProductQuantity -= data.ProductQuantity;
                             _db.SaveChanges();
                         }
                     }
                 }
                 return Ok(sale);
            }
            return BadRequest();
        }
    }
}
