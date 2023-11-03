namespace GiftGuru.Models;

public class FamilyGifts
{
    public int Id { get; set; }
    public int MemberId { get; set; }
    public string GiftName { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }

}