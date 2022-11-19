using Microsoft.EntityFrameworkCore.Migrations;

namespace BookStoreApi.Migrations
{
    public partial class addAddressTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "users");

            migrationBuilder.DropColumn(
                name: "city",
                table: "users");

            migrationBuilder.DropColumn(
                name: "state",
                table: "users");

            migrationBuilder.DropColumn(
                name: "zipCode",
                table: "users");

            migrationBuilder.AddColumn<int>(
                name: "addressId",
                table: "orders",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "addresses",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    receiverName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    city = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    state = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    zipcode = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_addresses", x => x.id);
                });

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_orders_addresses_addressId",
                table: "orders");

            migrationBuilder.DropTable(
                name: "addresses");

            migrationBuilder.DropIndex(
                name: "IX_orders_addressId",
                table: "orders");

            migrationBuilder.DropColumn(
                name: "addressId",
                table: "orders");

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "city",
                table: "users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "state",
                table: "users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "zipCode",
                table: "users",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
