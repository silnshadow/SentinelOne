using InventoryProducer.Models;
using InventoryProducer.Services;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace InventoryProducer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class InventoryController : ControllerBase
    {
        private readonly ProducerService _producerService;

        public InventoryController(ProducerService producerService)
        {
            _producerService = producerService;
        }

        [HttpPost]
        public async Task<IActionResult> UpdateInventory([FromBody] InventoryUpdateRequest request)
        {
            var message = JsonSerializer.Serialize(request);

            await _producerService.ProduceAsync("InventoryUpdates", message);

            return Ok("Inventory Updated Successfully...");
        }
    }
}
