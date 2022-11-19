namespace BookStoreApi.Models
{
    public class Comment
    {
        public int id { get; set; }
        public string text { get; set; }
        public User user { get; set; }
        public int userId { get; set; }
        public Book book { get; set; }
        public int bookId { get; set; }
        public CommentState commentState { get; set; }
        public int commentStateId { get; set; }

    }
}
