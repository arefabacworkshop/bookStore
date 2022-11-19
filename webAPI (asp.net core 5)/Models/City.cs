using System.Collections.Generic;

namespace BookStoreApi.Models
{
    public class City
    {
        public int id { get; set; }
        public string name { get; set; }
        public State state { get; set; }
        public int stateid { get; set; }

    }
}