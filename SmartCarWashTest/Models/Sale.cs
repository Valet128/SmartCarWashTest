namespace SmartCarWashTest.Models
{
    public class Sale
    {
        public int Id { get; set; }
        public string? Date { get; set; }
        public string? Time { get; set; }
        public int SalesPointId { get; set; }
        public int BuyerId { get; set; }
        public List<SaleData> SalesData { get; set; } = new();
        public double TotalAmount { get; set; }
    }
}
