# =========================
# Build stage
# =========================
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src

COPY ["Roofline.Api/Roofline.Api.csproj", "Roofline.Api/"]

RUN dotnet restore "Roofline.Api/Roofline.Api.csproj"

COPY . .

WORKDIR "/src/Roofline.Api"

RUN dotnet publish "Roofline.Api.csproj" \
    -c Release \
    -o /app/publish \
    /p:UseAppHost=false


# =========================
# Runtime stage
# =========================
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final

WORKDIR /app

COPY --from=build /app/publish .

# Render provides the PORT environment variable
ENV ASPNETCORE_URLS=http://0.0.0.0:${PORT:-8080}

EXPOSE 8080

ENTRYPOINT ["dotnet", "Roofline.Api.dll"]