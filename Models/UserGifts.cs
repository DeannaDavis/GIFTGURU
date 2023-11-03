namespace GiftGuru.Models;

public class UserGifts
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string GiftName { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }

}