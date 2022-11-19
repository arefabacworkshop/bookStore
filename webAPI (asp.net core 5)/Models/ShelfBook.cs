namespace BookStoreApi.Models
{
    public class ShelfBook
    {
        public int id { get; set; }
        public Shelf shelf { get; set; }
        public int shelfId { get; set; }
        public Book book { get; set; }
        public int bookId { get; set; }
    }
}
