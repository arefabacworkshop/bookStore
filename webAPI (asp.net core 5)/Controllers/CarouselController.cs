using BookStoreApi.APIModels;
using BookStoreApi.Models;
using BookStoreApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace BookStoreApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CarouselController : Controller
    {
        public AppDbContext db { get; set; }
        public IAuthService Auth { get; set; }
        public CarouselController(AppDbContext _db, IAuthService _Auth)
        {
            db = _db;
            Auth = _Auth;
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> delete(int id)
        {
            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "admin" }) || Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "customeAdmin" }))
            {
                var toBeRemoved = await db.carousels.SingleOrDefaultAsync(x => x.id == id);
                if (toBeRemoved == null) return BadRequest();
                db.carousels.Remove(toBeRemoved);
                await db.SaveChangesAsync();
                return Ok(toBeRemoved);

            }
            else return Unauthorized();

        }
        [HttpPatch]
        public async Task<IActionResult> patch(UpdateLink link)
        {
            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "admin" }) || Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "customeAdmin" }))
            {
                if (link == null || link.id == null) return BadRequest();
                var oldLink = await db.carousels.SingleOrDefaultAsync(x => x.id == link.id);
                oldLink.link = link.link;
                db.carousels.Update(oldLink);
                await db.SaveChangesAsync();
                return Ok();
            }
            else return Unauthorized();

        }
        [HttpPost]
        public async Task<IActionResult> post(IFormCollection data, IFormFile file)
        {
            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "admin" }) || Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "customeAdmin" }))
            {
                if (file == null) return BadRequest();
                var path = Path.Combine(
                            Directory.GetCurrentDirectory(), "wwwroot//images//carousel",
                            file.FileName);

                using (var stream = new FileStream(path, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
                var carousel = new Carousel()
                {
                    imageLocation = file.FileName,
                    link = data["link"]
                };
                await db.carousels.AddAsync(carousel);
                await db.SaveChangesAsync();
                return Ok(carousel);
            }
            else return Unauthorized();
        }
        [HttpGet("{id?}")]
        public async Task<IActionResult> get(int? id)
        {
            if (id == null)
            {
                var carousel = await db.carousels.ToListAsync();
                return Ok(carousel);
            }
            else
            {
                var wanted = await db.carousels.SingleOrDefaultAsync(x => x.id == id);
                if (wanted == null) return NotFound();
                return Ok(wanted);
            }
        }
    }
}
