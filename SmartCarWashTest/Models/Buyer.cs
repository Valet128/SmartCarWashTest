namespace SmartCarWashTest.Models
{
    public class Buyer
    {
        public string? Id { get; set; }
        public string? Name { get; set; }
        public List<Sale> SalesIds { get; set; } = new();
    }
}
