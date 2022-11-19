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

    public class SearchController : Controller
    {
        public AppDbContext db { get; set; }
        public IAuthService Auth { get; set; }
        public SearchController(AppDbContext _db, IAuthService _Auth)
        {
            db = _db;
            Auth = _Auth;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var publishers = await db.publishers.ToListAsync();
            var writers =await  db.writers.ToListAsync();
            var translators =await db.translators.ToListAsync();
            var categories = await db.categories.ToListAsync();
            var data = new SearchSelect()
            {
                publishers = publishers,
                writers = writers,
                translators = translators,
                categories = categories,
            };
            return Ok(data);
        }
        [HttpPost]
        public async Task<IActionResult> Post(SearchRequest? req)
        {
             if ((req.name == "" && req.bookNo == "" && req.id == null && req.writerId == null && req.publisherId == null && req.translatorId == null && req.publishDate == "" && req.categoryId == null) || req == null)
            {
                return NotFound();
            }
            else if (req.id != null)
            {
                var response = await db.books.SingleOrDefaultAsync(x => x.id == req.id);
                if (response == null) return NotFound();
                else return Ok(response);
            }
            else if (req.bookNo != "")
            {
                var response = await db.books.SingleOrDefaultAsync(x => x.BookNo == req.bookNo);
                if (response == null) return NotFound();
                else return Ok(response);
            }
            var books = await db.books.ToListAsync();
            
            if(req.writerId != null)
            {
                var writerbooks = await db.book_writer.Where(x => x.writerId == req.writerId).Select(x=> x.book).ToListAsync();
                var tempBooks = new List<Book>();
                foreach (var b in writerbooks)
                {
                    foreach (var book in books)
                    {
                        if(book == b) tempBooks.Add(book);
                    }
                }
                books = tempBooks;
            }
            if (req.publisherId != null)
            {
                var publisherbooks = await db.book_publisher.Where(x => x.publisherId == req.publisherId).Select(x=> x.book).ToListAsync();
                var tempBooks = new List<Book>();
                foreach (var b in publisherbooks)
                {
                    foreach (var book in books)
                    {
                        if (book == b) tempBooks.Add(book);
                    }
                }
                books = tempBooks;
            }
            if (req.translatorId != null)
            {
                var translatorbooks = await db.Book_translator.Where(x => x.translatorId == req.translatorId).Select(x=> x.book).ToListAsync();
                var tempBooks = new List<Book>();
                foreach (var b in translatorbooks)
                {
                   foreach(var book in books)
                    {
                        if (book == b) tempBooks.Add(book);
                    }
                }
                books = tempBooks;
            }
            if (req.categoryId != null)
            {
                var categoryBooks = await db.book_category.Where(x => x.categoryId == req.categoryId).Select(x => x.book).ToListAsync();
                var tempBooks = new List<Book>();
                foreach (var b in categoryBooks)
                {
                    foreach (var book in books)
                    {
                        if (book == b) tempBooks.Add(book);
                    }
                }
                books = tempBooks;
            }
            if (req.publishDate != "")
            {
                books.Where(x => x.publishDate == req.publishDate).ToList();
                
            }
            if (req.name != "")
            {
                books = books.Where(x => x.name.Contains(req.name)).ToList();
            }
            if (books.Count == 0)
                return NotFound();
            if(req.pageNo != 0)
            {   var result = books.OrderBy(x => x.id).ToList();
                result = result.Skip((req.pageNo - 1) * 9).Take(9).ToList();
                return Ok(new { result, pageCount = books.Count / 9 + 1 });
            }
            books = books.DistinctBy(x => x.id).ToList();
            return Ok(books);
            
        }
    }
}
