using BluServs.Infra.Models;
using BluServs.Models;
using Microsoft.AspNetCore.Mvc;
using BluServs.Models.Repository;
using BluServs.Models.Repository.Interfaces;


namespace BluServs.Controllers
{
    [ApiController]
    public class ServicoController : ControllerBase
    {
        private readonly IServicoRepository _repository;

        public ServicoController(IServicoRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("api/servicos")]
        public IActionResult GetServicos()
        {
            try
            {
                var servicos = _repository.Listar().Result;
                return Ok(servicos);
            }
            catch (Exception ex)
            {
                return Unauthorized();
            }
        }

        [HttpPost("api/servico")]
        public IActionResult Salvar(Servico servico)
        {
            try
            {
                var lResultSalvarServico = _repository.Salvar(servico).Result;
                return Ok(lResultSalvarServico);
            }
            catch (Exception error)
            {
                return ValidationProblem(new ValidationProblemDetails() { Detail = error.Message });
            }
        }

        [HttpDelete("api/servico/{id}")]
        public IActionResult BuscarPorId(int id)
        {
            try
            {
                var retorno = _repository.BuscarPorId(id).Result;
                return Ok(retorno);
            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }
        }
    }
}
