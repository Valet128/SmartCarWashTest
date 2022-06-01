using Microsoft.AspNetCore.Mvc;

namespace SmartCarWashTest.Controllers
{
    public class AdminController : Controller
    {
        public IActionResult ControlPanel()
        {
            return View();
        }
        public IActionResult ProductControl()
        {
            return View();
        }
        public IActionResult SalesPointControl()
        {
            return View();
        }
        public IActionResult BuyerControl()
        {
            return View();
        }
        public IActionResult SaleControl()
        {
            return View();
        }
        public IActionResult ProvidedProductControl()
        {
            return View();
        }
        public IActionResult ProvidedProductListControl()
        {
            return View();
        }
        public IActionResult ListSalesOfBuyer()
        {
            return View();
        }
        
    }
}
