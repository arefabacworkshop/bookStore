using BookStoreApi.APIModels;
using BookStoreApi.Models;
using BookStoreApi.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BC = BCrypt.Net.BCrypt;

namespace BookStoreApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        public AppDbContext db { get; set; }
        public IAuthService Auth { get; set; }
        public UserController(AppDbContext _db, IAuthService _Auth)
        {
            db = _db;
            Auth = _Auth;
        }
        [HttpGet("{id?}")]
        public async Task<IActionResult> get(int? id)
        {
            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "admin" }) )
            {
                if (id == null)
                    return Ok(await db.users.ToListAsync());
                else
                {
                    if(id == 0) {
                        var userId = Auth.getId(HttpContext.Request.Headers["Authorization"]);
                        var user = await db.users.SingleOrDefaultAsync(x => x.id == userId);
                        return Ok(new { user = user });
                    }
                    else
                    return Ok(new
                    {
                        user = await db.users.SingleOrDefaultAsync(x => x.id == id),
                        userAccess = await db.user_access.SingleOrDefaultAsync(x => x.userId == id),
                    });
                }
            }
            else if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "all" }))
            {
                var userId = Auth.getId(HttpContext.Request.Headers["Authorization"]);
                var user = await db.users.SingleOrDefaultAsync(x => x.id == userId);
                var Orders = await db.orders.Where(x => x.userId == userId).ToListAsync();
                var books = new List<Book>();
                List<OrderDetails> orderDetails;
                foreach (var order in Orders)
                {
                    orderDetails = await db.orderDetails.Where(x => x.orderId == order.id).ToListAsync();
                    foreach (var item in orderDetails) item.book = await db.books.SingleOrDefaultAsync(x => x.id == item.bookId);
                    books.AddRange(orderDetails.Select(x => x.book).ToList());
                }
                books = books.DistinctBy(x => x.id).ToList();
                var unconfirmedOrdersCount = (await db.orders.Where(x => x.userId == userId && x.orderStateId == 2).ToListAsync()).Count;
                var processingOrdersCount = (await db.orders.Where(x => x.userId == userId && x.orderStateId == 3).ToListAsync()).Count;
                var sentOrdersCount = (await db.orders.Where(x => x.userId == userId && x.orderStateId == 4).ToListAsync()).Count;
                var userAccess = await db.user_access.SingleOrDefaultAsync(x => x.userId == userId);
                return Ok(new
                {
                    user,
                    date = user.creationDate.ToString("dd/MM/yyyy"),
                    books,
                    unconfirmedOrdersCount,
                    processingOrdersCount,
                    sentOrdersCount,
                    userAccess,
                });
            }
            else return Unauthorized();

        }
        [HttpPatch("admin/{id}")]
        public async Task<IActionResult> patch(int id ,UpdateUserAdmin user)
        {
            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "admin" }) || Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "customeAdmin" }))
            {
                if (id == null) return BadRequest();
                var updatedUser = await db.users.SingleOrDefaultAsync(x => x.id == id);
                if (updatedUser == null) return BadRequest();
                updatedUser.name = user.name;
                updatedUser.userName = user.userName;
                updatedUser.password = BC.HashPassword(user.newPassword);
                updatedUser.email = user.email;
                updatedUser.roleId = user.roleId;

                updatedUser.phoneNumber = user.phoneNumber;
                updatedUser.role = await db.roles.SingleOrDefaultAsync(x => x.id == user.roleId);
                db.users.Update(updatedUser);
                await db.SaveChangesAsync();
                return Ok(updatedUser);

            }
            return Unauthorized();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> delete(int id)
        {
            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "admin" }) || Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "customeAdmin" }))
            {
                var toBeRemoved = await db.users.SingleOrDefaultAsync(x => x.id == id);
                if (toBeRemoved == null) return BadRequest();
                db.users.Remove(toBeRemoved);
                await db.SaveChangesAsync();
                var userAccess = await db.user_access.SingleOrDefaultAsync(x => x.userId == toBeRemoved.id);
                if (userAccess != null)
                {
                    db.user_access.Remove(userAccess);
                    await db.SaveChangesAsync();
                }
                return Ok(toBeRemoved);

            }
            else return Unauthorized();

        }
        [HttpPatch]
        public async Task<IActionResult> patch(UpdateUser data)
        {
            if (data == null) return BadRequest();

            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "all" }))
            {
                var userId = Auth.getId(HttpContext.Request.Headers["Authorization"]);
                var user = await db.users.SingleOrDefaultAsync(x => x.id == userId);
                if (data.newPassword != null && !BC.Verify(data.oldPassword , user.password)) return BadRequest("پسورد قدیمی صحیح نمی باشد.");
                if (data.newPassword != null && BC.Verify(data.oldPassword, user.password))
                {
                    user.password = BC.HashPassword(data.newPassword);
                    user.name = data.name;
                    user.email = data.email;
                    user.phoneNumber = data.phoneNumber;
                    db.users.Update(user);
                    await db.SaveChangesAsync();
                }
                else
                {
                    user.name = data.name;
                    user.email = data.email;
                    user.phoneNumber = data.phoneNumber;
                    db.users.Update(user);
                    await db.SaveChangesAsync();
                }
                return Ok(user);

            }
            else return Unauthorized();
        }
        [HttpPatch("{id}")]
        public async Task<IActionResult> mainPatch(int id, UpdateUserAdmin data)
            {
            if (id == null || id == 0) return BadRequest();
            if (data == null) return BadRequest();
            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "admin" }) )
            {

                var user = await db.users.SingleOrDefaultAsync(x => x.id == id);
                
                if (data.newPassword != null && data.newPassword != "")
                {
                    if(user.roleId == 3 && data.roleId != 3)
                    {
                        var oldUserAccess = await db.user_access.SingleOrDefaultAsync(x => x.userId == user.id);
                        if(oldUserAccess != null)
                        {
                            db.user_access.Remove(oldUserAccess);
                            await db.SaveChangesAsync();
                        }
                    }
                    user.password = BC.HashPassword(data.newPassword);
                    user.name = data.name;
                    user.email = data.email;
                    user.phoneNumber = data.phoneNumber;
                    user.roleId = data.roleId;
                    user.role = await db.roles.SingleOrDefaultAsync(x => x.id == data.roleId);
                    db.users.Update(user);
                    await db.SaveChangesAsync();

                }
                else
                {
                    if (user.roleId == 3 && data.roleId != 3)
                    {
                        var oldUserAccess = await db.user_access.SingleOrDefaultAsync(x => x.userId == user.id);
                        if (oldUserAccess != null)
                        {
                            db.user_access.Remove(oldUserAccess);
                            await db.SaveChangesAsync();
                        }
                    }
                    user.name = data.name;
                    user.email = data.email;
                    user.phoneNumber = data.phoneNumber;
                    user.roleId = data.roleId;
                    user.role = await db.roles.SingleOrDefaultAsync(x => x.id == data.roleId);
                    db.users.Update(user);
                    await db.SaveChangesAsync();
                }
                if (data.roleId == 3)
                {
                    var oldUserAccess = await db.user_access.SingleOrDefaultAsync(x=> x.userId == user.id);
                    if(oldUserAccess != null)
                    {
                        db.user_access.Remove(oldUserAccess);
                        await db.SaveChangesAsync();
                    }
                    var userAccess = new User_Access()
                    {
                        userId = user.id,
                        user = await db.users.SingleOrDefaultAsync(x => x.id == user.id),
                        bookManagement = data.userAccess.bookManagement,
                        userManagement = false,
                        mainPageManagement = data.userAccess.mainPageManagement,
                        salesManagement = data.userAccess.salesManagement,
                        CustomePageManagement = data.userAccess.CustomePageManagement,
                        commentManagement = data.userAccess.commentManagement,
                        Settings = data.userAccess.Settings,
                        dashboard = data.userAccess.dashboard
                    };
                    await db.user_access.AddAsync(userAccess);
                    await db.SaveChangesAsync();
                }
                return Ok(user);

            }
            else return Unauthorized();
        }
        [HttpPost]
        public async Task<IActionResult> post(UpdateUserAdmin data)
        {
            if (data == null) return BadRequest();
            if (data.newPassword == null) return BadRequest();
            var user = new User();
            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "admin" }) || Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "customeAdmin" }))
            {
                user.password = BC.HashPassword(data.newPassword);
                user.userName = data.userName;
                user.name = data.name;
                user.email = data.email;

                user.phoneNumber = data.phoneNumber;
                user.roleId = data.roleId;
                user.role = await db.roles.SingleOrDefaultAsync(x => x.id == data.roleId);
                await db.users.AddAsync(user);
                await db.SaveChangesAsync();
                if(data.roleId == 3)
                {
                    var userAccess = new User_Access() { 
                    userId = user.id,
                    user = await db.users.SingleOrDefaultAsync(x => x.id == user.id),
                    bookManagement  = data.userAccess.bookManagement,
                    userManagement = false,
                    mainPageManagement = data.userAccess.mainPageManagement,
                    salesManagement = data.userAccess.salesManagement,
                    CustomePageManagement = data.userAccess.CustomePageManagement,
                    commentManagement = data.userAccess.commentManagement,
                    Settings = data.userAccess.Settings,
                    dashboard = data.userAccess.dashboard,
                    };
                    await db.user_access.AddAsync(userAccess);
                    await db.SaveChangesAsync();
                }
                return Ok();
            }
            else return Unauthorized();
        }
        [HttpPost("postDetails")]
        public async Task<IActionResult> postDetails(PostDetails pd)
        {
            if (pd == null) return BadRequest();
            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "all" }))
            {
                var userId = Auth.getId(HttpContext.Request.Headers["Authorization"]);
                var user = await db.users.SingleOrDefaultAsync(x => x.id == userId);
                if (pd.name != null) user.name = pd.name;

                if (pd.phoneNumber != null) user.phoneNumber = pd.phoneNumber;

                db.users.Update(user);
                await db.SaveChangesAsync();
                return Ok(user);
            }
            return Ok();
        }
    }
}
