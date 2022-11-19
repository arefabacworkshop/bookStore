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
    public class Likes
    {
        public Book book { get; set; }
        public int likes { get; set; }
    }
    [ApiController]
    [Route("[controller]")]
    public class ShelfController : Controller
    {
        public AppDbContext db { get; set; }
        public IAuthService Auth { get; set; }
        public ShelfController(AppDbContext _db, IAuthService _Auth)
        {
            db = _db;
            Auth = _Auth;
        }
        [HttpPost]
        public async Task<IActionResult> post(ShelfCreate shelfDetails)
        {
            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "admin" }) || Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "customeAdmin" }))
            {
                if (shelfDetails == null || shelfDetails.books == null || shelfDetails.name == null) return BadRequest();
                var shelf = new Shelf()
                {
                    name = shelfDetails.name,
                };
                await db.shelves.AddAsync(shelf);
                await db.SaveChangesAsync();
                var listOfBooksInShelf = new List<ShelfBook>();
                foreach (var item in shelfDetails.books)
                {
                    listOfBooksInShelf.Add(new ShelfBook()
                    {
                        shelf = shelf,
                        shelfId = shelf.id,
                        book = await db.books.SingleOrDefaultAsync(x => x.id == item.id),
                        bookId = item.id
                    });
                }
                await db.shelf_book.AddRangeAsync(listOfBooksInShelf);
                await db.SaveChangesAsync();
                return Ok();
            }
            else return Unauthorized();
            
        }
        [HttpPatch]
        public async Task<IActionResult> patch(ShelfCreate sc)
        {
            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "admin" }) || Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "customeAdmin" }))
            {
                if(sc == null || sc.name == null) return NotFound();
                if(sc.id == null) return BadRequest();
                var updatedShelf = await db.shelves.SingleOrDefaultAsync(x => x.id == sc.id);
                if(updatedShelf == null) return NotFound();
                updatedShelf.name = sc.name;
                var updatedDetails = await db.shelf_book.Where(x => x.shelfId == sc.id).ToListAsync();
                db.shelf_book.RemoveRange(updatedDetails);
                db.shelves.Update(updatedShelf);
                await db.SaveChangesAsync();
                var updatedShelfBook = new List<ShelfBook>();
                foreach(var item in sc.books)
                {
                    updatedShelfBook.Add(new ShelfBook()
                    {
                        book = await db.books.SingleOrDefaultAsync(x => x.id == item.id),
                        bookId = item.id,
                        shelf = await db.shelves.SingleOrDefaultAsync(x => x.id == updatedShelf.id),
                        shelfId = updatedShelf.id
                    });
                }
                await db.shelf_book.AddRangeAsync(updatedShelfBook);
                await db.SaveChangesAsync();
                return Ok(updatedShelf);
            }
            else return Unauthorized();

        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> delete(int id)
        {
            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "admin" }) || Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "customeAdmin" }))
            {
                var toBeRemoved = await db.shelves.SingleOrDefaultAsync(x => x.id == id);
                if (toBeRemoved == null) return BadRequest();
                db.shelves.Remove(toBeRemoved);
                await db.SaveChangesAsync();
                return Ok(toBeRemoved);

            }
            else return Unauthorized();

        }
        [HttpGet("{id?}")]
        public async Task<IActionResult> get(int? id)
        {
            if(id == null) {
                var shelves = await db.shelves.ToListAsync();
                var result = new List<object>();
                foreach(var item in shelves)
                {
                    result.Add(new
                    {
                        shelf = item,
                        books = await db.shelf_book.Where(x => x.shelfId == item.id).Select(x => x.book).ToListAsync()
                    });
                }
                return Ok(result);
            }
            else { return Ok(new { shelf = await db.shelves.SingleOrDefaultAsync(x => x.id == id) , 
            books = await db.shelf_book.Where(x => x.shelfId == id ).Select(x => x.book).ToListAsync()
            }); }
            
        }
        [HttpGet("specialshelf")]
        public async Task<IActionResult> specialshelf (string orderType)
        {
            var books = await db.books.ToListAsync();
            if(orderType == "mostSales")
            {
                books = books.OrderByDescending(x => x.salesCount).ToList();
                books = books.Take(10).ToList();
                return Ok(books);
            }
            else if(orderType == "mostLiked")
            {
                var result = new List<Likes>();
                var likes = new List<LikedBook>();
                foreach(var book in books)
                {
                    likes = await db.likedBooks.Where(x => x.BookId == book.id).ToListAsync();
                    result.Add(new Likes(){ book = book, likes = likes.Count });
                }
                result = result.OrderByDescending(x => x.likes).ToList();
                return Ok(result.Select(x=> x.book).Take(10).ToList());
            }
            else
            {
                return NotFound();
            }
        }
    }
}
