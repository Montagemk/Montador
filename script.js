document.addEventListener('DOMContentLoaded', () => {
    // --- Smooth Scrolling para links de âncora ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Previne o comportamento padrão do link

            // Obtém o ID da seção do atributo href
            const targetId = this.getAttribute('href');
            // Encontra o elemento alvo
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Calcula a posição do topo do elemento, descontando a altura do cabeçalho fixo
                // para que o conteúdo não fique escondido atrás do header
                const headerOffset = document.querySelector('.main-header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth' // Rolagem suave
                });

                // Fecha o menu mobile se estiver aberto
                const navList = document.querySelector('.main-nav .nav-list');
                const menuToggle = document.getElementById('mobile-menu');
                if (navList.classList.contains('active')) {
                    navList.classList.remove('active');
                    menuToggle.classList.remove('is-active');
                }
            }
        });
    });

    // --- Animações ao Rolar (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.2, // O elemento será observado quando 20% dele estiver visível
        rootMargin: '0px 0px -50px 0px' // Começa a observar 50px antes do final da viewport
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Adiciona a classe 'animated' para disparar a transição CSS
                entry.target.classList.add('animated');
                // Para de observar o elemento uma vez que ele já foi animado
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Seleciona todos os elementos que devem ser animados
    const elementsToAnimate = document.querySelectorAll(
        '.animate-fade-in, .animate-slide-up, .animate-slide-right, .animate-slide-left'
    );

    // Observa cada elemento
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });

    // --- Menu Hambúrguer Responsivo ---
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.querySelector('.main-nav .nav-list');

    mobileMenu.addEventListener('click', () => {
        navList.classList.toggle('active'); // Alterna a classe 'active' para mostrar/esconder o menu
        mobileMenu.classList.toggle('is-active'); // Alterna a classe para animar o ícone do hambúrguer
    });

    // Fecha o menu quando um item é clicado (útil para mobile)
    navList.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
                mobileMenu.classList.remove('is-active');
            }
        });
    });

    // Fecha o menu se clicar fora dele (opcional, mas bom para UX)
    document.addEventListener('click', (event) => {
        if (!mobileMenu.contains(event.target) && !navList.contains(event.target)) {
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
                mobileMenu.classList.remove('is-active');
            }
        }
    });
});
