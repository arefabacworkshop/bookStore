using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BookStoreApi.Migrations
{
    public partial class addPaymentTimeToOrder : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "paymentTime",
                table: "orders",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "paymentTime",
                table: "orders");
        }
    }
}
