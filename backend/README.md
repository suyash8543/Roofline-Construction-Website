# Roofline ASP.NET Core Web API

This API receives the estimate form, validates the visitor's details, accepts up to 8 roof photos, and emails the complete request to the configured receiving address. Photos are attached to the email and are not persisted by the API.

## 1. Requirements
- .NET 8 SDK
- An SMTP account. Gmail works with an App Password when 2-Step Verification is enabled.

## 2. Configure SMTP securely
Do NOT commit real passwords into `appsettings.json`.

For local development, from this folder:

```bash
dotnet user-secrets init
dotnet user-secrets set "Smtp:Host" "smtp.gmail.com"
dotnet user-secrets set "Smtp:Port" "587"
dotnet user-secrets set "Smtp:Username" "your-sending-email@gmail.com"
dotnet user-secrets set "Smtp:Password" "your-16-character-app-password"
dotnet user-secrets set "Smtp:FromEmail" "your-sending-email@gmail.com"
dotnet user-secrets set "Smtp:FromName" "Roofline Website"
dotnet user-secrets set "Smtp:ToEmail" "your-company-email@example.com"
```

Set `Frontend:Url` to your deployed React URL when deploying.

## 3. Run

```bash
dotnet restore
dotnet run
```



## 4. Frontend environment
Create a `.env` file in the React project:




## 5. Email behavior
A successful submission sends an email with:
- Visitor name
- Phone
- Email (also used as Reply-To)
- Property address
- Requested service
- Message
- Uploaded roof photos as email attachments

The API does not save uploaded photos to disk/database.

## Production notes
- Use HTTPS for both frontend and API.
- Store SMTP secrets in environment variables or your hosting provider's secret manager.
- Replace demo client contact details and testimonials in the frontend.
- Restrict CORS to the final production domain.
- Consider a transactional email provider for high-volume production mail.
