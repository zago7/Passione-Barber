using BluServs.DTOs;
using BluServs.Infra.Models;
using BluServs.Models.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class AgendamentoController : ControllerBase
{
    private readonly AgendamentoRepository _agendamentoRepository;
    private readonly UsuarioRepository _usuarioRepository;
    private readonly ServicoRepository _servicoRepository;

    public AgendamentoController(
        AgendamentoRepository agendamentoRepository,
        UsuarioRepository usuarioRepository,
        ServicoRepository servicoRepository)
    {
        _agendamentoRepository = agendamentoRepository;
        _usuarioRepository = usuarioRepository;
        _servicoRepository = servicoRepository;
    }

    [HttpGet("{usuarioId}")]
    public async Task<ActionResult<IEnumerable<Agendamento>>> Get(int usuarioId)
    {
        try
        {
            var agendamentos = await _agendamentoRepository.ListarPorUsuario(usuarioId);
            return Ok(agendamentos);
        }
        catch (Exception ex)
        {
            return BadRequest(new { mensagem = ex.Message });
        }
    }


    [HttpPost("multiplos")]
    public async Task<ActionResult> PostMultiplos([FromBody] AgendamentoMultiploDto dto)
    {
        try
        {
            var usuario = await _usuarioRepository.BuscarPorID(dto.UsuarioId);
            if (usuario == null)
                return NotFound("Usuário não encontrado.");

            var agendamentosSalvos = new List<Agendamento>();

            foreach (var servicoId in dto.ServicoIds)
            {
                var servico = await _servicoRepository.BuscarPorId(servicoId);
                if (servico == null)
                    return NotFound($"Serviço com ID {servicoId} não encontrado.");

                var agendamento = new Agendamento
                {
                    DataHora = dto.DataHora,
                    UsuarioId = dto.UsuarioId,
                    ServicoId = servicoId,
                    Usuario = usuario,
                    Servico = servico
                };

                var agendamentoSalvo = await _agendamentoRepository.Salvar(agendamento);
                agendamentosSalvos.Add(agendamentoSalvo);
            }

            return Ok(agendamentosSalvos);
        }
        catch (Exception ex)
        {
            return BadRequest(new { mensagem = ex.Message, trace = ex.StackTrace });
        }
    }



    [HttpDelete("{id}")]
    public async Task<ActionResult> Excluir(int id)
    {
        try
        {
            var agendamentoExcluido = await _agendamentoRepository.Excluir(id);
            if (agendamentoExcluido)
            {
                return Ok(new { mensagem = "Agendamento excluído com sucesso." });
            }
            else
            {
                return NotFound(new { mensagem = "Agendamento não encontrado." });
            }
        }
        catch (Exception ex)
        {
            return BadRequest(new { mensagem = ex.Message });
        }
    }
}
