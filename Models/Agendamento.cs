using BluServs.Models;
using System.ComponentModel.DataAnnotations;

namespace BluServs.Infra.Models
{
    public class Agendamento
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public DateTime DataHora { get; set; }
        [Required]
        public int UsuarioId { get; set; }
        [Required]
        public Usuario Usuario { get; set; }
        [Required]
        public int ServicoId { get; set; }
        [Required]
        public Servico Servico { get; set; }
    }
}
