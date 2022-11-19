namespace BookStoreApi.Models
{
    public class PageWriter
    {
        public int id { get; set; }
        public Page page { get; set; }
        public int pageId { get; set; }
        public Writer writer { get; set; }
        public int writerId { get; set; }
    }
}
