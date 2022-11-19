using BookStoreApi.Models;
using System.Collections.Generic;

namespace BookStoreApi.APIModels
{
    public class SearchSelect
    {
        public List<Publisher> publishers { get; set; }
        public List<Writer> writers { get; set; }
        public List<Translator> translators { get; set; }
        public List<Category> categories { get; set; }
    }
}
