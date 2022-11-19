using Microsoft.EntityFrameworkCore.Migrations;

namespace BookStoreApi.Migrations
{
    public partial class commentStatesChanged : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_comments_CommentState_commentStateId",
                table: "comments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CommentState",
                table: "CommentState");

            migrationBuilder.RenameTable(
                name: "CommentState",
                newName: "commentState");

            migrationBuilder.AddPrimaryKey(
                name: "PK_commentState",
                table: "commentState",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_comments_commentState_commentStateId",
                table: "comments",
                column: "commentStateId",
                principalTable: "commentState",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_comments_commentState_commentStateId",
                table: "comments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_commentState",
                table: "commentState");

            migrationBuilder.RenameTable(
                name: "commentState",
                newName: "CommentState");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CommentState",
                table: "CommentState",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_comments_CommentState_commentStateId",
                table: "comments",
                column: "commentStateId",
                principalTable: "CommentState",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
