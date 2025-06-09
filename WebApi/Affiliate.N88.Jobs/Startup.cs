using Affiliate.N88.Jobs.Configurations;
using Affiliate.N88.Jobs.Extensions;
using Affiliate.N88.Jobs.Middlewares;
using Fanex.Logging;
using Hangfire;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Affiliate.N88.Jobs
{
    public class Startup
    {
        private AppSettings appSettings;

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            appSettings = new AppSettings();
            Configuration.GetSection("AppSettings").Bind(appSettings);

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            services.AddHttpContextAccessor();
            services.AddHttpClient();

            services.AddUnderMaintenance(Configuration);
            services.AddSiteHealthChecks(Configuration);
            services.RegisterHangfire(Configuration);
            services.RegisterServices(Configuration, appSettings);

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            // Add This
            app.UsePing();
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseMiddleware<ErrorHandler>();
            app.UseSiteHealthChecks(Configuration);
            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });

            app.UseHangfire(appSettings);
            ///GlobalJobFilters.Filters.Add(new AutomaticRetryAttribute { Attempts = 0 });

            app.UseMvc();

            app.Run(async (context) =>
            {
                await context.Response.WriteAsync("Site is running");
            });

            Logger.Log.Info("Affiliate N88 Job started!");
        }
    }
}