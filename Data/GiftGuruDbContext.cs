using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using GiftGuru.Models;
using Microsoft.AspNetCore.Identity;

namespace GiftGuru.Data;
public class GiftGuruDbContext : IdentityDbContext<IdentityUser>
{
    private readonly IConfiguration _configuration;
    public DbSet<Family> Families { get; set; }
    public DbSet<UserFamily> UserFamilies{ get; set; }
    public DbSet<UserProfile> UserProfiles { get; set; }
    public DbSet<FamilyGifts> FamilyGifts { get; set; }
    public DbSet<FamilyMember> FamilyMembers { get; set; }
    public DbSet<UserGifts> UserGifts { get; set; }
    
    

    public GiftGuruDbContext(DbContextOptions<GiftGuruDbContext> context, IConfiguration config) : base(context)
    {
        _configuration = config;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole
        {
            Id = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            Name = "Admin",
            NormalizedName = "admin"
        });

        modelBuilder.Entity<IdentityUser>().HasData(new IdentityUser
        {
            Id = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            UserName = "DeannaDavis",
            Email = "deanna@gmail.com",

            PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
        });

        modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
        {
            RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            UserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f"
        });
        modelBuilder.Entity<UserProfile>().HasData(new UserProfile
        {
            Id = 1,
            IdentityUserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            FirstName = "Admina",
            LastName = "Strator",
            Address = "101 Main Street",
        });

         modelBuilder.Entity<Family>().HasData(new Family[]
        {
            new Family {Id = 1, Surname = "Davis"},
            new Family {Id = 2, Surname = "Blair"},
            new Family {Id = 3, Surname = "Sayre"},
        });



        modelBuilder.Entity<UserFamily>().HasData(new UserFamily[]
        {
            new UserFamily {Id = 1, FamilyId = 1, UserId = 1},
            new UserFamily {Id = 2, FamilyId = 3, UserId = 1},
            new UserFamily {Id = 3, FamilyId = 2, UserId = 2},
            new UserFamily {Id = 4, FamilyId = 1, UserId = 2},
            new UserFamily {Id = 5, FamilyId = 3, UserId = 3},
            new UserFamily {Id = 6, FamilyId = 2, UserId = 3},
        });

        modelBuilder.Entity<FamilyGifts>().HasData(new FamilyGifts[]
        {
            new FamilyGifts {Id = 1, MemberId = 1, GiftName = "IPhone", Description = "13- Black", Price = 300M},
            new FamilyGifts {Id = 2, MemberId = 2, GiftName = "RareBeauty Blush", Description = "Happy", Price = 26M},
            new FamilyGifts {Id = 3, MemberId = 3, GiftName = "FairHarbor Sweater", Description = "Tan", Price = 80M},
        });

        modelBuilder.Entity<UserGifts>().HasData(new UserGifts[]
        {
            new UserGifts {Id = 1, UserId = 1, GiftName = "IPhone", Description = "14- White", Price = 300M},
            new UserGifts {Id = 2, UserId = 2, GiftName = "RareBeauty Blush", Description = "Coral", Price = 26M},
            new UserGifts {Id = 3, UserId = 1, GiftName = "FairHarbor Sweater", Description = "Black", Price = 80M},
        });

        modelBuilder.Entity<FamilyMember>().HasData(new FamilyMember[]
        {
            new FamilyMember {Id = 1, FamilyId = 1,UserName ="BradDavis", FirstName = "Brad", LastName = "Davis", Address = "101 Main Street",GiftName = "FairHarbor Sweater"},
            new FamilyMember {Id = 2, FamilyId = 2,UserName ="WillBlair", FirstName = "Will", LastName = "Blair", Address = "105 Main Street",GiftName = "FairHarbor Sweater"},
            new FamilyMember {Id = 3, FamilyId = 3,UserName ="BekahSayre", FirstName = "Bekah", LastName = "Sayre", Address = "108 Main Street",GiftName = "FairHarbor Sweater"},
            new FamilyMember {Id = 4, FamilyId = 1,UserName ="JyessDavis", FirstName = "Jyess", LastName = "Davis", Address = "101 Main Street",GiftName = "FairHarbor Sweater"},
            new FamilyMember {Id = 5, FamilyId = 2,UserName ="KimBlair", FirstName = "Kim", LastName = "Blair", Address = "105 Main Street",GiftName = "FairHarbor Sweater"},
            new FamilyMember {Id = 6, FamilyId = 3,UserName ="KateSayre", FirstName = "Kate", LastName = "Sayre", Address = "108 Main Street",GiftName = "FairHarbor Sweater"},
            new FamilyMember {Id = 7, FamilyId = 1,UserName ="BrooklynDavis", FirstName = "Brooklyn", LastName = "Davis", Address = "101 Main Street",GiftName = "FairHarbor Sweater"},
            new FamilyMember {Id = 8, FamilyId = 2,UserName ="SteveBlair", FirstName = "Steve", LastName = "Blair", Address = "105 Main Street",GiftName = "FairHarbor Sweater"},
            new FamilyMember {Id = 9, FamilyId = 3,UserName ="CalebSayre", FirstName = "Caleb", LastName = "Sayre", Address = "108 Main Street",GiftName = "FairHarbor Sweater"},
        });


    }
}