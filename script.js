document.addEventListener('DOMContentLoaded', () => {
    const splash = document.getElementById('splash');
    const conteudo = document.getElementById('conteudo-principal');

    // Ao clicar em qualquer lugar da tela splash
    splash.addEventListener('click', () => {
        // Adiciona um efeito simples de saída
        splash.style.opacity = '0';
        splash.style.transition = 'opacity 0.5s ease';

        setTimeout(() => {
            splash.style.display = 'none';
            conteudo.classList.remove('hidden');
            // Rola para o topo para garantir que o usuário veja o menu
            window.scrollTo(0, 0);
        }, 500);
    });
});