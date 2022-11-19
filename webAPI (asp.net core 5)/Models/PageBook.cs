namespace BookStoreApi.Models
{
    public class PageBook
    {
        public int id { get; set; }
        public Page page { get; set; }
        public int pageId { get; set; }
        public Book book { get; set; }
        public int bookId { get; set; }
    }
}
