using BookStoreApi.Models;
using BookStoreApi.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookStoreApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AdminController : Controller
    {
        public AppDbContext db { get; set; }
        public IAuthService Auth { get; set; }
        public AdminController(AppDbContext _db, IAuthService _Auth)
        {
            db = _db;
            Auth = _Auth;
        }
        [HttpGet("mainPageDetails")]
        public async Task<IActionResult> mainPage()
        {
            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "admin" }) || Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "customeAdmin" }))
            {
                var unconfirmedOrdersCount = (await db.orders.Where(x => x.orderStateId == 2).ToListAsync()).Count;
                var processingOrdersCount = (await db.orders.Where(x=> x.orderStateId == 3).ToListAsync()).Count;
                var sentOrdersCount = (await db.orders.Where(x => x.orderStateId == 4 ).ToListAsync()).Count;
                var existingBooksCount = (await db.books.Where(x => x.countInStorage > 0).ToListAsync()).Count();
                var unexistingBooksCount = (await db.books.Where(x => x.countInStorage == 0).ToListAsync()).Count;
                var allBooksCount = (await db.books.ToListAsync()).Count;
                var commentCount = (await db.comments.ToListAsync()).Count;
                var verifiedCommentCount = (await db.comments.Where(x => x.commentStateId == 1).ToListAsync()).Count;
                var unVerifiedCommentCount = (await db.comments.Where(x => x.commentStateId == 2).ToListAsync()).Count;
                return Ok(new
                {
                    unconfirmedOrdersCount,
                    processingOrdersCount,
                    sentOrdersCount,
                    allBooksCount,
                    existingBooksCount,
                    unexistingBooksCount,
                    commentCount,
                    verifiedCommentCount,
                    unVerifiedCommentCount

                });
            }
            else return Unauthorized();
        }
    }
}
