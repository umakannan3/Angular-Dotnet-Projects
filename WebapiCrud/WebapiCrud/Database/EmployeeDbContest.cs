using Microsoft.EntityFrameworkCore;
using WebapiCrud.Models;

namespace WebapiCrud.Database
{
    public class EmployeeDbContest : DbContext
    {
        public EmployeeDbContest(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }
        }
} 
