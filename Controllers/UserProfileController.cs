using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using GiftGuru.Data;
using GiftGuru.Models;
using Microsoft.EntityFrameworkCore;

namespace GiftGuru.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProfileController : ControllerBase
    {
        private readonly GiftGuruDbContext _context;
        private readonly ILogger<ProfileController> _logger;

        public ProfileController(GiftGuruDbContext context, ILogger<ProfileController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
    [Route("user-profile")]
    public ActionResult<UserProfile> GetProfile(string userId)
    {
        try
        {
            var userProfile = _context.UserProfiles
            .Include(up=> up.UserFamilies)
            .FirstOrDefault(profile => profile.IdentityUserId == userId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return userProfile;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while retrieving the user profile.");
            return StatusCode(500);
        }
    }

    }
}
