namespace GiftGuru.Models;

public class FamilyMember
{
    public int Id { get; set; }
    public int FamilyId { get; set; }
    public Family Family {get; set;}
    public string UserName { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Address { get; set; }
    public string GiftName { get; set; }
}