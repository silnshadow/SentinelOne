using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace InventoryProducer.Models
{
    public class InventoryDbContext : DbContext
    {
        public InventoryDbContext(DbContextOptions<InventoryDbContext> options) : base(options) { }
        public DbSet<InventoryUpdateRequest> InventoryUpdates { get; set; }
    }
}
