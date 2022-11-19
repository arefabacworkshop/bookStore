using BookStoreApi.APIModels;
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
    public class CommentController : Controller
    {
        public AppDbContext db { get; set; }
        public IAuthService Auth { get; set; }
        public CommentController(AppDbContext _db, IAuthService _Auth)
        {
            db = _db;
            Auth = _Auth;
        }
        [HttpPost]
        public async Task<IActionResult> post(PostComment pc)
        {
            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "all" }))
            {
                var commentUserId = Auth.getId(HttpContext.Request.Headers["Authorization"]);
                var commentUser = await db.users.SingleOrDefaultAsync(x => x.id == commentUserId);
                var newComment = new Comment()
                {
                    text = pc.text,
                    bookId = pc.bookId,
                    book = await db.books.SingleOrDefaultAsync(x => x.id == pc.bookId),
                    user = commentUser,
                    userId = commentUserId,
                    commentState = await db.commentState.SingleOrDefaultAsync(x => x.id == 2),
                    commentStateId = 2
                };
                await db.comments.AddAsync(newComment);
                await db.SaveChangesAsync();
                return Ok(newComment);
            }
            else return Unauthorized();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> delete(int id)
        {
            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "admin" }) || Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "customeAdmin" }))
            {
                var comment = await db.comments.SingleOrDefaultAsync(x => x.id == id);
                db.Remove(comment);
                await db.SaveChangesAsync();
                return Ok(comment);
            }
            else return Unauthorized();
        }
        [HttpGet("{bookId?}")]
        public async Task<IActionResult> get(int? bookId)
        {
            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "admin" }) || Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "customeAdmin" }))
            {

                if (bookId != null)
                {
                    var bookComments = await db.comments.Where(x => x.bookId == bookId).ToListAsync();
                    return Ok(bookComments);

                }
                else
                {
                    var bookComments = await db.comments.ToListAsync();
                    foreach (var comment in bookComments)
                    {
                        comment.book = await db.books.SingleOrDefaultAsync(x => x.id == comment.bookId);
                    }
                    return Ok(bookComments);
                }

            }
            else
            {
                if (bookId != null)
                {
                    var list = new List<object>();
                    var bookComments = await db.comments.Where(x => x.bookId == bookId && x.commentStateId == 1).ToListAsync();
                    foreach (var a in bookComments)
                    {
                        a.user = await db.users.SingleOrDefaultAsync(x => x.id == a.userId);
                    }
                    foreach (var comment in bookComments)
                    {
                        list.Add(new
                        {
                            name = comment.user.name,
                            text = comment.text
                        });
                    }
                    return Ok(list);
                }
                else return BadRequest();
            }
        }
        [HttpPatch("/confirm/{id}")]
        public async Task<IActionResult> confirm(int id)
        {
            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "admin" }) || Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "customeAdmin" }))
            {
                var comment = await db.comments.SingleOrDefaultAsync(x => x.id == id);
                if(comment == null)return NotFound();
                if (comment.commentStateId == 1) return BadRequest();
                comment.commentStateId = 1;
                comment.commentState = await db.commentState.SingleOrDefaultAsync(x => x.id == 1);
                db.comments.Update(comment);
                await db.SaveChangesAsync();
                return Ok(comment);
            }
            else return Unauthorized();
        }
    }

}


