using System.ComponentModel.DataAnnotations;

namespace ToDoAPI.Models
{
    public class Employee
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Gender { get; set; }
        [Required]
        public string Status { get; set; }
    }
}