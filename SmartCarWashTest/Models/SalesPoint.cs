namespace SmartCarWashTest.Models
{
    public class SalesPoint
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public List<ProvidedProduct> ProvidedProducts { get; set; } = new();
    }
}
