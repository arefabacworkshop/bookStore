using Microsoft.EntityFrameworkCore.Migrations;

namespace BookStoreApi.Migrations
{
    public partial class changeCarouselNames : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Link",
                table: "carousels",
                newName: "link");

            migrationBuilder.RenameColumn(
                name: "ImageLocation",
                table: "carousels",
                newName: "imageLocation");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "link",
                table: "carousels",
                newName: "Link");

            migrationBuilder.RenameColumn(
                name: "imageLocation",
                table: "carousels",
                newName: "ImageLocation");
        }
    }
}
