using Microsoft.EntityFrameworkCore.Migrations;

namespace BookStoreApi.Migrations
{
    public partial class merchantIdAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "settings",
                columns: new[] { "id", "name", "value" },
                values: new object[] { 6, "merchantId", "" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "settings",
                keyColumn: "id",
                keyValue: 6);
        }
    }
}
