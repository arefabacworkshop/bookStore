namespace BookStoreApi.Models
{
    public class OrderDetails
    {
        public int id { get; set; }
        public Order order { get; set; }
        public int orderId { get; set; }
        public Book book { get; set; }
        public int bookId { get; set; }
        public int count { get; set; }
    }
}
