using Microsoft.EntityFrameworkCore.Migrations;

namespace BookStoreApi.Migrations
{
    public partial class addSamandehiAndEtebarToSettings : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "settings",
                columns: new[] { "id", "name", "value" },
                values: new object[] { 4, "namadEtebar", "" });

            migrationBuilder.InsertData(
                table: "settings",
                columns: new[] { "id", "name", "value" },
                values: new object[] { 5, "samandehi", "" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "settings",
                keyColumn: "id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "settings",
                keyColumn: "id",
                keyValue: 5);
        }
    }
}
