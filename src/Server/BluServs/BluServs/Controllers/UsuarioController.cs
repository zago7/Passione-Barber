using BluServs.Models;
using Microsoft.AspNetCore.Mvc;

namespace BluServs.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioController : ControllerBase
    {
        private static List<Usuario> users = new List<Usuario>
        {
            new Usuario {Id = 1, Nome = "Samuel", Email = "samuel@gmail.com"},
            new Usuario {Id = 2, Nome = "Felipe", Email = "felipe@gmail.com"},
            new Usuario {Id = 3, Nome = "Jose", Email = "jose@gmail.com"}
        };

        [HttpGet]
        public ActionResult<IEnumerable<Usuario>> Get()
        {
            return Ok(users);
        }
    }
}
