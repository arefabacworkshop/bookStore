using Microsoft.EntityFrameworkCore.Migrations;

namespace BookStoreApi.Migrations
{
    public partial class seedOrderState : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "orderStates",
                columns: new[] { "id", "name" },
                values: new object[,]
                {
                    { 1, "پرداخت نشده" },
                    { 2, "پرداخت شده" },
                    { 3, "در حال پردازش" },
                    { 4, "ارسال شده" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "orderStates",
                keyColumn: "id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "orderStates",
                keyColumn: "id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "orderStates",
                keyColumn: "id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "orderStates",
                keyColumn: "id",
                keyValue: 4);
        }
    }
}
