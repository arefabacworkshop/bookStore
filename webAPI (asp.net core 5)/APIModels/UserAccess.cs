namespace BookStoreApi.APIModels
{
    public class UserAccess
    {
        public bool dashboard { get; set; }
        public bool bookManagement { get; set; }
        public bool mainPageManagement { get; set; }
        public bool salesManagement { get; set; }
        public bool CustomePageManagement { get; set; }
        public bool commentManagement { get; set; }
        public bool Settings { get; set; }
    }
}
