using Microsoft.EntityFrameworkCore.Migrations;

namespace BookStoreApi.Migrations
{
    public partial class addOrderState : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "orderState",
                table: "orders");

            migrationBuilder.AddColumn<int>(
                name: "orderStateId",
                table: "orders",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "orderStates",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_orderStates", x => x.id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_orders_orderStateId",
                table: "orders",
                column: "orderStateId");

            migrationBuilder.AddForeignKey(
                name: "FK_orders_orderStates_orderStateId",
                table: "orders",
                column: "orderStateId",
                principalTable: "orderStates",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_orders_orderStates_orderStateId",
                table: "orders");

            migrationBuilder.DropTable(
                name: "orderStates");

            migrationBuilder.DropIndex(
                name: "IX_orders_orderStateId",
                table: "orders");

            migrationBuilder.DropColumn(
                name: "orderStateId",
                table: "orders");

            migrationBuilder.AddColumn<string>(
                name: "orderState",
                table: "orders",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
