BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[users] (
    [id] NVARCHAR(1000) NOT NULL,
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

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
