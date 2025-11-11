/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `users` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Post] (
    [id] INT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(1000) NOT NULL,
    [content] NVARCHAR(1000) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [Post_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    [authorId] INT,
    CONSTRAINT [Post_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- RedefineTables
BEGIN TRANSACTION;
ALTER TABLE [dbo].[users] DROP CONSTRAINT [users_email_key];
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'users'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_users] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000),
    [email] NVARCHAR(1000),
    [password] NVARCHAR(1000),
    [created_at] DATETIME2 NOT NULL CONSTRAINT [users_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    [facebook_token] NVARCHAR(1000),
    [linkedin_token] NVARCHAR(1000),
    [x_token] NVARCHAR(1000),
    [youtube_token] NVARCHAR(1000),
    [tiktok_token] NVARCHAR(1000),
    [telegram_token] NVARCHAR(1000),
    [instagram_token] NVARCHAR(1000),
    [pinterest_token] NVARCHAR(1000),
    [reddit_token] NVARCHAR(1000),
    [google_token] NVARCHAR(1000),
    [bluesky_token] NVARCHAR(1000),
    [whatsapp_token] NVARCHAR(1000),
    [wechat_token] NVARCHAR(1000),
    CONSTRAINT [users_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [users_email_key] UNIQUE NONCLUSTERED ([email])
);
SET IDENTITY_INSERT [dbo].[_prisma_new_users] ON;
IF EXISTS(SELECT * FROM [dbo].[users])
    EXEC('INSERT INTO [dbo].[_prisma_new_users] ([bluesky_token],[created_at],[email],[facebook_token],[google_token],[id],[instagram_token],[linkedin_token],[name],[password],[pinterest_token],[reddit_token],[telegram_token],[tiktok_token],[updated_at],[wechat_token],[whatsapp_token],[x_token],[youtube_token]) SELECT [bluesky_token],[created_at],[email],[facebook_token],[google_token],[id],[instagram_token],[linkedin_token],[name],[password],[pinterest_token],[reddit_token],[telegram_token],[tiktok_token],[updated_at],[wechat_token],[whatsapp_token],[x_token],[youtube_token] FROM [dbo].[users] WITH (holdlock tablockx)');
SET IDENTITY_INSERT [dbo].[_prisma_new_users] OFF;
DROP TABLE [dbo].[users];
EXEC SP_RENAME N'dbo._prisma_new_users', N'users';
COMMIT;

-- AddForeignKey
ALTER TABLE [dbo].[Post] ADD CONSTRAINT [Post_authorId_fkey] FOREIGN KEY ([authorId]) REFERENCES [dbo].[users]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
