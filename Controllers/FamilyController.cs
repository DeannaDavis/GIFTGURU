using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using GiftGuru.Data;

[ApiController]
[Route("api/[controller]")]
public class GroupFamilyController : ControllerBase
{
    private GiftGuruDbContext _context;
    private UserManager<IdentityUser> _familyManager;

    public GroupFamilyController(GiftGuruDbContext context, UserManager<IdentityUser> userManager)
    {
        _context = context;
        _familyManager = userManager;
    }

    [HttpGet]
    public IActionResult GetBigFam()
    {
        var familiesWithMembers = _context.Families
            .Include(f => f.FamilyMembers) 
            .ToList();

        return Ok(familiesWithMembers);
    }
}

