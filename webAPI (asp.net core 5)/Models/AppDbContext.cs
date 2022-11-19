using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
namespace BookStoreApi.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
        { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Role>().HasData(new Role
            {
                id = 1,
                name = "admin"
            },
            new Role
            {
                id = 2,
                name = "user"
            },
            new Role
            {
                id = 3,
                name = "customeAdmin"
            });

            modelBuilder.Entity<OrderState>().HasData(
                new OrderState
                {
                    id = 1,
                    name = "پرداخت نشده"
                },
                new OrderState
                {
                    id = 2,
                    name = "پرداخت شده"
                },
                new OrderState
                {
                    id = 3,
                    name = "در حال پردازش"
                },
                new OrderState
                {
                    id = 4,
                    name = "ارسال شده"
                });
            modelBuilder.Entity<Setting>().HasData(new Setting
            {
                id = 1 , 
                name = "pageDataCount",
                value = "20"
            },
            new Setting
            {
                id = 2,
                name = "aboutUs",
                value = ""
            },
            new Setting
            {
                id = 3 ,
                name = "contactUs",
                value = ""
            },
            new Setting
            {
                id = 4 ,
                name = "namadEtebar",
                value = ""
            },
            new Setting
            {
                id = 5 ,
                name = "samandehi",
                value = ""
            },
            new Setting
            {
                id = 6,
                name = "merchantId",
                value = ""
            },
            new Setting
            {
                id = 7,
                name = "postPrice",
                value = "150000"
            });
            
        }
        public DbSet<Book> books { get; set; }
        public DbSet<Category> categories { get; set; }
        public DbSet<Writer> writers { get; set; }
        public DbSet<BookCategory> book_category { get; set; }
        public DbSet<BookWriter> book_writer { get; set; }
        public DbSet<Role> roles { get; set; }
        public DbSet<City> cities { get; set; }
        public DbSet<State> states { get; set; }
        public DbSet<User> users { get; set; }
        public DbSet<UploadedFile> files { get; set; }
        public DbSet<Shelf> shelves { get; set; }
        public DbSet<ShelfBook> shelf_book { get; set; }
        public DbSet<Carousel> carousels { get; set; }
        public DbSet<LikedBook> likedBooks { get; set; }
        public DbSet<Translator> translators { get; set; }
        public DbSet<BookTranslator> Book_translator { get; set; }
        public DbSet<Publisher> publishers { get; set; }
        public DbSet<BookPublisher> book_publisher { get; set; }
        public DbSet<Order> orders { get; set; }
        public DbSet<OrderDetails> orderDetails { get; set; }
        public DbSet<OrderState> orderStates { get; set; }
        public DbSet<Advertisement> adverts { get; set; }
        public DbSet<Comment> comments { get; set; }
        public DbSet<CommentState> commentState { get; set; }
        public DbSet<Page> pages { get; set; }
        public DbSet<PageWriter> page_writer { get; set; }
        public DbSet<PageCategory> page_category { get; set; }
        public DbSet<PagePublisher> page_publisher { get; set; }
        public DbSet<PageTranslator> page_translator { get; set; }
        public DbSet<PageBook> page_book { get; set; }
        public DbSet<Setting> settings { get; set; }
        public DbSet<Address> addresses { get; set; }
        public DbSet<User_Address> user_addresses { get; set; }
        public DbSet<BookImage> book_image { get; set; }
        public DbSet<User_Access> user_access { get; set; }
    }


}