FROM hub.nexdev.net/base/dotnet/core/sdk:3.1 AS builder

WORKDIR "/WebApi"

COPY ["/WebApi/Affiliate.N88.Infrastructure", "./Affiliate.N88.Infrastructure"]
COPY ["/WebApi/Affiliate.N88.Jobs/Affiliate.N88.Jobs.csproj", "./Affiliate.N88.Jobs/Affiliate.N88.Jobs.csproj"]

# Restore packages
WORKDIR "/WebApi/Affiliate.N88.Jobs"
RUN dotnet nuget add source https://nuget.nexdev.net/api/v2
RUN --mount=type=cache,target=/root/.nuget/packages \
    dotnet restore -v n -r linux-musl-x64 "./Affiliate.N88.Jobs.csproj"

COPY "/WebApi/Affiliate.N88.Jobs" .

RUN --mount=type=cache,target=/root/.nuget/packages \
    dotnet publish -r linux-musl-x64 --self-contained false -o /app/publish

FROM hub.nexdev.net/base/dotnet/core/aspnet:3.1.32-alpine

ENV ASPNETCORE_URLS=http://+:5000
EXPOSE 5000

# Don’t run as root
RUN adduser --disabled-password \
  --home /app \
  --gecos '' dotnetuser && chown -R dotnetuser /app && chown -R dotnetuser /tmp
USER dotnetuser
#

WORKDIR "/app"

COPY --from=builder /app/publish .
ENV TZ="America/La_Paz"

ENTRYPOINT ["dotnet", "Affiliate.N88.Jobs.dll"]