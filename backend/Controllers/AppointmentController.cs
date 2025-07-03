using Microsoft.AspNetCore.Mvc;
using backend.Models;
using System.Collections.Generic;
using System.Linq;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppointmentController : ControllerBase
    {
        private static List<AppointmentModel> Appointments = new List<AppointmentModel>();

        [HttpPost]
        public IActionResult Book([FromBody] AppointmentModel model)
        {
            model.Id = System.Guid.NewGuid().ToString();
            Appointments.Add(model);
            return Ok(new { message = "Appointment booked", appointment = model });
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(Appointments);
        }
    }
} 