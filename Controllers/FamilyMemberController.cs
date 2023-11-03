using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GiftGuru.Data;
using GiftGuru.Models;

namespace GiftGuru.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FamilyMembersController : ControllerBase
    {
        private readonly GiftGuruDbContext _context;

        public FamilyMembersController(GiftGuruDbContext context)
        {
            _context = context;
        }

        // GET: api/FamilyMembers
        [HttpGet]
        public IActionResult GetFamilyMembers()
        {
            return Ok(_context.FamilyMembers);
        }

[HttpGet("{id}")]
        public IActionResult GetFamilyMemberById(int id)
        {
            FamilyMember familyMember = _context.FamilyMembers.Single(mi => mi.Id == id);
                
            if (familyMember == null)
            {
                return NotFound();
            }

            return Ok(familyMember);
        }


    [HttpDelete("{id}")]

    public IActionResult Delete(int id)
    {
        try
        {
            var familyMember = _context.FamilyMembers.Find(id);

            if (familyMember == null)
            {
                return NotFound(); 
            }

            _context.FamilyMembers.Remove(familyMember);
            _context.SaveChanges();

            return NoContent(); 
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal Server Error: {ex.Message}"); 
        }
    }


    [HttpPost]

    public IActionResult createNewMember(FamilyMember familyMember)
    {
            try
            {
                _context.FamilyMembers.Add(familyMember);
                _context.SaveChanges();
                return Created($"/api/familymember/{familyMember.Id}",familyMember);

            }

            catch (Exception ex)
        {
            return StatusCode(500, $"Internal Server Error: {ex.Message}"); 
        }
    }

    [HttpPut("{id}")]
public IActionResult UpdateMember(int id, FamilyMember updatedMember)
{
    try
    {
        var existingMember = _context.FamilyMembers.FirstOrDefault(fm => fm.Id == id);

        if (existingMember == null)
        {
            return NotFound();
        }

        existingMember.FirstName = updatedMember.FirstName;
        existingMember.LastName = updatedMember.LastName;
        existingMember.Address = updatedMember.Address;
        existingMember.GiftName = updatedMember.GiftName;


        _context.FamilyMembers.Update(existingMember);
        _context.SaveChanges();

        return Ok(existingMember);
    }
    catch (Exception ex)
    {
        return StatusCode(500, $"Internal Server Error: {ex.Message}");
    }
}



        
    }

    
}

