namespace BookStoreApi.Models
{
    public class PageTranslator
    {
        public int id { get; set; }
        public Page page { get; set; }
        public int pageId { get; set; }
        public Translator translator { get; set; }
        public int translatorId { get; set; }
    }
}
