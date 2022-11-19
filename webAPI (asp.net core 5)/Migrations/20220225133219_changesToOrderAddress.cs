using Microsoft.EntityFrameworkCore.Migrations;

namespace BookStoreApi.Migrations
{
    public partial class changesToOrderAddress : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_orders_addresses_addressId",
                table: "orders");

            migrationBuilder.DropIndex(
                name: "IX_orders_addressId",
                table: "orders");

            migrationBuilder.DropColumn(
                name: "addressId",
                table: "orders");

            migrationBuilder.AddColumn<string>(
                name: "address",
                table: "orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "city",
                table: "orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "phoneNumber",
                table: "orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "receiverName",
                table: "orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "state",
                table: "orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "zipCode",
                table: "orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "phoneNumber",
                table: "addresses",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "address",
                table: "orders");

            migrationBuilder.DropColumn(
                name: "city",
                table: "orders");

            migrationBuilder.DropColumn(
                name: "phoneNumber",
                table: "orders");

            migrationBuilder.DropColumn(
                name: "receiverName",
                table: "orders");

            migrationBuilder.DropColumn(
                name: "state",
                table: "orders");

            migrationBuilder.DropColumn(
                name: "zipCode",
                table: "orders");

            migrationBuilder.DropColumn(
                name: "phoneNumber",
                table: "addresses");

            migrationBuilder.AddColumn<int>(
                name: "addressId",
                table: "orders",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_orders_addressId",
                table: "orders",
                column: "addressId");

            migrationBuilder.AddForeignKey(
                name: "FK_orders_addresses_addressId",
                table: "orders",
                column: "addressId",
                principalTable: "addresses",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
