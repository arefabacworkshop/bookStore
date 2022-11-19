using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using BookStoreApi.APIModels;
using BookStoreApi.Models;
using BookStoreApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using BC = BCrypt.Net.BCrypt;
namespace BookStoreApi.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class AuthController : ControllerBase
    {
        private readonly IConfiguration config;
        public AppDbContext db { get; set; }

        private IAuthService Auth { get; set; }

        public AuthController(IConfiguration configuration, AppDbContext database, IAuthService _Auth)
        {
            config = configuration;

            Auth = _Auth;
            db = database;
        }

        [HttpPost]
        [Route("login")]
        public IActionResult Login(UserCredentials data)
        {

            if (data != null && data.userName != null && data.password != null)
            {
                IActionResult response = Unauthorized();
                User user = Auth.AuthenticateUser(data);
                if (user != null)
                {
                    var tokenString = Auth.GenerateJWT(user);
                    response = Ok(new
                    {
                        token = tokenString,
                        userDetails = user
                    });
                }
                return response;
            }
            return BadRequest();
        }
        [HttpPost("signup")]
        public async Task<IActionResult> signup(SignUp su)
        {
            if (su != null && su.userName != null && su.password != null && su.email != null)
            {

                if ((await db.users.SingleOrDefaultAsync(x => x.userName == su.userName)) != null || (await db.users.SingleOrDefaultAsync(x => x.email == su.email) != null))
                {
                    return BadRequest("user Already Exists");
                }
                var newUser = new User()
                {
                    email = su.email,
                    password = BC.HashPassword(su.password),
                    userName = su.userName,
                    role = await db.roles.SingleOrDefaultAsync(x => x.name == "user"),
                    roleId = (await db.roles.SingleOrDefaultAsync(x => x.name == "user")).id,
                    creationDate = DateTime.Now,

                };
                await db.users.AddAsync(newUser);
                await db.SaveChangesAsync();
                var data = new UserCredentials()
                {
                    password = su.password,
                    userName = su.userName
                };
                IActionResult response = Unauthorized();
                User user = Auth.AuthenticateUser(data);
                if (user != null)
                {
                    var tokenString = Auth.GenerateJWT(user);
                    response = Ok(new
                    {
                        token = tokenString,
                        userDetails = user
                    });
                }
                return Ok(response);
            }
            else return Unauthorized();
        }
        [HttpGet("validation")]
        public async Task<IActionResult> validation()

        {
            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "all" }))
            {
                var userId = Auth.getId(HttpContext.Request.Headers["Authorization"]);
                var user = await db.users.SingleOrDefaultAsync(x => x.id == userId);
                return Ok(user);
            }
            else return Unauthorized();
        }
    }
}