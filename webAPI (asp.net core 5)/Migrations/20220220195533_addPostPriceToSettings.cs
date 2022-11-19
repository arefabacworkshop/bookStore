using Microsoft.EntityFrameworkCore.Migrations;

namespace BookStoreApi.Migrations
{
    public partial class addPostPriceToSettings : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "settings",
                columns: new[] { "id", "name", "value" },
                values: new object[] { 7, "postPrice", "150000" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "settings",
                keyColumn: "id",
                keyValue: 7);
        }
    }
}
