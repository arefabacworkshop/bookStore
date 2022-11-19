using Microsoft.EntityFrameworkCore.Migrations;

namespace BookStoreApi.Migrations
{
    public partial class seedRolesAndAddSecretToTheOrder : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "orderSecret",
                table: "orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "roles",
                columns: new[] { "id", "name" },
                values: new object[] { 1, "admin" });

            migrationBuilder.InsertData(
                table: "roles",
                columns: new[] { "id", "name" },
                values: new object[] { 2, "user" });

            migrationBuilder.InsertData(
                table: "roles",
                columns: new[] { "id", "name" },
                values: new object[] { 3, "customeAdmin" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "roles",
                keyColumn: "id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "roles",
                keyColumn: "id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "roles",
                keyColumn: "id",
                keyValue: 3);

            migrationBuilder.DropColumn(
                name: "orderSecret",
                table: "orders");
        }
    }
}
