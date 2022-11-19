namespace BookStoreApi.Models
{
    public class User_Address
    {
        public int id { get; set; }
        public User user { get; set; }
        public int userId { get; set; }
        public Address address { get; set; }
        public int addressId { get; set; }
    }
}
