namespace BookStoreApi.Models
{
    public class BookPublisher
    {
        public int id { get; set; }
        public Publisher publisher { get; set; }
        public int publisherId { get; set; }
        public Book book { get; set; }
        public int bookId { get; set; }
    }
}
