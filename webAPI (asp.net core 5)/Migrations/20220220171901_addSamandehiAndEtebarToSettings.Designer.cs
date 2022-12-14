// <auto-generated />
using System;
using BookStoreApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace BookStoreApi.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20220220171901_addSamandehiAndEtebarToSettings")]
    partial class addSamandehiAndEtebarToSettings
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.11")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("BookStoreApi.Models.Advertisement", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("imageLocation")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("link")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("adverts");
                });

            modelBuilder.Entity("BookStoreApi.Models.Book", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("BookNo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Describtion")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("bookSize")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("countInStorage")
                        .HasColumnType("int");

                    b.Property<string>("coverType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("imageLocation")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("nobateChap")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("offPrice")
                        .HasColumnType("int");

                    b.Property<string>("pageType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("price")
                        .HasColumnType("int");

                    b.Property<string>("publishDate")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("salesCount")
                        .HasColumnType("int");

                    b.HasKey("id");

                    b.ToTable("books");
                });

            modelBuilder.Entity("BookStoreApi.Models.BookCategory", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("bookId")
                        .HasColumnType("int");

                    b.Property<int>("categoryId")
                        .HasColumnType("int");

                    b.HasKey("id");

                    b.HasIndex("bookId");

                    b.HasIndex("categoryId");

                    b.ToTable("book_category");
                });

            modelBuilder.Entity("BookStoreApi.Models.BookPublisher", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("bookId")
                        .HasColumnType("int");

                    b.Property<int>("publisherId")
                        .HasColumnType("int");

                    b.HasKey("id");

                    b.HasIndex("bookId");

                    b.HasIndex("publisherId");

                    b.ToTable("book_publisher");
                });

            modelBuilder.Entity("BookStoreApi.Models.BookTranslator", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("bookId")
                        .HasColumnType("int");

                    b.Property<int>("translatorId")
                        .HasColumnType("int");

                    b.HasKey("id");

                    b.HasIndex("bookId");

                    b.HasIndex("translatorId");

                    b.ToTable("Book_translator");
                });

            modelBuilder.Entity("BookStoreApi.Models.BookWriter", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("bookId")
                        .HasColumnType("int");

                    b.Property<int>("writerId")
                        .HasColumnType("int");

                    b.HasKey("id");

                    b.HasIndex("bookId");

                    b.HasIndex("writerId");

                    b.ToTable("book_writer");
                });

            modelBuilder.Entity("BookStoreApi.Models.Carousel", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("imageLocation")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("link")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("carousels");
                });

            modelBuilder.Entity("BookStoreApi.Models.Category", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("categories");
                });

            modelBuilder.Entity("BookStoreApi.Models.City", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("stateid")
                        .HasColumnType("int");

                    b.HasKey("id");

                    b.HasIndex("stateid");

                    b.ToTable("cities");
                });

            modelBuilder.Entity("BookStoreApi.Models.Comment", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("bookId")
                        .HasColumnType("int");

                    b.Property<int>("commentStateId")
                        .HasColumnType("int");

                    b.Property<string>("text")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("userId")
                        .HasColumnType("int");

                    b.HasKey("id");

                    b.HasIndex("bookId");

                    b.HasIndex("commentStateId");

                    b.HasIndex("userId");

                    b.ToTable("comments");
                });

            modelBuilder.Entity("BookStoreApi.Models.CommentState", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("title")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("commentState");
                });

            modelBuilder.Entity("BookStoreApi.Models.LikedBook", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("BookId")
                        .HasColumnType("int");

                    b.Property<int>("userId")
                        .HasColumnType("int");

                    b.HasKey("id");

                    b.HasIndex("BookId");

                    b.HasIndex("userId");

                    b.ToTable("likedBooks");
                });

            modelBuilder.Entity("BookStoreApi.Models.Order", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("creationDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("orderSecret")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("orderStateId")
                        .HasColumnType("int");

                    b.Property<DateTime>("paymentTime")
                        .HasColumnType("datetime2");

                    b.Property<int>("totalPrice")
                        .HasColumnType("int");

                    b.Property<int>("userId")
                        .HasColumnType("int");

                    b.HasKey("id");

                    b.HasIndex("orderStateId");

                    b.HasIndex("userId");

                    b.ToTable("orders");
                });

            modelBuilder.Entity("BookStoreApi.Models.OrderDetails", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("bookId")
                        .HasColumnType("int");

                    b.Property<int>("orderId")
                        .HasColumnType("int");

                    b.HasKey("id");

                    b.HasIndex("bookId");

                    b.HasIndex("orderId");

                    b.ToTable("orderDetails");
                });

            modelBuilder.Entity("BookStoreApi.Models.OrderState", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("orderStates");

                    b.HasData(
                        new
                        {
                            id = 1,
                            name = "پرداخت نشده"
                        },
                        new
                        {
                            id = 2,
                            name = "پرداخت شده"
                        },
                        new
                        {
                            id = 3,
                            name = "در حال پردازش"
                        },
                        new
                        {
                            id = 4,
                            name = "ارسال شده"
                        });
                });

            modelBuilder.Entity("BookStoreApi.Models.Page", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("pages");
                });

            modelBuilder.Entity("BookStoreApi.Models.PageBook", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("bookId")
                        .HasColumnType("int");

                    b.Property<int>("pageId")
                        .HasColumnType("int");

                    b.HasKey("id");

                    b.HasIndex("bookId");

                    b.HasIndex("pageId");

                    b.ToTable("page_book");
                });

            modelBuilder.Entity("BookStoreApi.Models.PageCategory", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("categoryId")
                        .HasColumnType("int");

                    b.Property<int>("pageId")
                        .HasColumnType("int");

                    b.HasKey("id");

                    b.HasIndex("categoryId");

                    b.HasIndex("pageId");

                    b.ToTable("page_category");
                });

            modelBuilder.Entity("BookStoreApi.Models.PagePublisher", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("pageId")
                        .HasColumnType("int");

                    b.Property<int>("publisherId")
                        .HasColumnType("int");

                    b.HasKey("id");

                    b.HasIndex("pageId");

                    b.HasIndex("publisherId");

                    b.ToTable("page_publisher");
                });

            modelBuilder.Entity("BookStoreApi.Models.PageTranslator", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("pageId")
                        .HasColumnType("int");

                    b.Property<int>("translatorId")
                        .HasColumnType("int");

                    b.HasKey("id");

                    b.HasIndex("pageId");

                    b.HasIndex("translatorId");

                    b.ToTable("page_translator");
                });

            modelBuilder.Entity("BookStoreApi.Models.PageWriter", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("pageId")
                        .HasColumnType("int");

                    b.Property<int>("writerId")
                        .HasColumnType("int");

                    b.HasKey("id");

                    b.HasIndex("pageId");

                    b.HasIndex("writerId");

                    b.ToTable("page_writer");
                });

            modelBuilder.Entity("BookStoreApi.Models.Publisher", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("publishers");
                });

            modelBuilder.Entity("BookStoreApi.Models.Role", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("roles");

                    b.HasData(
                        new
                        {
                            id = 1,
                            name = "admin"
                        },
                        new
                        {
                            id = 2,
                            name = "user"
                        },
                        new
                        {
                            id = 3,
                            name = "customeAdmin"
                        });
                });

            modelBuilder.Entity("BookStoreApi.Models.Setting", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("settings");

                    b.HasData(
                        new
                        {
                            id = 1,
                            name = "pageDataCount",
                            value = "20"
                        },
                        new
                        {
                            id = 2,
                            name = "aboutUs",
                            value = ""
                        },
                        new
                        {
                            id = 3,
                            name = "contactUs",
                            value = ""
                        },
                        new
                        {
                            id = 4,
                            name = "namadEtebar",
                            value = ""
                        },
                        new
                        {
                            id = 5,
                            name = "samandehi",
                            value = ""
                        });
                });

            modelBuilder.Entity("BookStoreApi.Models.Shelf", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("shelves");
                });

            modelBuilder.Entity("BookStoreApi.Models.ShelfBook", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("bookId")
                        .HasColumnType("int");

                    b.Property<int>("shelfId")
                        .HasColumnType("int");

                    b.HasKey("id");

                    b.HasIndex("bookId");

                    b.HasIndex("shelfId");

                    b.ToTable("shelf_book");
                });

            modelBuilder.Entity("BookStoreApi.Models.State", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("states");
                });

            modelBuilder.Entity("BookStoreApi.Models.Translator", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("translators");
                });

            modelBuilder.Entity("BookStoreApi.Models.UploadedFile", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("describe")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("filePath")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("fileType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("files");
                });

            modelBuilder.Entity("BookStoreApi.Models.User", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("city")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("creationDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("phoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("roleId")
                        .HasColumnType("int");

                    b.Property<string>("state")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("userName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("zipCode")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.HasIndex("roleId");

                    b.ToTable("users");
                });

            modelBuilder.Entity("BookStoreApi.Models.Writer", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("writers");
                });

            modelBuilder.Entity("BookStoreApi.Models.BookCategory", b =>
                {
                    b.HasOne("BookStoreApi.Models.Book", "book")
                        .WithMany()
                        .HasForeignKey("bookId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BookStoreApi.Models.Category", "Category")
                        .WithMany()
                        .HasForeignKey("categoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("book");

                    b.Navigation("Category");
                });

            modelBuilder.Entity("BookStoreApi.Models.BookPublisher", b =>
                {
                    b.HasOne("BookStoreApi.Models.Book", "book")
                        .WithMany()
                        .HasForeignKey("bookId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BookStoreApi.Models.Publisher", "publisher")
                        .WithMany()
                        .HasForeignKey("publisherId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("book");

                    b.Navigation("publisher");
                });

            modelBuilder.Entity("BookStoreApi.Models.BookTranslator", b =>
                {
                    b.HasOne("BookStoreApi.Models.Book", "book")
                        .WithMany()
                        .HasForeignKey("bookId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BookStoreApi.Models.Translator", "translator")
                        .WithMany()
                        .HasForeignKey("translatorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("book");

                    b.Navigation("translator");
                });

            modelBuilder.Entity("BookStoreApi.Models.BookWriter", b =>
                {
                    b.HasOne("BookStoreApi.Models.Book", "book")
                        .WithMany()
                        .HasForeignKey("bookId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BookStoreApi.Models.Writer", "writer")
                        .WithMany()
                        .HasForeignKey("writerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("book");

                    b.Navigation("writer");
                });

            modelBuilder.Entity("BookStoreApi.Models.City", b =>
                {
                    b.HasOne("BookStoreApi.Models.State", "state")
                        .WithMany()
                        .HasForeignKey("stateid")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("state");
                });

            modelBuilder.Entity("BookStoreApi.Models.Comment", b =>
                {
                    b.HasOne("BookStoreApi.Models.Book", "book")
                        .WithMany()
                        .HasForeignKey("bookId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BookStoreApi.Models.CommentState", "commentState")
                        .WithMany()
                        .HasForeignKey("commentStateId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BookStoreApi.Models.User", "user")
                        .WithMany()
                        .HasForeignKey("userId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("book");

                    b.Navigation("commentState");

                    b.Navigation("user");
                });

            modelBuilder.Entity("BookStoreApi.Models.LikedBook", b =>
                {
                    b.HasOne("BookStoreApi.Models.Book", "Book")
                        .WithMany()
                        .HasForeignKey("BookId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BookStoreApi.Models.User", "user")
                        .WithMany()
                        .HasForeignKey("userId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Book");

                    b.Navigation("user");
                });

            modelBuilder.Entity("BookStoreApi.Models.Order", b =>
                {
                    b.HasOne("BookStoreApi.Models.OrderState", "orderState")
                        .WithMany()
                        .HasForeignKey("orderStateId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BookStoreApi.Models.User", "user")
                        .WithMany()
                        .HasForeignKey("userId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("orderState");

                    b.Navigation("user");
                });

            modelBuilder.Entity("BookStoreApi.Models.OrderDetails", b =>
                {
                    b.HasOne("BookStoreApi.Models.Book", "book")
                        .WithMany()
                        .HasForeignKey("bookId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BookStoreApi.Models.Order", "order")
                        .WithMany()
                        .HasForeignKey("orderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("book");

                    b.Navigation("order");
                });

            modelBuilder.Entity("BookStoreApi.Models.PageBook", b =>
                {
                    b.HasOne("BookStoreApi.Models.Book", "book")
                        .WithMany()
                        .HasForeignKey("bookId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BookStoreApi.Models.Page", "page")
                        .WithMany()
                        .HasForeignKey("pageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("book");

                    b.Navigation("page");
                });

            modelBuilder.Entity("BookStoreApi.Models.PageCategory", b =>
                {
                    b.HasOne("BookStoreApi.Models.Category", "category")
                        .WithMany()
                        .HasForeignKey("categoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BookStoreApi.Models.Page", "page")
                        .WithMany()
                        .HasForeignKey("pageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("category");

                    b.Navigation("page");
                });

            modelBuilder.Entity("BookStoreApi.Models.PagePublisher", b =>
                {
                    b.HasOne("BookStoreApi.Models.Page", "page")
                        .WithMany()
                        .HasForeignKey("pageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BookStoreApi.Models.Publisher", "publisher")
                        .WithMany()
                        .HasForeignKey("publisherId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("page");

                    b.Navigation("publisher");
                });

            modelBuilder.Entity("BookStoreApi.Models.PageTranslator", b =>
                {
                    b.HasOne("BookStoreApi.Models.Page", "page")
                        .WithMany()
                        .HasForeignKey("pageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BookStoreApi.Models.Translator", "translator")
                        .WithMany()
                        .HasForeignKey("translatorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("page");

                    b.Navigation("translator");
                });

            modelBuilder.Entity("BookStoreApi.Models.PageWriter", b =>
                {
                    b.HasOne("BookStoreApi.Models.Page", "page")
                        .WithMany()
                        .HasForeignKey("pageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BookStoreApi.Models.Writer", "writer")
                        .WithMany()
                        .HasForeignKey("writerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("page");

                    b.Navigation("writer");
                });

            modelBuilder.Entity("BookStoreApi.Models.ShelfBook", b =>
                {
                    b.HasOne("BookStoreApi.Models.Book", "book")
                        .WithMany()
                        .HasForeignKey("bookId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BookStoreApi.Models.Shelf", "shelf")
                        .WithMany()
                        .HasForeignKey("shelfId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("book");

                    b.Navigation("shelf");
                });

            modelBuilder.Entity("BookStoreApi.Models.User", b =>
                {
                    b.HasOne("BookStoreApi.Models.Role", "role")
                        .WithMany()
                        .HasForeignKey("roleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("role");
                });
#pragma warning restore 612, 618
        }
    }
}
