using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GiftGuru.Data;
using GiftGuru.Models;
using System.Linq.Expressions;

namespace GiftGuru.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FamilyController : ControllerBase
    {
        private readonly GiftGuruDbContext _context;

        public FamilyController(GiftGuruDbContext context)
        {
            _context = context;
        }

        [HttpGet("user/{userId}")]
        public IActionResult GetFamiliesByUserId(int userId)
        {
            try
            {
                var userFamilies = _context.UserFamilies
                    .SingleOrDefault(uf => uf.UserId == userId);

                return Ok(userFamilies); 
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        [HttpGet]
        public IActionResult GetAllUserFamilies()
        {
            try
            {
            var response = _context.UserFamilies
                .Include(uf => uf.Family)
                .ThenInclude(f => f.FamilyMembers)
                .Include(uf => uf.UserProfile);
                
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        [HttpGet("{userId}")]
        public IActionResult GetFamilyByUserFamilyId(int userId)
        {
            try
            {
                var response = _context.UserFamilies
                    .Where(uf => uf.UserId == userId) 
                    .Include(uf => uf.Family)
                    .ThenInclude(f => f.FamilyMembers)
                    .Include(uf => uf.UserProfile)
                    .ToList();

                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }
    }}
//         [HttpGet("members/{userId}")]
//         public IActionResult GetFamilyMembersByUserFamilyId(int userId)
//         {
//             try{
                
//                 // var response = _context.UserFamilies
//                 //     .Where(uf => uf.UserId == userId)
//                 //     .Include(uf => uf.Family)
//                 //     .ThenInclude(f => f.FamilyMembers)
//                 //     .Include(uf => uf.UserProfile)
//                 //     .Select(uf => new FamilyMember(){

//                 //  })
//                 //     .ToList();
//             }
//         }
//     }
// }


