using Microsoft.EntityFrameworkCore.Migrations;

namespace BookStoreApi.Migrations
{
    public partial class orderStateToOrder : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "orderState",
                table: "orders",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "orderState",
                table: "orders");
        }
    }
}
