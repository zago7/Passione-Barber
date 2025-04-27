using BluServs.Infra.Data;
using BluServs.Models;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography.X509Certificates;


namespace BluServs.Models.Repository
{
    public class UsuarioRepository
    {
        private readonly AppDbContext _appDbcontext;

        public UsuarioRepository(AppDbContext appDbcontext)
        {
            _appDbcontext = appDbcontext;
        }

        public async Task<List<Usuario>> Listar()
        {
            return await _appDbcontext.Usuarios.ToListAsync();
        }

        public async Task<Usuario> Login(LoginRequest loginRequest)
        {
            var usuario = await _appDbcontext.Usuarios.FirstOrDefaultAsync(u => u.Email == loginRequest.Email);
            if (usuario == null)
            {
                throw new Exception("Usuário ou senha inválidos.");
            }
            return usuario;
        }
        public async Task<Usuario> BuscarPorID(int id)
        {
            var usuario = await _appDbcontext.Usuarios.FirstOrDefaultAsync(u => u.Id == id);
            if (usuario == null)
                return usuario;

            throw new Exception("Usuário não encontrado.");

        }

        public async Task<Usuario> Salvar(Usuario usuario)
        {
            try
            {

                if (usuario.Id > 0)
                {
                    var usuarioEditar = _appDbcontext.Usuarios.FirstOrDefault(u => u.Id == usuario.Id);

                    if (usuarioEditar == null)
                    {
                        throw new Exception("Usuário não encontrado.");
                    }

                    usuarioEditar.Nome = usuario.Nome;
                    usuarioEditar.Email = usuario.Email;
                    usuarioEditar.Senha = usuario.Senha;
                }
                else
                {
                    _appDbcontext.Usuarios.Add(usuario);
                }

                await _appDbcontext.SaveChangesAsync();

                return usuario;
            }

            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task<bool> Excluir(int id)
        {
            try
            {
                var usuarioExcluir = _appDbcontext.Usuarios.FirstOrDefault(u => u.Id == id);

                if (usuarioExcluir == null)
                {
                    _appDbcontext.Usuarios.Remove(usuarioExcluir);
                    await _appDbcontext.SaveChangesAsync();
                    return true;
                }
                throw new Exception("Usuário não encontrado.");

            }
            catch (Exception e)
            {
                throw;
            }
            
        }


    }
}
