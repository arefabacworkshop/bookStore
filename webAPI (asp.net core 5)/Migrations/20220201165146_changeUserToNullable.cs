using Microsoft.EntityFrameworkCore.Migrations;

namespace BookStoreApi.Migrations
{
    public partial class changeUserToNullable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_users_cities_cityid",
                table: "users");

            migrationBuilder.DropIndex(
                name: "IX_users_cityid",
                table: "users");

            migrationBuilder.DropColumn(
                name: "cityid",
                table: "users");

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
        }

        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<int>(
                name: "cityid",
                table: "users",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_users_cityid",
                table: "users",
                column: "cityid");

            migrationBuilder.AddForeignKey(
                name: "FK_users_cities_cityid",
                table: "users",
                column: "cityid",
                principalTable: "cities",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
