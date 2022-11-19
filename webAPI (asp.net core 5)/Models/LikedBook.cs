namespace BookStoreApi.Models
{
    public class LikedBook
    {
        public int id { get; set; }
        public Book Book { get; set; }
        public int BookId { get; set; }
        public User user { get; set; }
        public int userId { get; set; }
    }
}
