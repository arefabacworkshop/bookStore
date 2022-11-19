using BookStoreApi.APIModels;
using BookStoreApi.Models;
using BookStoreApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace BookStoreApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AdvertisementController : Controller
    {
        public AppDbContext db { get; set; }
        public IAuthService Auth { get; set; }
        public AdvertisementController(AppDbContext _db, IAuthService _Auth)
        {
            db = _db;
            Auth = _Auth;
        }
        [HttpPost]
        public async Task<IActionResult> post(IFormCollection data, IFormFile file)
        {
            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "admin" }) || Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "customeAdmin" }))
            {
                if (file == null) return BadRequest();
                var path = Path.Combine(
                            Directory.GetCurrentDirectory(), "wwwroot//images//adds",
                            file.FileName);

                using (var stream = new FileStream(path, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
                var advert = new Advertisement()
                {
                    imageLocation = file.FileName,
                    link = data["link"]
                };
                await db.adverts.AddAsync(advert);
                await db.SaveChangesAsync();
                return Ok(advert);
            }
            else return Unauthorized();
            
        }
        [HttpPatch]
        public async Task<IActionResult> patch(UpdateLink link)
        {
            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "admin" }) || Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "customeAdmin" }))
            {
                if (link == null || link.id == null) return BadRequest();
                var oldLink = await db.adverts.SingleOrDefaultAsync(x => x.id == link.id);
                oldLink.link = link.link;
                db.adverts.Update(oldLink);
                await db.SaveChangesAsync();
                return Ok();
            }
            else return Unauthorized();

        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> delete(int id)
        {
            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "admin" }) || Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "customeAdmin" }))
            {
                var toBeRemoved = await db.adverts.SingleOrDefaultAsync(x => x.id == id);
                if (toBeRemoved == null) return BadRequest();
                db.adverts.Remove(toBeRemoved);
                await db.SaveChangesAsync();
                return Ok(toBeRemoved);

            }
            else return Unauthorized();

        }
        [HttpGet("{id?}")]
        public async Task<IActionResult> get(int? id)
        {
            if (id == null)
            {
                var writers = await db.adverts.ToListAsync();
                return Ok(writers);
            }
            else
            {
                var wanted = await db.adverts.SingleOrDefaultAsync(x => x.id == id);
                if (wanted == null) return NotFound();
                return Ok(wanted);
            }
        }
    }
}
