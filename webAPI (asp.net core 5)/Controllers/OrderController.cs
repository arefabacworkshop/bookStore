using BookStoreApi.APIModels;
using BookStoreApi.Models;
using BookStoreApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookStoreApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrderController : Controller
    {
        public AppDbContext db { get; set; }
        public IAuthService Auth { get; set; }
        private readonly ILogger<OrderController> _logger;
        private readonly IHttpContextAccessor httpContextAccessor;
        public IConfiguration Configuration { get; }
        public OrderController(AppDbContext _db, IAuthService _Auth, ILogger<OrderController> logger , IHttpContextAccessor _httpContextAccessor , IConfiguration config)
        {
            db = _db;
            Auth = _Auth;
            _logger = logger;
            httpContextAccessor = _httpContextAccessor;
            Configuration = config;

        }
        [HttpGet]
        public async Task<IActionResult> get()
        {
            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "admin" }) || Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "customeAdmin" }))
            {
                var orders = await db.orders.ToListAsync();
                var orderList = new List<OrdersList>();
                foreach (var item in orders)
                {
                    var orderDetails = await db.orderDetails.Where(x => x.orderId == item.id).ToListAsync();
                    orderList.Add(new OrdersList()
                    {
                        order = item,
                        orderDetails = orderDetails
                    });
                }
                foreach (var item in orderList)
                {
                    foreach (var i in item.orderDetails)
                    {
                        i.book = await db.books.SingleOrDefaultAsync(x => x.id == i.bookId);
                    }
                }
                foreach (var item in orderList)
                {
                    item.order.user = await db.users.SingleOrDefaultAsync(x => x.id == item.order.userId);
                }
                foreach (var item in orderList)
                {
                    item.order.orderState = await db.orderStates.SingleOrDefaultAsync(x => x.id == item.order.orderStateId);
                }
                return Ok(orderList);
            }
            else if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "all" }))
            {
                var userId = Auth.getId(HttpContext.Request.Headers["Authorization"]);
                var user = await db.users.SingleOrDefaultAsync(x => x.id == userId);
                var orders = await db.orders.Where(x => x.userId == userId).ToListAsync();
                var orderList = new List<OrdersList>();
                foreach (var item in orders)
                {
                    var orderDetails = await db.orderDetails.Where(x => x.orderId == item.id).ToListAsync();
                    orderList.Add(new OrdersList() {
                        order = item,
                        orderDetails = orderDetails
                    });
                }
                foreach (var item in orderList)
                {
                    foreach (var i in item.orderDetails)
                    {
                        i.book = await db.books.SingleOrDefaultAsync(x => x.id == i.bookId);
                    }
                }
                foreach(var item in orderList)
                {
                    item.order.orderState = await db.orderStates.SingleOrDefaultAsync(x => x.id == item.order.orderStateId);
                }
                return Ok(orderList);
            }
            else return Unauthorized();

        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> delete(int id)
        {
            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "admin" }) || Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "customeAdmin" }))
            {
                var toBeRemoved = await db.orders.SingleOrDefaultAsync(x => x.id == id);
                if (toBeRemoved == null) return BadRequest();
                db.orders.Remove(toBeRemoved);
                await db.SaveChangesAsync();
                return Ok(toBeRemoved);

            }
            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "all" }))
            {
                var userId = Auth.getId(HttpContext.Request.Headers["Authorization"]);
                var user = await db.users.SingleOrDefaultAsync(x => x.id == userId);
                var order = await db.orders.SingleOrDefaultAsync(x => x.id == id && x.userId == userId);
                if(order == null) return BadRequest();
                if(order.orderStateId != 1 ) return BadRequest();
                db.orders.Remove(order);
                await db.SaveChangesAsync();
                return Ok();
            }
            else return Unauthorized();

        }
        [HttpPost]
        public async Task<IActionResult> post(int? addressId , List<ShoppingCart> books)
        {

            if(books.Count == 0) return BadRequest();
            if (addressId == null) return BadRequest();
            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "all" }))
            {

                var userId = Auth.getId(HttpContext.Request.Headers["Authorization"]);
                var user = await db.users.SingleOrDefaultAsync(x => x.id == userId);
                var address_user = await db.user_addresses.SingleOrDefaultAsync(x => x.userId == userId && x.addressId == addressId);
                if (address_user == null) return BadRequest();
                var address = await db.addresses.SingleOrDefaultAsync(x => x.id == address_user.addressId);
                int totalPrice = 0;
                foreach (var item in books)
                {
                    var tempPrice = (await db.books.SingleOrDefaultAsync(x => x.id == item.id)).price;
                    if (tempPrice == null) continue;
                    else totalPrice += (int)tempPrice * item.count;
                }
                var newOrder = new Order()
                {
                    creationDate = DateTime.Now,
                    user = user,
                    userId = userId,
                    totalPrice = totalPrice + Convert.ToInt32((await db.settings.SingleOrDefaultAsync(x => x.id == 7)).value),
                    orderState = await db.orderStates.SingleOrDefaultAsync(x => x.id == 1),
                    orderStateId = 1,
                    address = address.address,
                    state = address.state,
                    city = address.city,
                    zipCode = address.zipcode,
                    receiverName = address.receiverName,
                    phoneNumber = address.phoneNumber,

                    
                };
                await db.orders.AddAsync(newOrder);
                await db.SaveChangesAsync();
                foreach (var item in books)
                {
                    var newDetail = new OrderDetails()
                    {
                        orderId = newOrder.id,
                        order = newOrder,
                        book = await db.books.SingleOrDefaultAsync(x => x.id == item.id),
                        bookId = item.id,
                        count = item.count
                    };
                    await db.orderDetails.AddAsync(newDetail);
                    await db.SaveChangesAsync();
                }
                //payment code
                string authority;
                string description = "خرید تستی ";
                string merchant = (await db.settings.SingleOrDefaultAsync(x => x.id == 6)).value;
                string host = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host;
                var price = newOrder.totalPrice;
                string callbackurl =  host + "/order/VerifyPayment/" + newOrder.id;
                try
                {
                    
                    var payment = await new Zarinpal.Payment(merchant,price).PaymentRequestWithExtra("عنوان", "555555555", callbackurl);
                    if (payment.Status == 100)
                    {
                        return Ok(payment.Link);
                    }
                    else
                    {
                        //return errorPage;
                        return Redirect(Configuration["clientAddress"] + "/badPayment");
                    }
                }

                catch (Exception ex)
                {
                    return BadRequest(ex.Message);


                }
                return Ok();
        } else return Unauthorized();

            
        }
        [HttpGet("paytheprice/{id}")]
        public async Task<IActionResult> payThePrice(int id)
        {
            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "all" }))
            {
                var userId = Auth.getId(HttpContext.Request.Headers["Authorization"]);
                var user = await db.users.SingleOrDefaultAsync(x => x.id == userId);
                var order = await db.orders.SingleOrDefaultAsync(x => x.id == id && x.userId == userId);
                if (order == null) return BadRequest();
                //payment stuff
                string authority;
                string description = "خرید تستی ";
                string merchant = (await db.settings.SingleOrDefaultAsync(x => x.id == 6)).value;
                string host = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host;
                var price = order.totalPrice;
                string callbackurl = host + "/order/VerifyPayment/" + order.id;
                try
                {
                   
                    var payment = await new Zarinpal.Payment(merchant,price).PaymentRequestWithExtra("عنوان", "555555555", callbackurl);
                    if (payment.Status == 100)
                    {
                        return Ok(payment.Link);
                    }
                    else
                    {
                        //return errorPage;
                        return Redirect(Configuration["clientAddress"] + "/badPayment");
                    }
                }

                catch (Exception ex)
                {
                    return BadRequest(ex.Message);


                }
                return Ok();
            }
            return Unauthorized();
        }
        [HttpGet("[action]/{id}")]
        public async Task<IActionResult> VerifyPayment(int id, string Authority)
        {

            // string authorityverify;

            try
            {
                var price = (await db.orders.SingleOrDefaultAsync(x => x.id == id)).totalPrice;
                if (price == Convert.ToInt32((await db.settings.SingleOrDefaultAsync(x => x.id == 7)).value)) return BadRequest();
                string merchant = (await db.settings.SingleOrDefaultAsync(x => x.id == 6)).value;
                string host = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host;
                string authority = HttpContext.Request.Query["Authority"];
                var verification = await new Zarinpal.Payment(merchant , price).Verification(Authority);
                if (verification.Status == 100)
                {
                    var order = await db.orders.SingleOrDefaultAsync(x => x.id == id);
                    order.orderStateId = 2;
                    order.orderState = await db.orderStates.SingleOrDefaultAsync(x => x.id == 2);
                    order.PaymentConfirmNumber = Convert.ToString(verification.RefId);
                    order.paymentTime = DateTime.Now;
                    db.orders.Update(order);
                    await db.SaveChangesAsync();
                    return Redirect(Configuration["clientAddress"] + "/successfulPayment");
                }
                else
                return Redirect(Configuration["clientAddress"] + "/badPayment");

            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
            return NotFound();
        }
        [HttpGet ("unconfirmedOrders/{id?}")]
        public async Task<IActionResult> unconfirmedOrders(int? id)
        {
            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "admin" }) || Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "customeAdmin" }))
            {
                if(id == null) {
                    var Orders = await db.orders.Where(x => x.orderStateId == 2).ToListAsync();
                    foreach (var Order in Orders)
                    {
                        Order.user = await db.users.SingleOrDefaultAsync(x => x.id == Order.userId);
                        Order.orderState = await db.orderStates.SingleOrDefaultAsync(x => x.id == Order.orderStateId);
                    }
                    return Ok(Orders);
                }
                    else
                {
                    var order = await db.orders.SingleOrDefaultAsync(x => x.id == id);
                    var orderDetails = await db.orderDetails.Where(x => x.orderId == id).ToListAsync();
                    order.user = await db.users.SingleOrDefaultAsync(x => x.id == order.userId);
                    foreach(var item in orderDetails)
                    {
                        item.book = await db.books.SingleOrDefaultAsync(x => x.id == item.bookId);
                    }
                    return Ok(new {order , orderDetails});
                }
                
            }
            else return Unauthorized();
                
        }
        [HttpGet("proccessingOrders/{id?}")]
        public async Task<IActionResult> processingOrders(int? id)
        {
            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "admin" }) || Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "customeAdmin" }))
            {
                if (id == null) {
                    var Orders = await db.orders.Where(x => x.orderStateId == 3).ToListAsync();
                    foreach(var item in Orders)
                    {
                        item.user = await db.users.SingleOrDefaultAsync(x => x.id == item.userId);
                    }
                    return Ok(Orders);
                }
                else
                {
                    var order = await db.orders.SingleOrDefaultAsync(x => x.id == id);
                    order.user = await db.users.SingleOrDefaultAsync(x => x.id == order.userId);
                    
                    
                    return Ok(order);
                }
                
            }
            else return Unauthorized();

        }
        [HttpGet("sentOrders/{id?}")]
        public async Task<IActionResult> sentOrders(int? id)
        {
            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "admin" }) || Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "customeAdmin" }))
            {
                if (id == null)
                {
                    var Orders = await db.orders.Where(x => x.orderStateId == 4).ToListAsync();
                    foreach(var item in Orders)
                    {
                        item.user = await db.users.SingleOrDefaultAsync(x => x.id == item.userId);
                    }
                    return Ok(Orders);
                }
                else
                {
                    var order = await db.orders.SingleOrDefaultAsync(x => x.id == id);
                    return Ok(order);
                }
            }
            else return Unauthorized();

        }
        [HttpPatch("confirmOrder/{id}")]
        public async Task<IActionResult> unconfirmedOrders(int id)
        {
            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "admin" }) || Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "customeAdmin" }))
            {
                var order = await db.orders.SingleOrDefaultAsync(x => x.id == id);
                order.orderStateId = 3;
                order.orderState = await db.orderStates.SingleOrDefaultAsync(x => x.id == 3);
                db.Update(order);
                await db.SaveChangesAsync();
                return Ok();
            }
            else return Unauthorized();

        }
        [HttpPatch("orderSent")]
        public async Task<IActionResult> unconfirmedOrders(OrderSent os)
        {
            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "admin" }) || Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "customeAdmin" }))
            {
                var order = await db.orders.SingleOrDefaultAsync(x => x.id == os.id);
                order.orderStateId = 4;
                order.orderState = await db.orderStates.SingleOrDefaultAsync(x => x.id == order.orderStateId);
                order.describe = os.describe;
                db.Update(order);
                await db.SaveChangesAsync();
                return Ok();
            }
            else return Unauthorized();

        }
        [HttpGet ("getOrderDetails/{id}")]
        public async Task<IActionResult> getOrderDetails (int id)
        {
            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "admin" }) || Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "customeAdmin" }))
            {
              
                var order = await db.orders.SingleOrDefaultAsync(x => x.id == id);
                if (order == null) return BadRequest();
                var booksList = await db.orderDetails.Where(x => x.orderId == order.id).ToListAsync();
                foreach(var book in booksList)
                {
                    book.book = await db.books.SingleOrDefaultAsync(x => x.id == book.bookId);
                    
                }

                return Ok(new
                {
                    order ,
                    booksList
                });
            }
            else return Unauthorized();
        }
        [HttpDelete("deletOrder/{id}")]
        public async Task<IActionResult> deleteOrder (int id)
        {
            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "all" }))
            {
                var userId = Auth.getId(HttpContext.Request.Headers["Authorization"]);
                var user = await db.users.SingleOrDefaultAsync(x => x.id == userId);
                var order = await db.orders.SingleOrDefaultAsync(x => x.id == id &&  x.userId == userId);
                if (order == null) return NotFound();
                if(order.orderStateId != 1) return BadRequest();
                db.orders.Remove(order);
                await db.SaveChangesAsync();
                return Ok(order);
            }
            else return Unauthorized();
        }
        [HttpGet("payTheOrder/{id}")]
        public async Task<IActionResult> payTheOrder(int id)
        {
            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "all" }))
            {
            var userId = Auth.getId(HttpContext.Request.Headers["Authorization"]);
            var user = await db.users.SingleOrDefaultAsync(x => x.id == userId);
            string merchant = (await db.settings.SingleOrDefaultAsync(x => x.id == 6)).value;
            string host = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host;
            var order = await db.orders.SingleOrDefaultAsync(x => x.id == id && x.userId == userId);
            if(order == null) return NotFound();
            var price = order.totalPrice + Convert.ToInt32((await db.settings.SingleOrDefaultAsync(x => x.id == 7)).value);
            string callbackurl = host + "/order/VerifyPayment/" + order.id;
            try
            {
                var payment = await new ZarinpalSandbox.Payment(price).PaymentRequestWithExtra("عنوان", "555555555", callbackurl);
                if (payment.Status == 100)
                {
                    return Ok(payment.Link);
                }
                else
                {
                    //return errorPage;
                    return Redirect(Configuration["clientAddress"] + "/badPayment");
                }
            }

            catch (Exception ex)
            {
                return BadRequest(ex.Message);


            }
            return Ok();
        } else return Unauthorized();
        
        }

    }
}
