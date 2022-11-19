using Microsoft.EntityFrameworkCore.Migrations;

namespace BookStoreApi.Migrations
{
    public partial class typeAndSubCategoryRemoved : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_book_category_subCategories_subCategoryId",
                table: "book_category");

            migrationBuilder.DropForeignKey(
                name: "FK_categories_types_TypeId",
                table: "categories");

            migrationBuilder.DropTable(
                name: "subCategories");

            migrationBuilder.DropTable(
                name: "types");

            migrationBuilder.DropIndex(
                name: "IX_categories_TypeId",
                table: "categories");

            migrationBuilder.DropColumn(
                name: "TypeId",
                table: "categories");

            migrationBuilder.RenameColumn(
                name: "subCategoryId",
                table: "book_category",
                newName: "categoryId");

            migrationBuilder.RenameIndex(
                name: "IX_book_category_subCategoryId",
                table: "book_category",
                newName: "IX_book_category_categoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_book_category_categories_categoryId",
                table: "book_category",
                column: "categoryId",
                principalTable: "categories",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_book_category_categories_categoryId",
                table: "book_category");

            migrationBuilder.RenameColumn(
                name: "categoryId",
                table: "book_category",
                newName: "subCategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_book_category_categoryId",
                table: "book_category",
                newName: "IX_book_category_subCategoryId");

            migrationBuilder.AddColumn<int>(
                name: "TypeId",
                table: "categories",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "subCategories",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    categoryId = table.Column<int>(type: "int", nullable: false),
                    subCategoryName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_subCategories", x => x.id);
                    table.ForeignKey(
                        name: "FK_subCategories_categories_categoryId",
                        column: x => x.categoryId,
                        principalTable: "categories",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "types",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_types", x => x.id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_categories_TypeId",
                table: "categories",
                column: "TypeId");

            migrationBuilder.CreateIndex(
                name: "IX_subCategories_categoryId",
                table: "subCategories",
                column: "categoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_book_category_subCategories_subCategoryId",
                table: "book_category",
                column: "subCategoryId",
                principalTable: "subCategories",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_categories_types_TypeId",
                table: "categories",
                column: "TypeId",
                principalTable: "types",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
