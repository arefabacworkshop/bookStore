using BookStoreApi.APIModels;
using BookStoreApi.Models;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BookStoreApi.Services
{
    public interface IAuthService
    {
        public User AuthenticateUser(UserCredentials data);
        public string GenerateJWT(User userinfo);
        public bool TokenValidator(string token);
        public bool RoleValidator(string token, List<string> role);
        public int getId(string token);
        public List<string> getRoles(string token);
        public AppDbContext db { get; set; }



    }
}