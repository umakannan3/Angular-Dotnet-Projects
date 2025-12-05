using System.ComponentModel.DataAnnotations;

namespace WebapiCrud.Models
{
    public class Employee
    {
        [Key]
        public Guid Id { get; set; }
        public String Name { get; set; }
        public string MobileNo { get; set; }
        public string EmailID { get; set; }
    }
}
