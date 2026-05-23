document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    const navbar = document.getElementById('navbar');
    const mobileMenu = document.getElementById('mobile-menu');
    const alertBox = document.getElementById('custom-alert');
    const infoCardContent = document.getElementById('info-card-content');

    const CONFIG = {
        primeiroNome: 'Silvia ',
        sobrenome: 'Lara',
        crp: 'CRP MS 14/11057',
        telefone: '(67) 99267-5502',
        numeroFinal: '67992675502',
        endereco: 'Rua Pernambuco, 1291, Monte Castelo, Campo Grande - MS',
    };

    const fillText = (selector, value) => {
        document.querySelectorAll(selector).forEach((el) => {
            el.textContent = value;
        });
    };

    fillText('#primeiroNome', CONFIG.primeiroNome);
    fillText('#sobrenome', CONFIG.sobrenome);
    fillText('#nomeCompleto', `${CONFIG.primeiroNome}${CONFIG.sobrenome}`);
    fillText('#crp', CONFIG.crp);
    fillText('#telefone', CONFIG.telefone);
    fillText('#numeroFinal', CONFIG.numeroFinal);
    fillText('#endereco', CONFIG.endereco);

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY > 50;
        navbar.classList.toggle('shadow-md', scrolled);
        navbar.classList.toggle('py-3', scrolled);
        navbar.classList.toggle('py-5', !scrolled);
    }, { passive: true });

    const setMobileMenu = (isOpen) => {
        mobileMenu.classList.toggle('menu-open', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    document.getElementById('menu-toggle').addEventListener('click', () => setMobileMenu(true));
    document.getElementById('menu-close').addEventListener('click', () => setMobileMenu(false));
    document.querySelectorAll('.mobile-nav-link').forEach((link) => {
        link.addEventListener('click', () => setMobileMenu(false));
    });

    const cardContents = {
        Online: {
            title: 'Online',
            text: 'A sessão acontece por vídeo, em ambiente reservado, com o mesmo cuidado ético do atendimento presencial.',
            label: 'Indicado para',
            detail: 'Quem busca flexibilidade de local e rotina.',
        },
        Presencial: {
            title: 'Presencial',
            text: 'O atendimento é realizado em Campo Grande, em um espaço reservado para escuta, sigilo e continuidade do processo.',
            label: 'Endereço',
            detail: CONFIG.endereco,
        },
    };

    const updateInfoCard = (modalidade) => {
        const { title, text, label, detail } = cardContents[modalidade];

        infoCardContent.classList.remove('fade-in-card');
        void infoCardContent.offsetWidth;

        infoCardContent.innerHTML = `
            <p class="panel-eyebrow">Modalidade selecionada</p>
            <h4>${title}</h4>
            <p>${text}</p>
            <dl>
                <div>
                    <dt>${label}</dt>
                    <dd>${detail}</dd>
                </div>
                <div>
                    <dt>Depois do envio</dt>
                    <dd>Você recebe retorno pelo WhatsApp para combinar horários.</dd>
                </div>
            </dl>
        `;

        infoCardContent.classList.add('fade-in-card');
    };

    document.querySelectorAll('input[name="modalidade"]').forEach((radio) => {
        radio.addEventListener('change', (event) => updateInfoCard(event.target.value));
    });

    const buildWhatsAppUrl = (telefone, texto) => {
        const numeroLimpo = telefone.replace(/\D/g, '');
        const numeroFinal = numeroLimpo.startsWith('55') ? numeroLimpo : `55${numeroLimpo}`;
        return `https://wa.me/${numeroFinal}?text=${encodeURIComponent(texto)}`;
    };

    const showAlert = (mensagem) => {
        alertBox.textContent = mensagem;
        alertBox.classList.add('show');
        setTimeout(() => alertBox.classList.remove('show'), 4000);
    };

    document.getElementById('form-submit').addEventListener('click', () => {
        const nome = document.getElementById('f-nome').value.trim();
        const telefone = document.getElementById('f-fone').value.trim();
        const interesse = document.getElementById('f-esp').value;
        const modalidade = document.querySelector('input[name="modalidade"]:checked')?.value || '';
        const mensagem = document.getElementById('f-msg').value.trim();

        if (!nome || !telefone) {
            showAlert('Por favor, preencha seu nome e WhatsApp para que eu possa te responder.');
            return;
        }

        const linhas = [
            `Olá! Me chamo *${nome}* - contato: ${telefone}.`,
            interesse ? `Interesse em: *${interesse}*` : '',
            modalidade ? `Modalidade: *${modalidade}*` : '',
            mensagem || 'Gostaria de saber mais sobre agendamento de consultas.',
        ].filter(Boolean);

        window.open(buildWhatsAppUrl(CONFIG.telefone, linhas.join('\n')), '_blank');
    });
});
