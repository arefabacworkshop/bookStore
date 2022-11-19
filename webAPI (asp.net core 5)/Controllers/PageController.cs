using BookStoreApi.APIModels;
using BookStoreApi.Models;
using BookStoreApi.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookStoreApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PageController : Controller
    {
        public AppDbContext db { get; set; }
        public IAuthService Auth { get; set; }
        public PageController(AppDbContext _db, IAuthService _Auth)
        {
            db = _db;
            Auth = _Auth;
        }
        [HttpGet("category/{id}")]
        public async Task<IActionResult> category(int id)
        {
            if (id == null || id == 0) return NotFound();
            var categoryDetail = await db.categories.SingleOrDefaultAsync(x => x.id == id);
            if (categoryDetail == null) return NotFound();
            var relatedBooks = await db.book_category.Where(x => x.categoryId == id).Select(b => b.bookId).ToListAsync();
            var listOfWriters = new List<Writer>();
            foreach (var b in relatedBooks)
            {
                listOfWriters.AddRange(await db.book_writer.Where(x => x.bookId == b).Select(y => y.writer).ToListAsync());
            }
            var listOfPublishers = new List<Publisher>();
            foreach (var b in relatedBooks)
            {
                listOfPublishers.AddRange( await db.book_publisher.Where(x=> x.bookId == b).Select(x => x.publisher).ToListAsync());
            }
            var listOfTranslators= new List<Translator>();
            foreach (var b in relatedBooks)
            {
                listOfTranslators.AddRange(await db.Book_translator.Where(x => x.bookId == b).Select(x => x.translator).ToListAsync());
            }
            listOfWriters = listOfWriters.Distinct().ToList();
            listOfPublishers = listOfPublishers.Distinct().ToList();    
            listOfTranslators = listOfTranslators.Distinct().ToList();
            var result = new
            {
                categoryDetail,
                listOfWriters,
                listOfPublishers,
                listOfTranslators
            };
            return Ok(result);
        }
        [HttpGet("writer/{id}")]
        public async Task<IActionResult> writer(int id)
        {
            if (id == null || id == 0) return NotFound();
            var writerDetail = await db.writers.SingleOrDefaultAsync(x => x.id == id);
            if (writerDetail == null) return NotFound();
            var relatedBooks = await db.book_writer.Where(x => x.writerId == id).Select(b => b.bookId).ToListAsync();
            var listofTranslators = new List<Translator>();
            foreach (var item in relatedBooks)
            {
                listofTranslators.AddRange(await db.Book_translator.Where(x => x.bookId == item).Select(x => x.translator).ToListAsync());
            }
            var listofPublishers = new List<Publisher>();
            foreach (var item in relatedBooks)
            {
                listofPublishers.AddRange(await db.book_publisher.Where(x => x.bookId == item).Select(x => x.publisher).ToListAsync());
            }
            var listofCategories = new List<Category>();
            foreach (var item in relatedBooks)
            {
                listofCategories.AddRange(await db.book_category.Where(x => x.bookId == item).Select(x => x.Category).ToListAsync());
            }
            listofTranslators = listofTranslators.Distinct().ToList();
            listofCategories = listofCategories.Distinct().ToList();
            listofPublishers = listofPublishers.Distinct().ToList();
            var result = new
            {
                writerDetail,
                listofTranslators,
                listofCategories,
                listofPublishers
            };
            return Ok(result);
        }
        [HttpPost("search")]
        public async Task<IActionResult> Search(PageSearch ps)
        {
            if (ps == null) return NotFound();
            if(ps.id == null ) return BadRequest();
            if(ps.type == null || ps.type == "") return NotFound();
            var books = new List<Book>();
            if(ps.type == "category")
            {
                books = await db.book_category.Where(x => x.categoryId == ps.id).Select(x => x.book).ToListAsync();
                books = books.DistinctBy(x => x.id).ToList();
            }
            else if(ps.type == "writer")
            {
                books = await db.book_writer.Where(x => x.writerId == ps.id).Select(x => x.book).ToListAsync();
                books = books.DistinctBy(x => x.id).ToList();
            }
            else if(ps.type == "custom")
            {
                var page = await db.pages.SingleOrDefaultAsync(x => x.id == ps.id);
                var pageBooks = await db.page_book.Where(x => x.pageId == page.id).Select(x => x.book).ToListAsync();
                pageBooks = pageBooks.DistinctBy(x => x.id).ToList();
                books.AddRange(pageBooks);
                var pageWriters = await db.page_writer.Where(x => x.pageId == page.id).Select(x => x.writer).ToListAsync();
                var tempBooks = new List<Book>();
                foreach (var wid in pageWriters)
                {
                    tempBooks = await db.book_writer.Where(x => x.writerId == wid.id).Select(x => x.book).ToListAsync();
                    tempBooks = tempBooks.DistinctBy(x => x.id).ToList();
                    books.AddRange(tempBooks);
                }
                var pageTranslators = await db.page_translator.Where(x => x.pageId == page.id).Select(x => x.translator).ToListAsync();
                foreach (var wid in pageTranslators)
                {
                    tempBooks = await db.Book_translator.Where(x => x.translatorId == wid.id).Select(x => x.book).ToListAsync();
                    tempBooks = tempBooks.DistinctBy(x => x.id).ToList();
                    books.AddRange(tempBooks);
                }
                var pagePublishers = await db.page_publisher.Where(x => x.pageId == page.id).Select(x => x.publisher).ToListAsync();
                foreach (var wid in pagePublishers)
                {
                    tempBooks = await db.book_publisher.Where(x => x.publisherId == wid.id).Select(x => x.book).ToListAsync();
                    tempBooks = tempBooks.DistinctBy(x => x.id).ToList();
                    books.AddRange(tempBooks);
                }
                var pageCategory = await db.page_category.Where(x => x.pageId == page.id).Select(x => x.category).ToListAsync();
                foreach (var wid in pageCategory)
                {
                    tempBooks = await db.book_category.Where(x => x.categoryId == wid.id).Select(x => x.book).ToListAsync();
                    tempBooks = tempBooks.DistinctBy(x => x.id).ToList();
                    books.AddRange(tempBooks);
                }
                books = books.DistinctBy(x => x.id).ToList();
            }
            if(books.Count == 0) return NotFound();
            var result = new List<ResultBook>();
            if(ps.publishersId != null && ps.publishersId.Count != 0)
            {
                var publisherBooks = new List<Book>();
                foreach(var pid in ps.publishersId)
                {
                    publisherBooks= await db.book_publisher.Where(x => x.publisherId == pid ).Select(x=> x.book).ToListAsync();
                    publisherBooks = publisherBooks.DistinctBy(x => x.id).ToList();
                    books = books.Intersect(publisherBooks).ToList();
                }
               
            }
            if (books.Count == 0) return NotFound();
            if (ps.writersId != null && ps.writersId.Count != 0)
            {
                var writerBooks = new List<Book>();
                foreach (var pid in ps.writersId)
                {
                    writerBooks= await db.book_writer.Where(x => x.writerId == pid).Select(x => x.book).ToListAsync();
                    writerBooks = writerBooks.DistinctBy(x => x.id).ToList();
                    books = books.Intersect(writerBooks).ToList();
                }
                
            }
            if (books.Count == 0) return NotFound();
            if (ps.translatorsId != null && ps.translatorsId.Count != 0)
            {
                var translatorBooks = new List<Book>();
                foreach (var pid in ps.translatorsId)
                {
                    translatorBooks = await db.Book_translator.Where(x => x.translatorId == pid).Select(x => x.book).ToListAsync();
                    translatorBooks = translatorBooks.DistinctBy(x => x.id).ToList();
                    books = books.Intersect(translatorBooks).ToList();
                }
                
            }
            if (books.Count == 0) return NotFound();
            if (ps.categoriesId != null && ps.categoriesId.Count != 0)
            {
                var categoryBooks = new List<Book>();
                foreach (var pid in ps.categoriesId)
                {
                    categoryBooks= await db.book_category.Where(x => x.categoryId == pid).Select(x => x.book).ToListAsync();
                    categoryBooks = categoryBooks.DistinctBy(x => x.id).ToList();
                    books = books.Intersect(categoryBooks).ToList();
                }
                
            }
            if (books.Count == 0) return NotFound();
            if ((ps.translatorsId == null || ps.translatorsId.Count == 0)&& (ps.categoriesId == null || ps.categoriesId.Count == 0) && (ps.writersId == null || ps.writersId.Count == 0) && (ps.publishersId == null || ps.publishersId.Count == 0))
            {
                foreach (var b in books)
                {
                    result.Add(new ResultBook()
                    {
                        book = b,
                        publishers = await db.book_publisher.Where(x => x.bookId == b.id).Select(x => x.publisher).ToListAsync(),
                        writers = await db.book_writer.Where(x => x.bookId == b.id).Select(x => x.writer).ToListAsync(),
                        translators = await db.Book_translator.Where(x => x.bookId == b.id).Select(x => x.translator).ToListAsync(),
                        categories = await db.book_category.Where(x => x.bookId == b.id).Select(x => x.Category).ToListAsync()
                    });
                }
            }
            else
            {
                if (books.Count == 0) return NotFound();
                foreach (var book in books)
                {
                     result.Add(new ResultBook()
                    {
                        book = book,
                        publishers = await db.book_publisher.Where(x => x.bookId == book.id).Select(x => x.publisher).ToListAsync(),
                        writers = await db.book_writer.Where(x => x.bookId == book.id).Select(x => x.writer).ToListAsync(),
                        translators = await db.Book_translator.Where(x => x.bookId == book.id).Select(x => x.translator).ToListAsync(),
                        categories = await db.book_category.Where(x => x.bookId == book.id).Select(x => x.Category).ToListAsync()
                    });
                }
            }
            if (ps.isExist != null)
            {
                if ((bool)ps.isExist)
                {
                    result = result.Where(x => x.book.countInStorage > 0).ToList();
                }
            }
            if(ps.name != null && ps.name != "")
            {
                result = result.Where(x => x.book.name.Contains(ps.name)).ToList();
            }
            if(ps.order!= null)
            {
                if(ps.order == 1)
                {
                    result = result.OrderByDescending(x => x.book.salesCount).ToList();
                }
                if (ps.order == 2)
                {
                    result = result.OrderBy(x => x.book.price).ToList();
                }
                if (ps.order == 3)
                {
                    result = result.OrderByDescending(x => x.book.price).ToList();
                }
            }
            result = result.Distinct().ToList();
            var pageDataCount = Convert.ToInt32((await db.settings.SingleOrDefaultAsync(x => x.id == 1)).value);
            float pageCount = (float)result.Count / (float)pageDataCount;
            int pageCounti = result.Count / pageDataCount;
            if (ps.pageNum != null)
            {              
                if(pageCount > pageCounti) { pageCounti = pageCounti + 1; }
                int skip = ((int) ps.pageNum - 1) * pageDataCount;
                result = result.Skip(skip).Take(pageDataCount).ToList();
                    
                        }
            return Ok(new
            {
                result,
                pageDataCount = pageCounti,
                currentPage = ps.pageNum
            });
        }
        [HttpPost]
        public async Task<IActionResult> Post(PostPage p)
        {
            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "admin" }) || Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "customeAdmin" }))
            {
                var page = new Page()
                {
                    name = p.name,
                };
                await db.pages.AddAsync(page);
                await db.SaveChangesAsync();
                var pagePublishers = new List<PagePublisher>();
                foreach (var publisher in p.publishers)
                {
                    pagePublishers.Add(new PagePublisher()
                    {
                        page = page,
                        pageId = page.id,
                        publisher = await db.publishers.SingleOrDefaultAsync(x => x.id == publisher.id),
                        publisherId = publisher.id
                    });
                }
                var pageWriters = new List<PageWriter>();
                foreach (var writer in p.writers)
                {
                    pageWriters.Add(new PageWriter()
                    {
                        page = page,
                        pageId = page.id,
                        writer = await db.writers.SingleOrDefaultAsync(x => x.id == writer.id),
                        writerId = writer.id
                    });
                }
                var pageTranslators = new List<PageTranslator>();
                foreach (var translator in p.translators)
                {
                    pageTranslators.Add(new PageTranslator()
                    {
                        page = page,
                        pageId = page.id,
                        translator = await db.translators.SingleOrDefaultAsync(x => x.id == translator.id),
                        translatorId = translator.id
                    });
                }
                var pageCategories = new List<PageCategory>();
                foreach (var category in p.categories)
                {
                    pageCategories.Add(new PageCategory()
                    {
                        page = page,
                        pageId = page.id,
                        category = await db.categories.SingleOrDefaultAsync(x => x.id == category.id),
                        categoryId = category.id
                    });
                }
                var pageBooks = new List<PageBook>();
                foreach (var book in p.books)
                {
                    pageBooks.Add(new PageBook()
                    {
                        page = page,
                        pageId = page.id,
                        book = await db.books.SingleOrDefaultAsync(x => x.id == book.id),
                        bookId = book.id
                    });
                }
                await db.page_book.AddRangeAsync(pageBooks);
                await db.page_category.AddRangeAsync(pageCategories);
                await db.page_publisher.AddRangeAsync(pagePublishers);
                await db.page_translator.AddRangeAsync(pageTranslators);
                await db.page_writer.AddRangeAsync(pageWriters);
                await db.SaveChangesAsync();
                return Ok(page);
            }
            else return Unauthorized();
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> get(int id)
        {
            var page = await db.pages.SingleOrDefaultAsync(x => x.id == id);
            var books = new List<Book>();
            var pageBooks = await db.page_book.Where(x => x.pageId == page.id).Select(x => x.book).ToListAsync();
            pageBooks = pageBooks.DistinctBy(x => x.id).ToList();
            books.AddRange(pageBooks);
            var pageWriters = await db.page_writer.Where(x => x.pageId == page.id).Select(x => x.writer).ToListAsync();
            var tempBooks = new List<Book>();
            foreach (var wid in pageWriters)
            {
                tempBooks = await db.book_writer.Where(x => x.writerId == wid.id).Select(x => x.book).ToListAsync();
                tempBooks = tempBooks.DistinctBy(x => x.id).ToList();
                books.AddRange(tempBooks);
            }
            var pageTranslators = await db.page_translator.Where(x => x.pageId == page.id).Select(x => x.translator).ToListAsync();
            foreach (var wid in pageTranslators)
            {
                tempBooks = await db.Book_translator.Where(x => x.translatorId == wid.id).Select(x => x.book).ToListAsync();
                tempBooks = tempBooks.DistinctBy(x => x.id).ToList();
                books.AddRange(tempBooks);
            }
            var pagePublishers = await db.page_publisher.Where(x => x.pageId == page.id).Select(x => x.publisher).ToListAsync();
            foreach (var wid in pagePublishers)
            {
                tempBooks = await db.book_publisher.Where(x => x.publisherId == wid.id).Select(x => x.book).ToListAsync();
                tempBooks = tempBooks.DistinctBy(x => x.id).ToList();
                books.AddRange(tempBooks);
            }
            var pageCategory = await db.page_category.Where(x => x.pageId == page.id).Select(x => x.category).ToListAsync();
            foreach (var wid in pageCategory)
            {
                tempBooks = await db.book_category.Where(x => x.categoryId == wid.id).Select(x => x.book).ToListAsync();
                tempBooks = tempBooks.DistinctBy(x => x.id).ToList();
                books.AddRange(tempBooks);
            }
            books = books.DistinctBy(x => x.id).ToList();
            foreach (var book in pageBooks)
            {
                pageWriters.AddRange(await db.book_writer.Where(x => x.bookId == book.id).Select(x => x.writer).ToListAsync());
                pageTranslators.AddRange(await db.Book_translator.Where(x => x.bookId == book.id).Select(x => x.translator).ToListAsync());
                pageCategory.AddRange(await db.book_category.Where(x => x.bookId == book.id).Select(x => x.Category).ToListAsync());
                pagePublishers.AddRange(await db.book_publisher.Where(x => x.bookId == book.id).Select(x => x.publisher).ToListAsync());
            }
            pageWriters = pageWriters.DistinctBy(x => x.id).ToList();
            pageCategory = pageCategory.DistinctBy(x => x.id).ToList();
            pageTranslators = pageTranslators.DistinctBy(x => x.id).ToList();
            pagePublishers = pagePublishers.DistinctBy(x => x.id).ToList();
            return Ok(new { 
            page,
            books ,
            pageBooks,
            pageWriters,
            pageCategory,
            pagePublishers,
            pageTranslators,
            });
        }
        [HttpGet("updateDetails/{id}")]
        public async Task<IActionResult> updateDetails(int id)
        {
            var page = await db.pages.SingleOrDefaultAsync(x => x.id == id);
            var books = new List<Book>();
            var pageBooks = await db.page_book.Where(x => x.pageId == page.id).Select(x => x.book).ToListAsync();
            pageBooks = pageBooks.DistinctBy(x => x.id).ToList();
            books.AddRange(pageBooks);
            var pageWriters = await db.page_writer.Where(x => x.pageId == page.id).Select(x => x.writer).ToListAsync();
            var tempBooks = new List<Book>();
            foreach (var wid in pageWriters)
            {
                tempBooks = await db.book_writer.Where(x => x.writerId == wid.id).Select(x => x.book).ToListAsync();
                tempBooks = tempBooks.DistinctBy(x => x.id).ToList();
                books.AddRange(tempBooks);
            }
            var pageTranslators = await db.page_translator.Where(x => x.pageId == page.id).Select(x => x.translator).ToListAsync();
            foreach (var wid in pageTranslators)
            {
                tempBooks = await db.Book_translator.Where(x => x.translatorId == wid.id).Select(x => x.book).ToListAsync();
                tempBooks = tempBooks.DistinctBy(x => x.id).ToList();
                books.AddRange(tempBooks);
            }
            var pagePublishers = await db.page_publisher.Where(x => x.pageId == page.id).Select(x => x.publisher).ToListAsync();
            foreach (var wid in pagePublishers)
            {
                tempBooks = await db.book_publisher.Where(x => x.publisherId == wid.id).Select(x => x.book).ToListAsync();
                tempBooks = tempBooks.DistinctBy(x => x.id).ToList();
                books.AddRange(tempBooks);
            }
            var pageCategory = await db.page_category.Where(x => x.pageId == page.id).Select(x => x.category).ToListAsync();
            foreach (var wid in pageCategory)
            {
                tempBooks = await db.book_category.Where(x => x.categoryId == wid.id).Select(x => x.book).ToListAsync();
                tempBooks = tempBooks.DistinctBy(x => x.id).ToList();
                books.AddRange(tempBooks);
            }
            books = books.DistinctBy(x => x.id).ToList();
            
            return Ok(new
            {
                page,
                books,
                pageBooks,
                pageWriters,
                pageCategory,
                pagePublishers,
                pageTranslators,
            });
        }
        [HttpGet("all")]
        public async Task<IActionResult> get()
        {
            return Ok(await db.pages.ToListAsync());
        }
        [HttpPatch]
        public async Task<IActionResult> patch(PostPage p)
        {
            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "admin" }) || Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "customeAdmin" }))
            {
                var page = await db.pages.SingleOrDefaultAsync(x => x.id == p.id);
            page.name = p.name;
            db.pages.Update(page);
            await db.SaveChangesAsync();
            var listOfWriters = await db.page_writer.Where(x => x.pageId == page.id).ToListAsync();
            db.page_writer.RemoveRange(listOfWriters);
            await db.SaveChangesAsync();
            listOfWriters = new List<PageWriter>();
            if(p.writers != null && p.writers.Count > 0)
            {
                foreach(var writer in p.writers)
                {
                    listOfWriters.Add(new PageWriter() { 
                        page = page,
                        pageId = page.id,
                        writerId = writer.id,
                        writer = await db.writers.SingleOrDefaultAsync(x => x.id == writer.id),
                    });
                }
            }
            var listOfPublishers = await db.page_publisher.Where(x => x.pageId == page.id).ToListAsync();
            db.page_publisher.RemoveRange(listOfPublishers);
            await db.SaveChangesAsync();
            listOfPublishers = new List<PagePublisher>();
            if (p.publishers != null && p.publishers.Count > 0)
            {
                foreach (var publisher in p.publishers)
                {
                    listOfPublishers.Add(new PagePublisher()
                    {
                        page = page,
                        pageId = page.id,
                        publisherId = publisher.id,
                        publisher = await db.publishers.SingleOrDefaultAsync(x => x.id == publisher.id),
                    });
                }
            }
            var listOfTranslators = await db.page_translator.Where(x => x.pageId == page.id).ToListAsync();
            db.page_translator.RemoveRange(listOfTranslators);
            await db.SaveChangesAsync();
            listOfTranslators = new List<PageTranslator>();
            if (p.translators != null && p.translators.Count > 0)
            {
                foreach (var translator in p.translators)
                {
                    listOfTranslators.Add(new PageTranslator()
                    {
                        page = page,
                        pageId = page.id,
                        translatorId = translator.id,
                        translator = await db.translators.SingleOrDefaultAsync(x => x.id == translator.id),
                    });
                }
            }
            var listOfCategories = await db.page_category.Where(x => x.pageId == page.id).ToListAsync();
            db.page_category.RemoveRange(listOfCategories);
            await db.SaveChangesAsync();
            listOfCategories = new List<PageCategory>();
            if (p.categories != null && p.categories.Count > 0)
            {
                foreach (var category in p.categories)
                {
                    listOfCategories.Add(new PageCategory()
                    {
                        page = page,
                        pageId = page.id,
                        categoryId = category.id,
                        category = await db.categories.SingleOrDefaultAsync(x => x.id == category.id),
                    });
                }
            }
            var listOfBooks = await db.page_book.Where(x => x.pageId == page.id).ToListAsync();
            db.page_book.RemoveRange(listOfBooks);
            await db.SaveChangesAsync();
            listOfBooks = new List<PageBook>();
            if (p.books != null && p.books.Count > 0)
            {
                foreach (var book in p.books)
                {
                    listOfBooks.Add(new PageBook()
                    {
                        page = page,
                        pageId = page.id,
                        bookId = book.id,
                        book = await db.books.SingleOrDefaultAsync(x => x.id == book.id),
                    });
                }
            }
            await db.page_book.AddRangeAsync(listOfBooks);
            await db.page_category.AddRangeAsync(listOfCategories);
            await db.page_publisher.AddRangeAsync(listOfPublishers);
            await db.page_translator.AddRangeAsync(listOfTranslators);
            await db.page_writer.AddRangeAsync(listOfWriters);
            await db.SaveChangesAsync();
            return Ok();
            }
            else return Unauthorized();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "admin" }) || Auth.RoleValidator(HttpContext.Request.Headers["Authorization"], new List<string> { "customeAdmin" }))
            {
                var page = await db.pages.SingleOrDefaultAsync(x => x.id == id);
                db.pages.Remove(page);
                await db.SaveChangesAsync();
                return Ok(page);
            }
            else return Unauthorized();
        }
    }
}
