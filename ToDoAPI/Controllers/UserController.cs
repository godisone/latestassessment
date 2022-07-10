using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoAPI.Data;
using ToDoAPI.Models;

namespace ToDoAPI.Controllers
{ //[Authorize]
    [Route("api/Users")]
    //[Route("api/[controller]")]
    [ApiController]
    [ProducesResponseType(400)]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _db;

        public UsersController(ApplicationDbContext db)
        {
            _db = db;
        }

        [AllowAnonymous]
        [HttpGet("getAllUsers")]
        //[Authorize(Roles="User")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = _db.Employees.OrderBy(a => a.Name).ToListAsync();

            if (users == null)
            {
                return NoContent();
            }

            return Ok(await users);
        }

        [AllowAnonymous]
        [HttpPost("CreateUser")]
        [ProducesResponseType(201, Type = typeof(List<Employee>))]
        [ProducesDefaultResponseType]
        public async Task<IActionResult> CreateUser([FromBody] Employee emp)
        {
            if (emp == null)
            {
                return BadRequest(ModelState);
            }
            bool value = false;
            try
            {
                 value = _db.Employees.Any(a => a.Name == emp.Name);
            }
            catch
            {
                 value = true;
            }
            if (value)
            {
                ModelState.AddModelError("", "User Exists!");
                return StatusCode(404, ModelState);
            }
            _db.Employees.Add(emp);
            await _db.SaveChangesAsync();
            //bool data = _db.SaveChanges() >= 0 ? true : false;
            //if (!data)
            //{
            //    ModelState.AddModelError("", $"Something went wrong when saving the record {emp.Name}");
            //    return StatusCode(500, ModelState);
            //}
            return Ok(emp);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var paymentDetail = await _db.Employees.FindAsync(id);
            if (paymentDetail == null)
            {
                return NotFound();
            }

            _db.Employees.Remove(paymentDetail);
            await _db.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("DeleteAll")]
        public  IActionResult DeleteAllEmployee()
        {
            //var toDelete = _db.Employees.Select(a => new Employee { Id = a.Id }).ToList();
            _db.Employees.RemoveRange(_db.Employees.ToList());
            _db.SaveChanges();
            return NoContent();
        }



    }
}


