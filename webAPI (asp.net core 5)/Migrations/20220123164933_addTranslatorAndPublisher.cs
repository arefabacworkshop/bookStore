using Microsoft.EntityFrameworkCore.Migrations;

namespace BookStoreApi.Migrations
{
    public partial class addTranslatorAndPublisher : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "publishers",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_publishers", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "translators",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_translators", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "book_publisher",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    publisherId = table.Column<int>(type: "int", nullable: false),
                    bookId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_book_publisher", x => x.id);
                    table.ForeignKey(
                        name: "FK_book_publisher_books_bookId",
                        column: x => x.bookId,
                        principalTable: "books",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_book_publisher_publishers_publisherId",
                        column: x => x.publisherId,
                        principalTable: "publishers",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Book_translator",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    translatorId = table.Column<int>(type: "int", nullable: false),
                    bookId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Book_translator", x => x.id);
                    table.ForeignKey(
                        name: "FK_Book_translator_books_bookId",
                        column: x => x.bookId,
                        principalTable: "books",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Book_translator_translators_translatorId",
                        column: x => x.translatorId,
                        principalTable: "translators",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_book_publisher_bookId",
                table: "book_publisher",
                column: "bookId");

            migrationBuilder.CreateIndex(
                name: "IX_book_publisher_publisherId",
                table: "book_publisher",
                column: "publisherId");

            migrationBuilder.CreateIndex(
                name: "IX_Book_translator_bookId",
                table: "Book_translator",
                column: "bookId");

            migrationBuilder.CreateIndex(
                name: "IX_Book_translator_translatorId",
                table: "Book_translator",
                column: "translatorId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "book_publisher");

            migrationBuilder.DropTable(
                name: "Book_translator");

            migrationBuilder.DropTable(
                name: "publishers");

            migrationBuilder.DropTable(
                name: "translators");
        }
    }
}
