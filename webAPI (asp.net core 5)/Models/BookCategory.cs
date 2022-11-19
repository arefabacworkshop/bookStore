using System.Collections.Generic;

namespace BookStoreApi.Models
{
    public class BookCategory
    {
        public int id { get; set; }
        public int bookId { get; set; }
        public Book book { get; set; }
        public int categoryId { get; set; }
        public Category Category { get; set; }
    }
}