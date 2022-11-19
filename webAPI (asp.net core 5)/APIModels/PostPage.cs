using BookStoreApi.Models;
using System.Collections.Generic;

namespace BookStoreApi.APIModels
{
    public class PostPage
    {
        public int? id { get; set; }
        public string name { get; set; }
        public List<Category> categories { get; set; }
        public List<Writer> writers { get; set; }
        public List<Publisher> publishers { get; set; }
        public List<Translator> translators { get; set; }
        public List<Book> books { get; set; }
    }
}
