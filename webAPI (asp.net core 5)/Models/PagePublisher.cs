namespace BookStoreApi.Models
{
    public class PagePublisher
    {
        public int id { get; set; }
        public Page page { get; set; }
        public int pageId { get; set; }
        public Publisher publisher { get; set; }
        public int publisherId { get; set; }
    }
}
