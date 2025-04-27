using BluServs.Infra.Models;
using System.ComponentModel.DataAnnotations;

namespace BluServs.Models
{
    public class Servico
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Nome { get; set; }
        [Required]
        public decimal Preco { get; set; }
        [Required]
        public int Duracao { get; set; }

        public ICollection<Agendamento> Agendamentos { get; set; }
    }
}

