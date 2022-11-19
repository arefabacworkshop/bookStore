namespace BookStoreApi.APIModels
{
    public class SearchRequest
    {
        public int? id { get; set; }
        public string? name { get; set; }
        public string? bookNo { get; set; }
        public int? publisherId { get; set; }
        public int? writerId { get; set; }
        public int? translatorId { get; set; }
        public string? publishDate { get; set; }
        public int? categoryId { get; set; }
        public int pageNo { get; set; }
    }
}
