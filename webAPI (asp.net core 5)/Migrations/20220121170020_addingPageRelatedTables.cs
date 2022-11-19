using Microsoft.EntityFrameworkCore.Migrations;

namespace BookStoreApi.Migrations
{
    public partial class addingPageRelatedTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "carousels",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ImageLocation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Link = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_carousels", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "shelves",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_shelves", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "shelf_book",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    shelfId = table.Column<int>(type: "int", nullable: false),
                    bookId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_shelf_book", x => x.id);
                    table.ForeignKey(
                        name: "FK_shelf_book_books_bookId",
                        column: x => x.bookId,
                        principalTable: "books",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_shelf_book_shelves_shelfId",
                        column: x => x.shelfId,
                        principalTable: "shelves",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_shelf_book_bookId",
                table: "shelf_book",
                column: "bookId");

            migrationBuilder.CreateIndex(
                name: "IX_shelf_book_shelfId",
                table: "shelf_book",
                column: "shelfId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "carousels");

            migrationBuilder.DropTable(
                name: "shelf_book");

            migrationBuilder.DropTable(
                name: "shelves");
        }
    }
}
