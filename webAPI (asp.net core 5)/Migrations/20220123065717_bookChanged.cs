using Microsoft.EntityFrameworkCore.Migrations;

namespace BookStoreApi.Migrations
{
    public partial class bookChanged : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BookNo",
                table: "books",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Describtion",
                table: "books",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "bookSize",
                table: "books",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "coverType",
                table: "books",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "imageLocation",
                table: "books",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "nobateChap",
                table: "books",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "pageType",
                table: "books",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "publishDate",
                table: "books",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BookNo",
                table: "books");

            migrationBuilder.DropColumn(
                name: "Describtion",
                table: "books");

            migrationBuilder.DropColumn(
                name: "bookSize",
                table: "books");

            migrationBuilder.DropColumn(
                name: "coverType",
                table: "books");

            migrationBuilder.DropColumn(
                name: "imageLocation",
                table: "books");

            migrationBuilder.DropColumn(
                name: "nobateChap",
                table: "books");

            migrationBuilder.DropColumn(
                name: "pageType",
                table: "books");

            migrationBuilder.DropColumn(
                name: "publishDate",
                table: "books");
        }
    }
}
