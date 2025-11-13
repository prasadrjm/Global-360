using Microsoft.AspNetCore.Mvc;
using TodoApi.Repositories;

namespace TodoApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : ControllerBase
    {
        private readonly TodoRepository _repository;

        public TodoController(TodoRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult GetAll() => Ok(_repository.GetAll());

        [HttpPost]
        public IActionResult Add([FromBody] string title)
        {
            var todo = _repository.Add(title);
            return Ok(todo);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var result = _repository.Delete(id);
            if (!result) return NotFound();
            return NoContent();
        }
    }
}
