using SmartCarWashTest.Models;

namespace SmartCarWashTest.Controllers
{
    public class HomeController : Controller
    {
        ApplicationContext _db;
        public HomeController(ApplicationContext db)
        { 
            _db = db;
        }
       
        public IActionResult Index()
        {
            return View();
        }
    }
}
