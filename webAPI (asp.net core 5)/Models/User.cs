using Microsoft.AspNetCore.Authentication;
using System;
using System.Collections.Generic;

namespace BookStoreApi.Models
{
    public class User
    {
        public int id { get; set; }
        public string? name { get; set; }
        public string email { get; set; }
        public string userName { get; set; }
        public string password { get; set; }
        public string? phoneNumber { get; set; }
        public Role role { get; set; }
        public int roleId { get; set; }
        public DateTime creationDate { get; set; }


    }
}