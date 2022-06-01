namespace SmartCarWashTest.Models
{
    public class Buyer
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public List<Sale> SalesIds { get; set; } = new();
    }
}
