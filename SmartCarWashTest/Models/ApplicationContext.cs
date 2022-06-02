using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace SmartCarWashTest.Models
{
    public class ApplicationContext : DbContext
    {
        public DbSet<Product> Products { get; set; } = null!;
        public DbSet<SalesPoint> SalesPoints { get; set; } = null!;
        public DbSet<Buyer> Buyers { get; set; } = null!;
        public DbSet<Sale> Sales { get; set; } = null!;
        public DbSet<ProvidedProduct> ProvidedProducts { get; set; } = null!;
        public DbSet<SaleData> SaleDatas { get; set; } = null!;
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
           
            Database.EnsureCreated();
        }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Product>().HasData(
                    new Product { Id = 1, Name = "Product1", Price = 500 },
                    new Product { Id = 2, Name = "Product2", Price = 2000 },
                    new Product { Id = 3, Name = "Product3", Price = 400 }
                );
            modelBuilder.Entity<SalesPoint>().HasData(
                    new SalesPoint { Id = 1, Name = "SalesPoint1" },
                    new SalesPoint { Id = 2, Name = "SalesPoint2" },
                    new SalesPoint { Id = 3, Name = "SalesPoint3" }
                );
            modelBuilder.Entity<ProvidedProduct>().HasData(
                    new ProvidedProduct { Id = 1, ProductId = 1, ProductQuantity = 10, SalesPointId = 1 },
                    new ProvidedProduct { Id = 2, ProductId = 2, ProductQuantity = 15, SalesPointId = 1 },
                    new ProvidedProduct { Id = 3, ProductId = 3, ProductQuantity = 20, SalesPointId = 1 },
                    new ProvidedProduct { Id = 4, ProductId = 1, ProductQuantity = 11, SalesPointId = 2 },
                    new ProvidedProduct { Id = 5, ProductId = 2, ProductQuantity = 33, SalesPointId = 2 },
                    new ProvidedProduct { Id = 6, ProductId = 3, ProductQuantity = 50, SalesPointId = 2 },
                    new ProvidedProduct { Id = 7, ProductId = 1, ProductQuantity = 10, SalesPointId = 3 },
                    new ProvidedProduct { Id = 8, ProductId = 3, ProductQuantity = 10, SalesPointId = 3 }
                    
                );
            modelBuilder.Entity<Buyer>().HasData(
                    new Buyer { Id = 1, Name = "Buyer1" },
                    new Buyer { Id = 2, Name = "Buyer2" },
                    new Buyer { Id = 3, Name = "Buyer3" }
                );
            modelBuilder.Entity<SaleData>().HasData(
                    new SaleData { Id = 1, SaleId = 1, ProductId = 1, Price = 500, ProductQuantity = 2, ProductIdAmount = 1000 },
                    new SaleData { Id = 2, SaleId = 1, ProductId = 2, Price = 2000, ProductQuantity = 1, ProductIdAmount = 2000 },
                    new SaleData { Id = 3, SaleId = 1, ProductId = 3, Price = 400, ProductQuantity = 5, ProductIdAmount = 2000 }
                );

            
            modelBuilder.Entity<Sale>().HasData(
                    new Sale { Id = 1, Date = DateTime.Now.ToShortDateString(), Time = DateTime.Now.ToLongTimeString(), SalesPointId = 1, BuyerId = 1, TotalAmount = 5000 },
                    new Sale { Id = 2, Date = DateTime.Now.ToShortDateString(), Time = DateTime.Now.ToLongTimeString(), SalesPointId = 1, BuyerId = 2, TotalAmount = 6000 },
                    new Sale { Id = 3, Date = DateTime.Now.ToShortDateString(), Time = DateTime.Now.ToLongTimeString(), SalesPointId = 1, BuyerId = 3, TotalAmount = 7000 },
                    new Sale { Id = 4, Date = DateTime.Now.ToShortDateString(), Time = DateTime.Now.ToLongTimeString(), SalesPointId = 2, BuyerId = 1, TotalAmount = 1000 },
                    new Sale { Id = 5, Date = DateTime.Now.ToShortDateString(), Time = DateTime.Now.ToLongTimeString(), SalesPointId = 2, BuyerId = 2, TotalAmount = 60 },
                    new Sale { Id = 6, Date = DateTime.Now.ToShortDateString(), Time = DateTime.Now.ToLongTimeString(), SalesPointId = 2, BuyerId = 3, TotalAmount = 700 },
                    new Sale { Id = 7, Date = DateTime.Now.ToShortDateString(), Time = DateTime.Now.ToLongTimeString(), SalesPointId = 3, BuyerId = 1, TotalAmount = 5000 },
                    new Sale { Id = 8, Date = DateTime.Now.ToShortDateString(), Time = DateTime.Now.ToLongTimeString(), SalesPointId = 3, BuyerId = 2, TotalAmount = 400 },
                    new Sale { Id = 9, Date = DateTime.Now.ToShortDateString(), Time = DateTime.Now.ToLongTimeString(), SalesPointId = 3, BuyerId = 3, TotalAmount = 11 },
                    new Sale { Id = 10, Date = DateTime.Now.ToShortDateString(), Time = DateTime.Now.ToLongTimeString(), SalesPointId = 3, BuyerId = 1, TotalAmount = 57 }
                );
            
        }
    }
}
