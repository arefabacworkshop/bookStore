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
    public class LikeController : Controller
    {
        public AppDbContext db { get; set; }
        public IAuthService Auth { get; set; }
        public LikeController(AppDbContext _db, IAuthService _Auth)
        {
            db = _db;
            Auth = _Auth;
        }
        [HttpPost("{id}")]
        public async Task<IActionResult> Post(int id)
        {
            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "all" }))
            {
                var userId = Auth.getId(HttpContext.Request.Headers["Authorization"]);
                var user = await db.users.SingleOrDefaultAsync(x => x.id == userId);
                var book = await db.books.SingleOrDefaultAsync(x => x.id == id);
                if (await db.likedBooks.SingleOrDefaultAsync(x => x.BookId == id && x.userId == userId) != null) return BadRequest();
                var newLikedBook = new LikedBook()
                {
                    Book = book,
                    BookId = book.id,
                    user = user,
                    userId = userId
                };
                await db.likedBooks.AddAsync(newLikedBook);
                await db.SaveChangesAsync();
                return Ok();
            }
            else return Unauthorized();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "all" }))
            {
                var userId = Auth.getId(HttpContext.Request.Headers["Authorization"]);
                var user = await db.users.SingleOrDefaultAsync(x => x.id == userId);
                var like = await db.likedBooks.SingleOrDefaultAsync(x => x.BookId == id && x.userId == user.id);
                if (like == null) return NotFound();
                db.likedBooks.Remove(like);
                await db.SaveChangesAsync();
                return Ok();
            }
            else return Unauthorized();
        }
        [HttpGet("{id?}")]
        public async Task<IActionResult> get(int? id)
        {
            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "all" }))
            {
                var userId = Auth.getId(HttpContext.Request.Headers["Authorization"]);
                var user = await db.users.SingleOrDefaultAsync(x => x.id == userId);
                if (id == null)
                {
                    var likedBooks = await db.likedBooks.Where(x => x.userId == userId).ToListAsync();
                    if (likedBooks.Count == 0) return NotFound();
                    foreach (var like in likedBooks)
                    {
                        like.Book = await db.books.SingleOrDefaultAsync(x => x.id == like.BookId);
                    }
                    return Ok(likedBooks);
                }
                else
                {
                    var likeBook = await db.likedBooks.SingleOrDefaultAsync(x => x.BookId == id && x.userId == user.id);
                    if(likeBook == null) return NotFound();
                    return Ok(likeBook);
                }
            }
            else return Unauthorized();
        }
    }
}
