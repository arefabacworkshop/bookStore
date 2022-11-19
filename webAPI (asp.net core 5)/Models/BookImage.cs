namespace BookStoreApi.Models
{
    public class BookImage
    {
        public int id { get; set; }
        public Book book { get; set; }
        public int bookId { get; set; }
        public string imageLocation { get; set; }
    }
}
