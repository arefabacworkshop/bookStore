namespace BookStoreApi.Models
{
    public class PageCategory
    {
        public int id { get; set; }
        public Page page { get; set; }
        public int pageId { get; set; }
        public Category category { get; set; }
        public int categoryId { get; set; }
    }
}
