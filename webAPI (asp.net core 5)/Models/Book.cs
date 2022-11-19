using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookStoreApi.Models
{
    public class Book
    {
        public int id { get; set; }
        public string name { get; set; }
        public string bookSize { get; set; }
        public string pageType { get; set; }
        public string coverType { get; set; }
        public string nobateChap { get; set; }
        public string publishDate { get; set; }
        public string BookNo { get; set; }
        public string imageLocation { get; set; }
        public string Describtion { get; set; }
        public int? price { get; set; }
        public int? offPrice { get; set; }
        public int countInStorage { get; set; }
        public int salesCount { get; set; }

    }
}