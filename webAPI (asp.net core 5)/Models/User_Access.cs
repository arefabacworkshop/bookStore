namespace BookStoreApi.Models
{
    public class User_Access
    {
        public int id { get; set; }
        public User user { get; set; }
        public int userId { get; set; }
        public bool dashboard { get; set; }
        public bool bookManagement { get; set; }
        public bool mainPageManagement { get; set; }
        public bool salesManagement { get; set; }
        public bool userManagement { get; set; }
        public bool CustomePageManagement { get; set; }
        public bool commentManagement { get; set; }
        public bool Settings { get; set; }
    }
}
