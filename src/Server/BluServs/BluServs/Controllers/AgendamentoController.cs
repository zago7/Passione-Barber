using BluServs.Infra.Models;
using BluServs.Models;
using Microsoft.AspNetCore.Mvc;

namespace BluServs.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AgendamentoController : ControllerBase
    {
        private static List<Agendamento> agendamentos = new List<Agendamento>();

        [HttpGet]
        public ActionResult<IEnumerable<Agendamento>> Get()
        {
            return Ok(agendamentos);
        }

        [HttpPost]
        public ActionResult<Agendamento> Post([FromBody] Agendamento agendamento)
        {
            agendamento.Id = agendamentos.Count + 1; 
            agendamentos.Add(agendamento);
            return CreatedAtAction(nameof(Get), new { id = agendamento.Id }, agendamento);
        }
    }
}
