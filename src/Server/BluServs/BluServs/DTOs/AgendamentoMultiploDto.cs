namespace BluServs.DTOs
{
    public class AgendamentoMultiploDto
    {
        public int UsuarioId { get; set; }
        public List<int> ServicoIds { get; set; }
        public DateTime DataHora { get; set; }
    }
}
