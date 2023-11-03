namespace GiftGuru.Models;

public class Family
{
    public int Id { get; set; }
    public string Surname { get; set; }

    public List<FamilyMember> FamilyMembers { get; set; }

}