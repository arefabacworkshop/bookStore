using BookStoreApi.Models;
using System.Collections.Generic;

namespace BookStoreApi.APIModels
{
    public class ShelfCreate
    {
        public int? id { get; set; }
        public string name { get; set; }
        public List<Book> books { get; set; }
    }
}
