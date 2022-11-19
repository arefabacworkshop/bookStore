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
    public class AddressController : Controller
    {
        public AppDbContext db { get; set; }
        public IAuthService Auth { get; set; }
        public AddressController(AppDbContext _db, IAuthService _Auth)
        {
            db = _db;
            Auth = _Auth;
        }
        [HttpPost]
        public async Task<IActionResult> post(AddressApi ad)
        {
            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "all" }))
            {
                var userId = Auth.getId(HttpContext.Request.Headers["Authorization"]);
                var user = await db.users.SingleOrDefaultAsync(x => x.id == userId);
                if (user == null) return NotFound();
                var newAddress = new Address()
                {
                    receiverName = ad.recieverName,
                    address = ad.address,
                    city = ad.city,
                    state = ad.state,
                    phoneNumber = ad.phoneNumber,
                    zipcode = ad.zipcode,
                };
                await db.addresses.AddAsync(newAddress);
                await db.SaveChangesAsync();
                var user_address = new User_Address()
                {
                    user = await db.users.SingleOrDefaultAsync(x => x.id == userId),
                    userId = userId,
                    address = newAddress,
                    addressId = newAddress.id,
                };
                await db.user_addresses.AddAsync(user_address);
                await db.SaveChangesAsync();

                return Ok(newAddress);


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
                var relatedAddresses = await db.user_addresses.Where(x => x.userId == userId).Select(x => x.address).ToListAsync();
                if (id == null)
                {
                    
                    return Ok(relatedAddresses);
                }
                else
                {
                    
                    var desiredAddress = await db.addresses.SingleOrDefaultAsync(x => x.id == id);
                    var check = relatedAddresses.SingleOrDefault(x => x.id == desiredAddress.id);
                    if(check == null) return NotFound();
                    return Ok(desiredAddress);
                }
            }
            else return Unauthorized();
        }
        // Delete host/address/15051
        [HttpDelete("{id}")]
        public async Task<IActionResult> delete(int id)
        {
            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "all" }))
            {
                var userId = Auth.getId(HttpContext.Request.Headers["Authorization"]);
                var user = await db.users.SingleOrDefaultAsync(x => x.id == userId);
                var address = await db.user_addresses.SingleOrDefaultAsync(x => x.addressId == id && x.userId == userId);
                if (address == null)
                {
                    return NotFound();
                }
                var removeIt = await db.addresses.SingleOrDefaultAsync(x => x.id == address.addressId);
                db.addresses.Remove(removeIt);
                await db.SaveChangesAsync();
                return Ok();
            }
            else return Unauthorized();
        }
        [HttpPatch("{id}")]
        public async Task<IActionResult> patch(int id , AddressApi ad)
        {
            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "all" }))
            {
                var userId = Auth.getId(HttpContext.Request.Headers["Authorization"]);
                var user = await db.users.SingleOrDefaultAsync(x => x.id == userId);
                var user_address = await db.user_addresses.SingleOrDefaultAsync(x => x.addressId == id && x.userId == userId);
                if(user_address == null) return NotFound();
                var address = await db.addresses.SingleOrDefaultAsync(x => x.id == user_address.addressId);
                address.zipcode = ad.zipcode;
                address.address = ad.address;
                address.city = ad.city;
                address.state = ad.state;
                address.receiverName = ad.recieverName;
                address.phoneNumber = ad.phoneNumber;
                db.addresses.Update(address);
                await db.SaveChangesAsync();
                return Ok(address);
            }
            else return Unauthorized();
        }
    }
}
