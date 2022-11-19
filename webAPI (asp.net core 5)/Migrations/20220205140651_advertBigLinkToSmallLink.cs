using Microsoft.EntityFrameworkCore.Migrations;

namespace BookStoreApi.Migrations
{
    public partial class advertBigLinkToSmallLink : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Link",
                table: "adverts",
                newName: "link");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "link",
                table: "adverts",
                newName: "Link");
        }
    }
}
