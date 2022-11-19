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
    public class WriterController : Controller
    {
        public AppDbContext db { get; set; }
        public IAuthService Auth { get; set; }
        public WriterController(AppDbContext _db, IAuthService _Auth)
        {
            db = _db;
            Auth = _Auth;
        }
        [HttpPost("{name}")]
        public async Task<IActionResult> post(string name)
        {

            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "admin" }) || Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "customeAdmin" }))
            {
                var writer = new Writer() { name = name };
                await db.writers.AddAsync(writer);
                await db.SaveChangesAsync();
                return Ok(writer);
            }
            else return Unauthorized();
        }
        [HttpPatch]
        public async Task<IActionResult> post(Writer w)
        {

            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "admin" }) || Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "customeAdmin" }))
            {
                db.writers.Update(w);
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
                var writers = await db.writers.ToListAsync();
                return Ok(writers);
            }
            else
            {
                var wanted = await db.writers.SingleOrDefaultAsync(x => x.id == id);
                if (wanted == null) return NotFound();
                return Ok(wanted);
            }
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> delete(int id)
        {
            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "admin" }) || Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "customeAdmin" }))
            {
                var toBeRemoved = await db.writers.SingleOrDefaultAsync(x => x.id == id);
                if (toBeRemoved == null) return BadRequest();
                db.writers.Remove(toBeRemoved);
                await db.SaveChangesAsync();
                return Ok(toBeRemoved);

            }
            else return Unauthorized();

        }
    }
}
