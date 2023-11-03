using System.ComponentModel.DataAnnotations.Schema;

namespace GiftGuru.Models;

public class UserFamily
{
    public int Id { get; set; }
    public int FamilyId { get; set; }
    public Family Family {get;set;}
    public int UserId { get; set; }
    [ForeignKey("UserId")]
    public UserProfile UserProfile {get;set;}

}