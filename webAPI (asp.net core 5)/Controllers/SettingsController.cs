using BookStoreApi.APIModels;
using BookStoreApi.Models;
using BookStoreApi.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BookStoreApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class SettingsController : Controller
    {
        public AppDbContext db { get; set; }
        public IAuthService Auth { get; set; }
        public SettingsController(AppDbContext _db, IAuthService _Auth)
        {
            db = _db;
            Auth = _Auth;
        }
        [HttpGet]
        public async Task<IActionResult> get()
        {
            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "admin" }) || Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "customeAdmin" }))
            {
                var settings = await db.settings.ToListAsync();
                return Ok(new
                {
                    pageDataCount = settings[0],
                    aboutUs = settings[1],
                    contactUs = settings[2],
                    etemad = settings[3],
                    samandehi = settings[4],
                    merchantId = settings[5],
                    postPrice = settings[6],
                });
            } else
            {
                var settings = await db.settings.ToListAsync();
                var validSend = new {
                    pageDataCount = settings[0],
                    aboutUs = settings[1],
                    contactUs = settings[2],
                    etemad = settings[3],
                    samandehi = settings[4],
                    postPrice = settings[6],
                };
                return Ok(validSend);
            }

        }
        [HttpPatch]
        public async Task<IActionResult> patch(SettingsApi sa)
        {
            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "admin" }) || Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "customeAdmin" }))
            {
                var settings = await db.settings.ToListAsync();
                settings[0].value = sa.pageDataCount;
                settings[1].value = sa.aboutUs;
                settings[2].value = sa.contactUs;
                settings[3].value = sa.etemad;
                settings[4].value = sa.samandehi;
                settings[5].value = sa.merchantId;
                settings[6].value = sa.postPrice;
                db.settings.UpdateRange(settings);
                await db.SaveChangesAsync();
                return Ok(new
                {
                    pageDataCount = settings[0],
                    aboutUs = settings[1],
                    contactUs = settings[2],
                    etemad = settings[3],
                    samandehi = settings[4],
                    merchantId = settings[5],
                    postPrice = settings[6],
                });
            }
            else return Unauthorized();
            }
    }
}
