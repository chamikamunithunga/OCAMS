using Microsoft.AspNetCore.Mvc;
using backend.Models;
using System.Collections.Generic;
using System.Linq;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        // In-memory user store
        private static List<UserModel> Users = new List<UserModel>();

        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterModel model)
        {
            if (Users.Any(u => u.Email == model.Email))
                return BadRequest(new { message = "User already exists" });

            Users.Add(new UserModel
            {
                Name = model.Name,
                Email = model.Email,
                Password = model.Password, // In production, hash passwords!
                Role = model.Role
            });
            return Ok(new { message = "Registration successful" });
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel model)
        {
            var user = Users.FirstOrDefault(u => u.Email == model.Email && u.Password == model.Password);
            if (user == null)
                return Unauthorized(new { message = "Invalid credentials" });

            // For demo, return user info (no JWT yet)
            return Ok(new { message = "Login successful", user = new { user.Name, user.Email, user.Role } });
        }
    }
} 