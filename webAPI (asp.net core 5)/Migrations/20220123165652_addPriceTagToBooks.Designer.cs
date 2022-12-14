// <auto-generated />
using BookStoreApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace BookStoreApi.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20220123165652_addPriceTagToBooks")]
    partial class addPriceTagToBooks
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.11")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

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

                    b.Property<string>("coverType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("imageLocation")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("nobateChap")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("pageType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("price")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("publishDate")
                        .HasColumnType("nvarchar(max)");

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

                    b.Property<string>("ImageLocation")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Link")
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

                    b.Property<int>("cityid")
                        .HasColumnType("int");

                    b.Property<string>("name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("phoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("roleId")
                        .HasColumnType("int");

                    b.Property<string>("userName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.HasIndex("cityid");

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
                    b.HasOne("BookStoreApi.Models.City", "city")
                        .WithMany()
                        .HasForeignKey("cityid")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BookStoreApi.Models.Role", "role")
                        .WithMany()
                        .HasForeignKey("roleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("city");

                    b.Navigation("role");
                });
#pragma warning restore 612, 618
        }
    }
}
