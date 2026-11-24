console.log('script.js carregado com sucesso!');

/* ===== 1) Menu do celular (abre e fecha) ===== */
const btnMenu = document.getElementById('btn-menu');
const menu = document.getElementById('menu');

btnMenu.addEventListener('click', () => {
  const aberto = menu.classList.toggle('aberto');
  btnMenu.setAttribute('aria-expanded', aberto);
});
menu.querySelectorAll('a').forEach(link =>
  link.addEventListener('click', () => {
    menu.classList.remove('aberto');
    btnMenu.setAttribute('aria-expanded', 'false');
  })
);

/* ===== 2) Tema claro / escuro (guarda a escolha) ===== */
const btnTema = document.getElementById('btn-tema');

function aplicarTema(escuro) {
  document.body.classList.toggle('escuro', escuro);
  btnTema.textContent = escuro ? '☀️' : '🌙';
}
try { aplicarTema(localStorage.getItem('tema') === 'escuro'); } catch (e) {}

btnTema.addEventListener('click', () => {
  const escuro = !document.body.classList.contains('escuro');
  aplicarTema(escuro);
  try { localStorage.setItem('tema', escuro ? 'escuro' : 'claro'); } catch (e) {}
});

/* ===== 3) Filtro de projetos ===== */
const filtros = document.querySelectorAll('.filtro');
const projetos = document.querySelectorAll('.projeto');

filtros.forEach(botao => {
  botao.addEventListener('click', () => {
    filtros.forEach(b => b.classList.remove('ativo'));
    botao.classList.add('ativo');
    const escolhido = botao.dataset.filtro;
    projetos.forEach(p => {
      const mostrar = escolhido === 'todos' || p.dataset.status === escolhido;
      p.classList.toggle('oculto', !mostrar);
    });
  });
});

/* ===== 4) Formulário: valida e mostra confirmação ===== */
const form = document.getElementById('form-contato');
const retorno = document.getElementById('retorno');

form.addEventListener('submit', (evento) => {
  evento.preventDefault();
  const campos = form.querySelectorAll('input, textarea');
  let valido = true;

  campos.forEach(c => {
    const ok = c.value.trim() !== '' && c.checkValidity();
    c.classList.toggle('erro', !ok);
    if (!ok) valido = false;
  });

  if (valido) {
    const nome = document.getElementById('nome').value.trim();
    retorno.textContent = `Obrigado, ${nome}! Sua mensagem foi registrada.`;
    retorno.className = 'retorno ok';
    form.reset();
  } else {
    retorno.textContent = 'Preencha todos os campos corretamente.';
    retorno.className = 'retorno falha';
  }
});

/* ===== 5) Ano automático no rodapé ===== */
document.getElementById('ano').textContent = new Date().getFullYear();