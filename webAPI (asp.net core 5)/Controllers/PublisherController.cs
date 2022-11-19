using BookStoreApi.Models;
using BookStoreApi.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BookStoreApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PublisherController : Controller
    {
        public AppDbContext db { get; set; }
        public IAuthService Auth { get; set; }
        public PublisherController(AppDbContext _db, IAuthService _Auth)
        {
            db = _db;
            Auth = _Auth;
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> delete(int id)
        {
            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "admin" }) || Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "customeAdmin" }))
            {
                var toBeRemoved = await db.publishers.SingleOrDefaultAsync(x => x.id == id);
                if (toBeRemoved == null) return BadRequest();
                db.publishers.Remove(toBeRemoved);
                await db.SaveChangesAsync();
                return Ok(toBeRemoved);

            }
            else return Unauthorized();

        }
        [HttpPost("{name}")]
        public async Task<IActionResult> post(string name)
        {

            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "admin" }) || Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "customeAdmin" }))
            {
                var publisher = new Publisher() { name = name };
                await db.publishers.AddAsync(publisher);
                await db.SaveChangesAsync();
                return Ok(publisher);
            }
            else return Unauthorized();
        }
        [HttpPatch]
        public async Task<IActionResult> post(Publisher p)
        {

            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "admin" }) || Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "customeAdmin" }))
            {
                db.publishers.Update(p);
                await db.SaveChangesAsync();
                return Ok();
            }
            else return Unauthorized();
        }
        [HttpGet("{id?}")]
        public async Task<IActionResult> get(int? id)
        {
            if (id == null)
            {
                var writers = await db.publishers.ToListAsync();
                return Ok(writers);
            }
            else
            {
                var wanted = await db.publishers.SingleOrDefaultAsync(x => x.id == id);
                if (wanted == null) return NotFound();
                return Ok(wanted);
            }
        }
    }
}
