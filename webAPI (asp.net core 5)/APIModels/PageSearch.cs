using BookStoreApi.Models;
using System.Collections.Generic;

namespace BookStoreApi.APIModels
{
    public class PageSearch
    {
        public int? id { get; set; }
        public int? order { get; set; }
        public string? name { get; set; }
        public string type { get; set; }
        public bool? isExist { get; set; }
        public int? pageNum { get; set; }
        public List<int>? publishersId { get; set; }
        public List<int>? categoriesId { get; set; }
        public List<int>? writersId { get; set; }
        public List<int>? translatorsId { get; set; }
    }
}
