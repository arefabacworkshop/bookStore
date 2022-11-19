using Microsoft.EntityFrameworkCore.Migrations;

namespace BookStoreApi.Migrations
{
    public partial class addCommentState : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "commentStateId",
                table: "comments",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "CommentState",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    title = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CommentState", x => x.id);
                });
            
            migrationBuilder.CreateIndex(
                name: "IX_comments_commentStateId",
                table: "comments",
                column: "commentStateId");

            migrationBuilder.AddForeignKey(
                name: "FK_comments_CommentState_commentStateId",
                table: "comments",
                column: "commentStateId",
                principalTable: "CommentState",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_comments_CommentState_commentStateId",
                table: "comments");

            migrationBuilder.DropTable(
                name: "CommentState");

            migrationBuilder.DropIndex(
                name: "IX_comments_commentStateId",
                table: "comments");

            migrationBuilder.DropColumn(
                name: "commentStateId",
                table: "comments");
            
        }
    }
}
