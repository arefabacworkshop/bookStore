using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStoreApi.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using BookStoreApi.Services;
using Microsoft.Extensions.FileProviders;
using System.IO;
using Microsoft.IdentityModel.Logging;
using Microsoft.AspNetCore.Http;

namespace BookStoreApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "BookStoreApi", Version = "v1" });
            });
            services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            services.AddControllersWithViews()
                   .AddNewtonsoftJson(options =>
               options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
           );
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
             {
                 options.RequireHttpsMetadata = false;
                 options.SaveToken = true;
             }
            );
            services.AddSingleton<IFileProvider>(
           new PhysicalFileProvider(
               Path.Combine(Directory.GetCurrentDirectory(), "wwwroot")));
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader().Build());
            });
            services.AddAuthorization(config =>
            {
                config.AddPolicy(Policies.Admin, Policies.AdminPolicy());
                config.AddPolicy(Policies.Farmer, Policies.FarmerPolicy());
                config.AddPolicy(Policies.Spec, Policies.SpecPolicy());
            });
            services.AddTransient<IAuthService, AuthService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "BookStoreApi v1"));
            }
            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseStaticFiles();
            app.UseAuthorization();
            app.UseCors("CorsPolicy");
            app.UseAuthentication();
            IdentityModelEventSource.ShowPII = true;
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
        public class Policies
        {
            public const string Admin = "admin";
            public const string Farmer = "farmer";
            public const string Spec = "spec";
            public static AuthorizationPolicy AdminPolicy()
            {
                return new AuthorizationPolicyBuilder().RequireAuthenticatedUser().RequireRole(Admin).Build();
            }
            public static AuthorizationPolicy FarmerPolicy()
            {
                return new AuthorizationPolicyBuilder().RequireAuthenticatedUser().RequireRole(Farmer).Build();
            }
            public static AuthorizationPolicy SpecPolicy()
            {
                return new AuthorizationPolicyBuilder().RequireAuthenticatedUser().RequireRole(Spec).Build();
            }
        }
    }
}
