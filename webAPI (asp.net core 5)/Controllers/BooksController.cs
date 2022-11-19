using BookStoreApi.APIModels;
using BookStoreApi.Models;
using BookStoreApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace BookStoreApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BooksController : Controller
    {
        public AppDbContext db { get; set; }
        public IAuthService Auth { get; set; }
        public BooksController(AppDbContext _db, IAuthService _Auth)
        {
            db = _db;
            Auth = _Auth;
        }
        [HttpGet("{id?}")]
        public async Task<IActionResult> Get(int? id)
        {
            if (id != null)
            {
                var book = await db.books.SingleOrDefaultAsync(x => x.id == id);
                if (book == null) return NotFound();
                var finalPackage = new BookModel()
                {
                    book = book,
                    Liked = false,
                    Authenticated = false,
                    publishers = new List<Publisher>(),
                    translators = new List<Translator>(),
                    categories = new List<Category>(),
                    writers = new List<Writer>(),
                };
                if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "all" }))
                {
                    var userId = Auth.getId(HttpContext.Request.Headers["Authorization"]);
                    if (await db.likedBooks.SingleOrDefaultAsync(x => x.id == book.id) != null)
                        finalPackage.Liked = true;
                    finalPackage.Authenticated = true;
                }
                foreach (var p in await db.book_publisher.Where(x => x.bookId == book.id).Select(x => x.publisher).ToListAsync())
                {
                    if (p != null)
                        finalPackage.publishers.Add(p);
                }
                foreach (var t in await db.Book_translator.Where(x => x.bookId == book.id).Select(x => x.translator).ToListAsync())
                {
                    if (t != null)
                        finalPackage.translators.Add(t);
                }
                foreach (var w in await db.book_writer.Where(x => x.bookId == book.id).Select(x => x.writer).ToListAsync())
                {
                    if (w != null)
                        finalPackage.writers.Add(w);
                }
                foreach (var c in await db.book_category.Where(x => x.bookId == book.id).Select(x => x.Category).ToListAsync())
                {
                    if (c != null)
                        finalPackage.categories.Add(c);
                }
                return Ok(finalPackage);
            }
            else
                return Ok(await db.books.ToListAsync());
        }
        [HttpPost("listofbooks")]
        public async Task<IActionResult> listOfBooks(List<BookList> ids)
        {
            if (ids == null || ids.Count == 0) return BadRequest();
            var books = new List<ResultBook>();
            foreach (var bid in ids)
            {
                books.Add(new ResultBook()
                {
                    book = await db.books.SingleOrDefaultAsync(x => x.id == bid.id),
                    publishers = await db.book_publisher.Where(x => x.bookId == bid.id).Select(x => x.publisher).ToListAsync(),
                    writers = await db.book_writer.Where(x => x.bookId == bid.id).Select(x => x.writer).ToListAsync(),
                    translators = await db.Book_translator.Where(x => x.bookId == bid.id).Select(x => x.translator).ToListAsync(),
                    categories = await db.book_category.Where(x => x.bookId == bid.id).Select(x => x.Category).ToListAsync(),
                    count = bid.count
                });
            }
            Book tempBook = null;
            var totalPrice = 0;
            foreach (var b in ids)
            {
                tempBook = await db.books.SingleOrDefaultAsync(x => x.id == b.id);
                if (tempBook == null) return BadRequest();
                if (tempBook.price != null)
                    totalPrice += (int)tempBook.price * b.count;
            }
            var postPrice = (await db.settings.SingleOrDefaultAsync(x => x.id == 7)).value;
            if (books.Count > 0)
                return Ok(new { books, totalPrice = Convert.ToInt32(totalPrice), postPrice = Convert.ToInt32(postPrice) });
            else return NotFound();
        }
        [HttpPost("/shoppingcart")]
        public async Task<IActionResult> shoppingCart(List<ShoppingCart> sc)
        {
            if (sc == null) return BadRequest();
            Book tempBook = null;
            var books = new List<Book>();
            foreach (var book in sc)
            {
                tempBook = db.books.SingleOrDefault(x => x.id == book.id);
                if (tempBook == null) return BadRequest();
                if (tempBook.countInStorage < book.count) return BadRequest();
            }
            var totalPrice = 0;
            foreach (var b in sc)
            {
                tempBook = db.books.SingleOrDefault(x => x.id == b.id);

                if (tempBook == null) return BadRequest();
                if (tempBook.price != null)
                    totalPrice += (int)tempBook.price * b.count;
                books.Add(tempBook);
            }


            return Ok(new { books, totalPrice });
        }
        [HttpPatch]
        public async Task<IActionResult> patch(IFormCollection data, IFormFile file)
        {
            int? id = Convert.ToInt32(data["id"]);
            if (data == null || id == null)
            {
                return BadRequest();
            }
            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "admin" }) || Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "customeAdmin" }))
            {
                var oldBook = await db.books.SingleOrDefaultAsync(x => x.id == id);
                dynamic listOfWriters = JsonConvert.DeserializeObject(data["listOfWriters"]);
                var writers = new List<Writer>();
                foreach (var w in listOfWriters)
                {
                    writers.Add(new Writer()
                    {
                        id = w.id,
                        name = w.name,
                    });
                }
                dynamic listOfPublishers = JsonConvert.DeserializeObject(data["listOfPublishers"]);
                var publishers = new List<Publisher>();
                foreach (var p in listOfPublishers)
                {
                    publishers.Add(new Publisher()
                    {
                        id = p.id,
                        name = p.name,
                    });
                }
                dynamic listOfTranslators = JsonConvert.DeserializeObject(data["listOfTranslators"]);
                var translators = new List<Translator>();
                foreach (var t in listOfTranslators)
                {
                    translators.Add(new Translator()
                    {
                        id = t.id,
                        name = t.name,
                    });
                }
                dynamic listOfCategories = JsonConvert.DeserializeObject(data["listOfCategories"]);
                var categories = new List<Category>();
                foreach (var c in listOfCategories)
                {
                    categories.Add(new Category()
                    {
                        id = c.id,
                        name = c.name,
                    });
                }
                if (file != null && file.Length != 0 && file.FileName != null)
                {

                    var oldPic = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot//images//books", oldBook.imageLocation);
                    if (System.IO.File.Exists(oldPic))
                    {
                        System.IO.File.Delete(oldPic);
                    }
                    var path = Path.Combine(
                    Directory.GetCurrentDirectory(), "wwwroot//images//books", id +
                    file.FileName);

                    using (var stream = new FileStream(path, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }
                    oldBook.imageLocation = id + file.FileName;
                }
                oldBook.price = Convert.ToInt32(data["price"]);
                oldBook.name = data["name"];
                oldBook.coverType = data["coverType"];
                oldBook.countInStorage = Convert.ToInt32(data["countInStorage"]);
                if (data["offPrice"] != "") oldBook.offPrice = Convert.ToInt32(data["offPrice"]);
                oldBook.pageType = data["pageType"];
                oldBook.publishDate = data["publishDate"];
                oldBook.nobateChap = data["nobateChap"];
                oldBook.bookSize = data["size"];
                oldBook.BookNo = data["bookNo"];
                oldBook.Describtion = data["describtion"];
                db.books.Update(oldBook);
                await db.SaveChangesAsync();
                var writerResult = new List<BookWriter>();

                foreach (var w in writers)
                {
                    writerResult.Add(new BookWriter()
                    {
                        book = oldBook,
                        bookId = oldBook.id,
                        writer = await db.writers.SingleOrDefaultAsync(x => x.id == w.id),
                        writerId = w.id
                    });

                }
                var categoriesResult = new List<BookCategory>();
                foreach (var c in categories)
                {
                    categoriesResult.Add(new BookCategory()
                    {
                        book = oldBook,
                        bookId = oldBook.id,
                        Category = await db.categories.SingleOrDefaultAsync(x => x.id == c.id),
                        categoryId = c.id
                    });
                }

                var publishersResult = new List<BookPublisher>();
                foreach (var p in publishers)
                {
                    publishersResult.Add(new BookPublisher()
                    {
                        book = oldBook,
                        bookId = oldBook.id,
                        publisher = await db.publishers.SingleOrDefaultAsync(x => x.id == p.id),
                        publisherId = p.id
                    });
                }

                var translatorsResult = new List<BookTranslator>();
                foreach (var t in translators)
                {
                    translatorsResult.Add(new BookTranslator()
                    {
                        book = oldBook,
                        bookId = oldBook.id,
                        translator = await db.translators.SingleOrDefaultAsync(x => x.id == t.id),
                        translatorId = t.id
                    });
                }
                db.book_category.RemoveRange(await db.book_category.Where(x => x.bookId == oldBook.id).ToListAsync());
                db.book_publisher.RemoveRange(await db.book_publisher.Where(x => x.bookId == oldBook.id).ToListAsync());
                db.book_writer.RemoveRange(await db.book_writer.Where(x => x.bookId == oldBook.id).ToListAsync());
                db.Book_translator.RemoveRange(await db.Book_translator.Where(x => x.bookId == oldBook.id).ToListAsync());
                await db.SaveChangesAsync();
                await db.book_writer.AddRangeAsync(writerResult);
                await db.book_category.AddRangeAsync(categoriesResult);
                await db.book_publisher.AddRangeAsync(publishersResult);
                await db.Book_translator.AddRangeAsync(translatorsResult);
                await db.SaveChangesAsync();
                return Ok();
            }
            else return Unauthorized();
        }
        [HttpPost]
        public async Task<IActionResult> Post(IFormCollection data, IFormFile file)
        {
            if (data == null || file == null)
            {
                return NotFound();
            }
            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "admin" }) || Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "customeAdmin" }))
            {
                dynamic listOfWriters = JsonConvert.DeserializeObject(data["listOfWriters"]);
                var writers = new List<Writer>();
                foreach (var w in listOfWriters)
                {
                    writers.Add(new Writer()
                    {
                        id = w.id,
                        name = w.name,
                    });
                }
                dynamic listOfPublishers = JsonConvert.DeserializeObject(data["listOfPublishers"]);
                var publishers = new List<Publisher>();
                foreach (var p in listOfPublishers)
                {
                    publishers.Add(new Publisher()
                    {
                        id = p.id,
                        name = p.name,
                    });
                }
                dynamic listOfTranslators = JsonConvert.DeserializeObject(data["listOfTranslators"]);
                var translators = new List<Translator>();
                foreach (var t in listOfTranslators)
                {
                    translators.Add(new Translator()
                    {
                        id = t.id,
                        name = t.name,
                    });
                }
                dynamic listOfCategories = JsonConvert.DeserializeObject(data["listOfCategories"]);
                var categories = new List<Category>();
                foreach (var c in listOfCategories)
                {
                    categories.Add(new Category()
                    {
                        id = c.id,
                        name = c.name,
                    });
                }

                if (file == null || file.Length == 0)
                    return NotFound();

                var name = data["name"];
                var size = data["size"];
                var bookNo = data["bookNo"];
                var coverType = data["coverType"];
                var pageType = data["pageType"];
                var price = data["price"];
                var offPrice = Convert.ToString(data["offPrice"]);
                var nobateChap = data["nobateChap"];
                var publishDate = data["publishDate"];
                var countInStorage = data["countInStorage"];
                var describe = data["describtion"];
                var book = new Book();
                if (offPrice != "")
                {
                    book.name = name;
                    book.bookSize = size;
                    book.BookNo = bookNo;
                    book.pageType = pageType;
                    book.imageLocation = file.FileName;
                    book.price = Convert.ToInt32(price);
                    book.offPrice = Convert.ToInt32(offPrice);
                    book.nobateChap = nobateChap;
                    book.coverType = coverType;
                    book.publishDate = publishDate;
                    book.countInStorage = Convert.ToInt32(countInStorage);
                    book.Describtion = describe;
                    book.salesCount = 0;
                }
                else
                {

                    book.name = name;
                    book.bookSize = size;
                    book.BookNo = bookNo;
                    book.pageType = pageType;
                    book.coverType = coverType;
                    book.imageLocation = file.FileName;
                    book.price = Convert.ToInt32(price);
                    book.nobateChap = nobateChap;
                    book.publishDate = publishDate;
                    book.countInStorage = Convert.ToInt32(countInStorage);
                    book.Describtion = describe;
                    book.salesCount = 0;
                }

                await db.books.AddAsync(book);
                await db.SaveChangesAsync();
                var path = Path.Combine(
                            Directory.GetCurrentDirectory(), "wwwroot//images//books",
                            book.id + file.FileName);

                using (var stream = new FileStream(path, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
                book = await db.books.SingleOrDefaultAsync(x => x.id == book.id);
                book.imageLocation = book.id + file.FileName;
                db.books.Update(book);
                await db.SaveChangesAsync();
                var writerResult = new List<BookWriter>();

                foreach (var w in writers)
                {
                    writerResult.Add(new BookWriter()
                    {
                        book = book,
                        bookId = book.id,
                        writer = await db.writers.SingleOrDefaultAsync(x => x.id == w.id),
                        writerId = w.id
                    });

                }
                var categoriesResult = new List<BookCategory>();
                foreach (var c in categories)
                {
                    categoriesResult.Add(new BookCategory()
                    {
                        book = book,
                        bookId = book.id,
                        Category = await db.categories.SingleOrDefaultAsync(x => x.id == c.id),
                        categoryId = c.id
                    });
                }

                var publishersResult = new List<BookPublisher>();
                foreach (var p in publishers)
                {
                    publishersResult.Add(new BookPublisher()
                    {
                        book = book,
                        bookId = book.id,
                        publisher = await db.publishers.SingleOrDefaultAsync(x => x.id == p.id),
                        publisherId = p.id
                    });
                }

                var translatorsResult = new List<BookTranslator>();
                foreach (var t in translators)
                {
                    translatorsResult.Add(new BookTranslator()
                    {
                        book = book,
                        bookId = book.id,
                        translator = await db.translators.SingleOrDefaultAsync(x => x.id == t.id),
                        translatorId = t.id
                    });
                }
                await db.book_category.AddRangeAsync(categoriesResult);
                await db.book_publisher.AddRangeAsync(publishersResult);
                await db.book_writer.AddRangeAsync(writerResult);
                await db.Book_translator.AddRangeAsync(translatorsResult);
                await db.SaveChangesAsync();
                return Ok(book);
            }
            else return Unauthorized();

        }
        [HttpPost("bookimage/{id}")]
        public async Task<IActionResult> Post (int id ,IFormFile image)
        {
            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "admin" }) || Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "a" }))
            {
                var book = await db.books.SingleOrDefaultAsync(x => x.id == id);
                try
                {
                    var path = Path.Combine(
                            Directory.GetCurrentDirectory(), "wwwroot//images//books",
                            book.id + image.FileName);

                    using (var stream = new FileStream(path, FileMode.Create))
                    {
                        await image.CopyToAsync(stream);
                    }
                    var bookImage = new BookImage()
                    {
                        book = await db.books.SingleOrDefaultAsync(x => x.id == book.id),
                        bookId = book.id,
                        imageLocation = (book.id + image.FileName)
                    };
                    await db.book_image.AddAsync(bookImage);
                    await db.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
                return Ok(await db.book_image.Where(x => x.bookId == book.id).ToListAsync());
            }
            else return Unauthorized();
        }
        [HttpDelete("bookimage/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "admin" }) || Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "customeAdmin" }))
            {
                
                    var bookImage = await db.book_image.SingleOrDefaultAsync(x => x.id == id);
                    var path = Path.Combine(
                            Directory.GetCurrentDirectory(), "wwwroot//images//books",
                             bookImage.imageLocation);
                    if (System.IO.File.Exists(path))
                    {
                        System.IO.File.Delete(path);
                    }
                    db.book_image.Remove(bookImage);
                    await db.SaveChangesAsync();
                    return Ok();
                
            }
            else return Unauthorized();
        }
        [HttpGet("bookimage/{id}")]
        public async Task<IActionResult> getBookImage (int id)
        {
           
            
                var bookImages = await db.book_image.Where(x => x.bookId == id).ToListAsync();
                var book = await db.books.SingleOrDefaultAsync(x => x.id == id);
                return Ok(new {bookImages , book});
            
            
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> delete(int id)
        {
            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "admin" }) || Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "customeAdmin" }))
            {
                
                var toBeRemoved = await db.books.SingleOrDefaultAsync(x => x.id == id);
                var oldPic = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot//images//books", toBeRemoved.imageLocation);
                if (System.IO.File.Exists(oldPic))
                {
                    System.IO.File.Delete(oldPic);
                }
                if (toBeRemoved == null) return BadRequest();
                db.books.Remove(toBeRemoved);
                await db.SaveChangesAsync();
                return Ok(toBeRemoved);

            }
            else return Unauthorized();

        }
    }
}
