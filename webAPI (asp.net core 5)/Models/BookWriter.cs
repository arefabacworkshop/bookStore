using System.Collections.Generic;

namespace BookStoreApi.Models
{
    public class BookWriter
    {
        public int id { get; set; }
        public int bookId { get; set; }
        public Book book { get; set; }
        public int writerId { get; set; }
        public Writer writer { get; set; }
    }
}