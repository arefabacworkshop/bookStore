using BookStoreApi.Models;

namespace BookStoreApi.APIModels
{
    public class UpdateUserAdmin
    {
        public string? oldPassword { get; set; }
        public string? newPassword { get; set; }
        public string? userName { get; set; }
        public string email { get; set; }
        public string name { get; set; }
        
        public string phoneNumber { get; set; }
        
        public int roleId { get; set; }
        public UserAccess? userAccess { get; set; }
    }
}
