using Microsoft.EntityFrameworkCore.Migrations;

namespace BookStoreApi.Migrations
{
    public partial class contactUsAndAboutUs : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "settings",
                columns: new[] { "id", "name", "value" },
                values: new object[] { 2, "aboutUs", "" });

            migrationBuilder.InsertData(
                table: "settings",
                columns: new[] { "id", "name", "value" },
                values: new object[] { 3, "contactUs", "" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "settings",
                keyColumn: "id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "settings",
                keyColumn: "id",
                keyValue: 3);
        }
    }
}
