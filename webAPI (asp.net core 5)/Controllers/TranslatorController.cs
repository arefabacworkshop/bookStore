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
    public class TranslatorController : Controller
    {
        public AppDbContext db { get; set; }
        public IAuthService Auth { get; set; }
        public TranslatorController(AppDbContext _db, IAuthService _Auth)
        {
            db = _db;
            Auth = _Auth;
        }
        [HttpPost("{name}")]
        public async Task<IActionResult> post(string name)
        {

            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "admin" }) || Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "customeAdmin" }))
            {
                var translator = new Translator() { name = name };
                await db.translators.AddAsync(translator);
                await db.SaveChangesAsync();
                return Ok(translator);
            }
            else return Unauthorized();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> delete(int id)
        {
            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "admin" }) || Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "customeAdmin" }))
            {
                var toBeRemoved = await db.translators.SingleOrDefaultAsync(x => x.id == id);
                if (toBeRemoved == null) return BadRequest();
                db.translators.Remove(toBeRemoved);
                await db.SaveChangesAsync();
                return Ok(toBeRemoved);

            }
            else return Unauthorized();

        }
        [HttpPatch]
        public async Task<IActionResult> post(Translator t)
        {

            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "admin" }) || Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "customeAdmin" }))
            {
                db.translators.Update(t);
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
                var writers = await db.translators.ToListAsync();
                return Ok(writers);
            }
            else
            {
                var wanted = await db.translators.SingleOrDefaultAsync(x => x.id == id);
                if (wanted == null) return NotFound();
                return Ok(wanted);
            }
        }
    }
}
