namespace BookStoreApi.APIModels
{
    public class UpdateUser
    {
       
        
        public string? oldPassword { get; set; }
        public string? newPassword { get; set;}
        public string email { get; set; }
        public string name { get; set; }

        public string phoneNumber { get; set; }
    
        

    }
}
