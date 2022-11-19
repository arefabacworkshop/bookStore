using Microsoft.EntityFrameworkCore.Migrations;

namespace BookStoreApi.Migrations
{
    public partial class user_access : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "user_access",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    userId = table.Column<int>(type: "int", nullable: false),
                    dashboard = table.Column<bool>(type: "bit", nullable: false),
                    bookManagement = table.Column<bool>(type: "bit", nullable: false),
                    mainPageManagement = table.Column<bool>(type: "bit", nullable: false),
                    salesManagement = table.Column<bool>(type: "bit", nullable: false),
                    userManagement = table.Column<bool>(type: "bit", nullable: false),
                    CustomePageManagement = table.Column<bool>(type: "bit", nullable: false),
                    commentManagement = table.Column<bool>(type: "bit", nullable: false),
                    Settings = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user_access", x => x.id);
                    table.ForeignKey(
                        name: "FK_user_access_users_userId",
                        column: x => x.userId,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_user_access_userId",
                table: "user_access",
                column: "userId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "user_access");
        }
    }
}
