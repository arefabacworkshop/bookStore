using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.WebSockets;
using System.Security.Claims;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using BookStoreApi.APIModels;
using BookStoreApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using BC = BCrypt.Net.BCrypt;
namespace BookStoreApi.Services
{
    public class AuthService : IAuthService
    {
        public AppDbContext db { get; set; }
        private IConfiguration config;
        public AuthService(AppDbContext _db, IConfiguration _config )
        {
            db = _db;
            config = _config;
        }
        public  User AuthenticateUser(UserCredentials data)
        {
            User user =  db.users.SingleOrDefault(x => x.userName == data.userName);
            var verify = BC.Verify(data.password, user.password);
            if(verify) return user;
            else return null;
        }

        public string GenerateJWT(User userinfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:SecretKey"]));
            var Credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var role = db.roles.SingleOrDefault(x => x.id == db.users.FirstOrDefault(z => z.id == userinfo.id).roleId);
            var tokenHandler = new JwtSecurityTokenHandler();
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub,userinfo.userName),
                new Claim(ClaimTypes.Name,Convert.ToString(userinfo.id)),
                new Claim(ClaimTypes.Role,role.name),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };
            var token = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(3),
                Audience = config["Jwt:Issuer"],
                Issuer = config["Jwt:Issuer"],
                SigningCredentials = Credentials
            };
            var finaltoken = tokenHandler.CreateToken(token);
            return tokenHandler.WriteToken(finaltoken);
        }
        public int getId(string token)
        {
            if (token.IndexOf("Bearer ") != -1)
                token = token.Remove(0, 7);
            var tokenHandler = new JwtSecurityTokenHandler();
            var securityToken = tokenHandler.ReadToken(token) as JwtSecurityToken;
            var stringClaimValue = securityToken.Claims.Where(x => x.Type == "unique_name").First().Value;
            return Convert.ToInt32(stringClaimValue);

        }
        public List<string> getRoles(string token)
        {
            if(token.IndexOf("Bearer ") != -1)
            token = token.Remove(0, 7);
            var tokenHandler = new JwtSecurityTokenHandler();
            var securityToken = tokenHandler.ReadToken(token) as JwtSecurityToken;
            var stringClaimValue = securityToken.Claims.Where(x => x.Type == "role").ToList();
            List<string> roleList = new List<string>();
            foreach (var a in stringClaimValue)
            {
                roleList.Add(a.Value);

            }

            return roleList;

        }
        private bool RoleCompare(List<string> rolesList, List<string> roles)
        {
            bool validRole = false;
            foreach (var a in roles)
            {
                if (rolesList.FirstOrDefault(x => x == a) != null)
                {
                    validRole = true;
                    break;
                }
            }
            return validRole;
        }
        public bool RoleValidator(string token, List<string> roles)
        {


            if (TokenValidator(token))
            {
                var roleList = getRoles(token);

                if (roles.SingleOrDefault(x => x == "all") != null || RoleCompare(roleList, roles))
                {
                    return true;
                }
                else return false;
            }
            else return false;
        }



        public bool TokenValidator(string token)
        {
            if (token == null) return false;
            var mySecret = "xqTJ^bzABZ%e&C7U32*uzBQ8SdPg3c";
            var mySecurityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(mySecret));
            string finaltoken;
            if (token.IndexOf("Bearer ") != -1) {  finaltoken = token.Remove(0, 7); }
            else {  finaltoken = token; }
            
            //var myIssuer = "http://mysite.com";
            //var myAudience = "http://myaudience.com";

            var tokenHandler = new JwtSecurityTokenHandler();
            try
            {
                tokenHandler.ValidateToken(finaltoken, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    ValidateLifetime = true,
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidIssuer = config["Jwt:Issuer"],
                    ValidAudience = config["Jwt:Issuer"],
                    IssuerSigningKey = mySecurityKey
                }, out SecurityToken validatedToken);
            }
            catch (Exception)
            {
                return false;
            }
            return true;

        }
    }
}