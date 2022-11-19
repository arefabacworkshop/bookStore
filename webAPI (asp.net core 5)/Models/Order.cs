using System;

namespace BookStoreApi.Models
{
    public class Order
    {
        public int id { get; set; }
        public DateTime creationDate { get; set; }
        public User user { get; set; }
        public int userId { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public string address { get; set; }
        public string zipCode { get; set; }
        public string receiverName { get; set; }
        public string phoneNumber { get; set; }
        public int totalPrice { get; set; }
        public OrderState orderState { get; set; }
        public int orderStateId { get; set; }
        public DateTime paymentTime { get; set; }
        public string orderSecret { get; set; }
        public string PaymentConfirmNumber { get; set; }
        public string describe { get; set; }
    }
}
