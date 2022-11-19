namespace BookStoreApi.Models
{
    public class BookTranslator
    {
        public int id { get; set; }
        public Translator translator { get; set; }
        public int translatorId { get; set; }
        public Book book { get; set; }
        public int bookId { get; set; }
    }
}
