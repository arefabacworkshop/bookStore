using Microsoft.EntityFrameworkCore.Migrations;

namespace BookStoreApi.Migrations
{
    public partial class addCustomePages : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "pages",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_pages", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "page_book",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    pageId = table.Column<int>(type: "int", nullable: false),
                    bookId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_page_book", x => x.id);
                    table.ForeignKey(
                        name: "FK_page_book_books_bookId",
                        column: x => x.bookId,
                        principalTable: "books",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_page_book_pages_pageId",
                        column: x => x.pageId,
                        principalTable: "pages",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "page_category",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    pageId = table.Column<int>(type: "int", nullable: false),
                    categoryId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_page_category", x => x.id);
                    table.ForeignKey(
                        name: "FK_page_category_categories_categoryId",
                        column: x => x.categoryId,
                        principalTable: "categories",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_page_category_pages_pageId",
                        column: x => x.pageId,
                        principalTable: "pages",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "page_publisher",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    pageId = table.Column<int>(type: "int", nullable: false),
                    publisherId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_page_publisher", x => x.id);
                    table.ForeignKey(
                        name: "FK_page_publisher_pages_pageId",
                        column: x => x.pageId,
                        principalTable: "pages",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_page_publisher_publishers_publisherId",
                        column: x => x.publisherId,
                        principalTable: "publishers",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "page_translator",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    pageId = table.Column<int>(type: "int", nullable: false),
                    translatorId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_page_translator", x => x.id);
                    table.ForeignKey(
                        name: "FK_page_translator_pages_pageId",
                        column: x => x.pageId,
                        principalTable: "pages",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_page_translator_translators_translatorId",
                        column: x => x.translatorId,
                        principalTable: "translators",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "page_writer",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    pageId = table.Column<int>(type: "int", nullable: false),
                    writerId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_page_writer", x => x.id);
                    table.ForeignKey(
                        name: "FK_page_writer_pages_pageId",
                        column: x => x.pageId,
                        principalTable: "pages",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_page_writer_writers_writerId",
                        column: x => x.writerId,
                        principalTable: "writers",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_page_book_bookId",
                table: "page_book",
                column: "bookId");

            migrationBuilder.CreateIndex(
                name: "IX_page_book_pageId",
                table: "page_book",
                column: "pageId");

            migrationBuilder.CreateIndex(
                name: "IX_page_category_categoryId",
                table: "page_category",
                column: "categoryId");

            migrationBuilder.CreateIndex(
                name: "IX_page_category_pageId",
                table: "page_category",
                column: "pageId");

            migrationBuilder.CreateIndex(
                name: "IX_page_publisher_pageId",
                table: "page_publisher",
                column: "pageId");

            migrationBuilder.CreateIndex(
                name: "IX_page_publisher_publisherId",
                table: "page_publisher",
                column: "publisherId");

            migrationBuilder.CreateIndex(
                name: "IX_page_translator_pageId",
                table: "page_translator",
                column: "pageId");

            migrationBuilder.CreateIndex(
                name: "IX_page_translator_translatorId",
                table: "page_translator",
                column: "translatorId");

            migrationBuilder.CreateIndex(
                name: "IX_page_writer_pageId",
                table: "page_writer",
                column: "pageId");

            migrationBuilder.CreateIndex(
                name: "IX_page_writer_writerId",
                table: "page_writer",
                column: "writerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "page_book");

            migrationBuilder.DropTable(
                name: "page_category");

            migrationBuilder.DropTable(
                name: "page_publisher");

            migrationBuilder.DropTable(
                name: "page_translator");

            migrationBuilder.DropTable(
                name: "page_writer");

            migrationBuilder.DropTable(
                name: "pages");
        }
    }
}
