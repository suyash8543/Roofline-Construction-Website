using Microsoft.AspNetCore.RateLimiting;
using System.Threading.RateLimiting;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Http.Features;
using MimeKit;
using System.Net;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = 80 * 1024 * 1024;
});
builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        policy
            .WithOrigins(
                "https://roofline-construction-website.vercel.app",
                "http://localhost:5173"
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});
builder.Services.AddRateLimiter(options =>
{
    options.AddFixedWindowLimiter("estimate", limiter =>
    {
        limiter.PermitLimit = 10;
        limiter.Window = TimeSpan.FromMinutes(1);
        limiter.QueueLimit = 0;
    });
});

var app = builder.Build();
app.UseCors("Frontend");
app.UseRateLimiter();

app.MapGet("/api/health", () => Results.Ok(new { status = "ok" }));

app.MapPost("/api/contact/estimate", async (HttpRequest request, IConfiguration config, CancellationToken ct) =>
{
    var form = await request.ReadFormAsync(ct);

    // Simple honeypot. Real users should never fill this field.
    if (!string.IsNullOrWhiteSpace(form["website"]))
        return Results.Ok(new { message = "Thanks! Your estimate request has been received." });

    var name = form["name"].ToString().Trim();
    var phone = form["phone"].ToString().Trim();
    var email = form["email"].ToString().Trim();
    var address = form["address"].ToString().Trim();
    var service = form["service"].ToString().Trim();
    var message = form["message"].ToString().Trim();

    if (string.IsNullOrWhiteSpace(name) || string.IsNullOrWhiteSpace(phone) ||
        string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(address) ||
        string.IsNullOrWhiteSpace(service) || string.IsNullOrWhiteSpace(message))
        return Results.BadRequest(new { message = "Please complete all required fields." });

    if (!new System.ComponentModel.DataAnnotations.EmailAddressAttribute().IsValid(email))
        return Results.BadRequest(new { message = "Please enter a valid email address." });

    var smtpHost = config["Smtp:Host"];
    var smtpPort = config.GetValue<int?>("Smtp:Port") ?? 587;
    var smtpUser = config["Smtp:Username"];
    var smtpPassword = config["Smtp:Password"];
    var fromEmail = config["Smtp:FromEmail"] ?? smtpUser;
    var fromName = config["Smtp:FromName"] ?? "Roofline Website";
    var destination = config["Smtp:ToEmail"];

    if (string.IsNullOrWhiteSpace(smtpHost) || string.IsNullOrWhiteSpace(smtpUser) ||
        string.IsNullOrWhiteSpace(smtpPassword) || string.IsNullOrWhiteSpace(fromEmail) ||
        string.IsNullOrWhiteSpace(destination))
    {
        app.Logger.LogError("SMTP settings are incomplete. Check Smtp configuration.");
        return Results.Problem("Email service is not configured yet.", statusCode: 503);
    }

    var files = form.Files;
    if (files.Count > 8)
        return Results.BadRequest(new { message = "You can upload up to 8 photos." });

    const long maxFileBytes = 10 * 1024 * 1024;
    var allowed = new[] { "image/jpeg", "image/png", "image/webp" };
    foreach (var file in files)
    {
        if (file.Length > maxFileBytes || !allowed.Contains(file.ContentType, StringComparer.OrdinalIgnoreCase))
            return Results.BadRequest(new { message = "Each photo must be JPG, PNG or WebP and no larger than 10 MB." });
    }

    var mail = new MimeMessage();
    mail.From.Add(new MailboxAddress(fromName, fromEmail));
    mail.To.Add(MailboxAddress.Parse(destination));
    mail.ReplyTo.Add(MailboxAddress.Parse(email));
    mail.Subject = $"New Roofing Estimate Request — {name}";

    var body = new BodyBuilder
    {
        HtmlBody = $"""
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111315">
          <h2>New Roofing Estimate Request</h2>
          <p>A visitor submitted the estimate form on the Roofline website.</p>
          <table cellpadding="8" cellspacing="0" style="border-collapse:collapse">
            <tr><td><b>Name</b></td><td>{H(name)}</td></tr>
            <tr><td><b>Phone</b></td><td>{H(phone)}</td></tr>
            <tr><td><b>Email</b></td><td>{H(email)}</td></tr>
            <tr><td><b>Property Address</b></td><td>{H(address)}</td></tr>
            <tr><td><b>Service</b></td><td>{H(service)}</td></tr>
          </table>
          <h3>Message</h3>
          <p>{H(message).Replace("\n", "<br>")}</p>
          <p style="color:#777;font-size:12px">Photos uploaded: {files.Count}</p>
        </div>
        """
    };

    foreach (var file in files)
    {
        await using var stream = file.OpenReadStream();
        using var memory = new MemoryStream();
        await stream.CopyToAsync(memory, ct);
        body.Attachments.Add(file.FileName, memory.ToArray(), ContentType.Parse(file.ContentType));
    }

    mail.Body = body.ToMessageBody();

    try
    {
        using var smtp = new SmtpClient();
        var socket = config.GetValue<bool?>("Smtp:UseSsl") == false
            ? SecureSocketOptions.StartTls
            : SecureSocketOptions.StartTls;
        await smtp.ConnectAsync(smtpHost, smtpPort, socket, ct);
        await smtp.AuthenticateAsync(smtpUser, smtpPassword, ct);
        await smtp.SendAsync(mail, ct);
        await smtp.DisconnectAsync(true, ct);
        app.Logger.LogInformation("Estimate email sent for {Email}", email);
        return Results.Ok(new { message = "Thanks! Your request has been sent. Our team will contact you shortly." });
    }
    catch (Exception ex)
    {
        app.Logger.LogError(ex, "Failed to send estimate email.");
        return Results.Problem("We couldn't send your request right now. Please call our team.", statusCode: 502);
    }
}).RequireRateLimiting("estimate");

app.Run();

static string H(string value) => WebUtility.HtmlEncode(value);
