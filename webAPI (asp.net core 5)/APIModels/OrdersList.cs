using BookStoreApi.Models;
using System.Collections.Generic;

namespace BookStoreApi.APIModels
{
    public class OrdersList
    {
        public Order order { get; set; }
        public List<OrderDetails> orderDetails { get; set; }
    }
}
