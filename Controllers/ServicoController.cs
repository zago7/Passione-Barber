using BluServs.Infra.Models;
using BluServs.Models;
using Microsoft.AspNetCore.Mvc;

namespace BluServs.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServicoController : ControllerBase
    {

        



        private static List<Servico> servicos = new List<Servico>
        {
            new Servico { Id = 1, Nome = "Corte de Cabelo", Preco = 50.0m, Duracao = 30 },
            new Servico { Id = 2, Nome = "Barba", Preco = 30.0m, Duracao = 20 }
        };

        [HttpGet]
        public ActionResult<IEnumerable<Servico>> Get()
        {
            return Ok(servicos);
        }

        [HttpPost]
        public ActionResult<Servico> Post([FromBody] Servico servico)
        {
            servico.Id = servicos.Count + 1; // Simples geração de Id
            servicos.Add(servico);
            return CreatedAtAction(nameof(Get), new { id = servico.Id }, servico);
        }
    }
}
