document.addEventListener('DOMContentLoaded', () => {

  // ─── Lucide Icons ───
  if (typeof lucide !== 'undefined') lucide.createIcons();

  // ─── Config ───
  const CONFIG = {
    primeiroNome: 'Lara ',
    sobrenome: 'Aráujo',
    crp: 'CRP MS 14/11057',
    telefone: '(67) 99267-5502',
    telefoneLink: '5567992675502',
    endereco: 'Rua Pernambuco, 1291, Monte Castelo, Campo Grande - MS',
  };

  // ─── Preenchimento de nomes/CRP ───
  document.querySelectorAll('#primeiroNome, #primeiroNome2, #primeiroNome3, #primeiroNome4, #primeiroNome5')
    .forEach(el => el.textContent = CONFIG.primeiroNome);
  document.querySelectorAll('#sobrenome, #sobrenome2, #sobrenome3')
    .forEach(el => el.textContent = CONFIG.sobrenome);
  document.querySelectorAll('#crp, #crp2, #crp3')
    .forEach(el => el.textContent = CONFIG.crp);
  document.querySelectorAll('#nomeCompleto')
    .forEach(el => el.textContent = `${CONFIG.primeiroNome}${CONFIG.sobrenome}`);

  // ─── Reveal on scroll ───
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('active');
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ─── Navbar scroll shadow ───
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('shadow-md', window.scrollY > 10);
    }, { passive: true });
  }

  // ─── Menu mobile ───
  const mobileMenu   = document.getElementById('mobile-menu');
  const menuToggle   = document.getElementById('menu-toggle');
  const menuClose    = document.getElementById('menu-close');

  function abrirMenu() {
    mobileMenu.classList.add('menu-open');
    document.body.style.overflow = 'hidden';
  }
  function fecharMenu() {
    mobileMenu.classList.remove('menu-open');
    document.body.style.overflow = '';
  }

  if (menuToggle) menuToggle.addEventListener('click', abrirMenu);
  if (menuClose)  menuClose.addEventListener('click', fecharMenu);

  // Fecha ao clicar em qualquer link do menu
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', fecharMenu);
  });

  // ─── WhatsApp URL builder ───
  const buildWhatsAppUrl = (telefone, texto) => {
    const num = telefone.replace(/\D/g, '');
    const final = num.startsWith('55') ? num : `55${num}`;
    return `https://wa.me/${final}?text=${encodeURIComponent(texto)}`;
  };

  // ─── Alert ───
  const alertBox = document.getElementById('custom-alert');
  const showAlert = (msg) => {
    if (alertBox) {
      alertBox.textContent = msg;
      alertBox.classList.add('show');
      setTimeout(() => alertBox.classList.remove('show'), 4000);
    }
  };

  // ─── Player de vídeo ───
  function iniciarPlayer(posterId, videoId) {
    const poster = document.getElementById(posterId);
    const video  = document.getElementById(videoId);
    if (!poster || !video) return;

    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    poster.addEventListener('click', async () => {
      poster.classList.add('hidden');
      video.classList.add('playing');
      try {
        await video.play();
      } catch (e) {
        console.log('Erro ao reproduzir vídeo:', e);
        video.controls = true;
      }
    });
  }

  iniciarPlayer('videoPoster',       'clinicaVideo');
  iniciarPlayer('videoPosterMobile', 'clinicaVideoMobile');

  // ─── Carrossel de depoimentos (seção relatos-video) ───
  const quoteItems   = document.querySelectorAll('#relatos-video .quote-item');
  const controlDots  = document.querySelectorAll('#relatos-video .control-dot');

  if (quoteItems.length && controlDots.length) {
    controlDots.forEach(dot => {
      dot.addEventListener('click', () => {
        const idx = parseInt(dot.dataset.index);
        quoteItems.forEach(q => q.classList.remove('active'));
        controlDots.forEach(d => d.classList.remove('active'));
        quoteItems[idx]?.classList.add('active');
        dot.classList.add('active');
      });
    });

    // Auto-avança a cada 5s
    let current = 0;
    setInterval(() => {
      current = (current + 1) % quoteItems.length;
      quoteItems.forEach(q => q.classList.remove('active'));
      controlDots.forEach(d => d.classList.remove('active'));
      quoteItems[current]?.classList.add('active');
      controlDots[current]?.classList.add('active');
    }, 5000);
  }

  // ─── Troca de card de modalidade ───
  function iniciarTrocaCard() {
    const radioModalidades = document.querySelectorAll('input[name="modalidade"]');
    const cardContent = document.getElementById('info-card-content');
    if (!cardContent || radioModalidades.length === 0) return;

    const conteudos = {
      Online: `
        <p class="panel-eyebrow">O Caminho do Cuidado</p>
        <h4>Atendimento<br>Online</h4>
        <p class="panel-description">A sessão acontece por chamada de vídeo segura, em ambiente totalmente reservado, com o mesmo rigor ético, enraizamento e acolhimento do atendimento presencial.</p>
        <dl class="tree-branches">
          <div>
            <dt><span>✦</span> Indicado para</dt>
            <dd>Quem busca flexibilidade geográfica, otimização de tempo e praticidade na rotina, sem perder a profundidade da conexão.</dd>
          </div>
          <div>
            <dt><span>✦</span> Depois do envio</dt>
            <dd>Você receberá uma mensagem calorosa e personalizada no WhatsApp para entrelaçarmos nossas agendas.</dd>
          </div>
        </dl>
      `,
      Presencial: `
        <p class="panel-eyebrow">O Encontro e o Abraço</p>
        <h4>Atendimento Presencial</h4>
        <p class="panel-description">Um espaço físico preparado com afeto para que você possa desacelerar, fincar suas raízes e vivenciar o processo terapêutico no olho no olho.</p>
        <dl class="tree-branches">
          <div>
            <dt><span>✦</span> Nosso Espaço</dt>
            <dd class="address-highlight">
              Rua Pernambuco, 1291<br>
              Monte Castelo, Campo Grande - MS<br>
            </dd>
          </div>
          <div>
            <dt><span>✦</span> Depois do envio</dt>
            <dd>Alinharemos os horários disponíveis e te enviarei as instruções de chegada.</dd>
          </div>
        </dl>
      `
    };

    radioModalidades.forEach(radio => {
      radio.addEventListener('change', (e) => {
        const val = e.target.value;
        if (!conteudos[val]) return;
        cardContent.style.opacity = '0';
        cardContent.style.transform = 'translateY(10px)';
        setTimeout(() => {
          cardContent.innerHTML = conteudos[val];
          cardContent.style.opacity = '1';
          cardContent.style.transform = 'translateY(0)';
        }, 200);
      });
    });
  }

  iniciarTrocaCard();

  // ─── Formulário WhatsApp ───
  const btnSubmit = document.getElementById('form-submit');
  if (btnSubmit) {
    btnSubmit.addEventListener('click', (e) => {
      e.preventDefault();
      const nome      = document.getElementById('f-nome')?.value.trim() || '';
      const interesse = document.getElementById('f-esp')?.value || '';
      const modalidade = document.querySelector('input[name="modalidade"]:checked')?.value || '';
      const mensagem  = document.getElementById('f-msg')?.value.trim() || '';

      if (!nome) {
        showAlert('Por favor, preencha seu nome para que eu possa te responder.');
        document.getElementById('f-nome')?.focus();
        return;
      }

      const linhas = [
        `Olá! Me chamo *${nome}*.`,
        interesse  ? `Interesse em: *${interesse}*`  : '',
        modalidade ? `Modalidade: *${modalidade}*`   : '',
        mensagem   ? `Mensagem: "${mensagem}"`        : 'Gostaria de saber mais sobre agendamento de consultas.',
      ].filter(Boolean);

      const urlFinal = buildWhatsAppUrl(CONFIG.telefoneLink, linhas.join('\n'));
      const link = document.createElement('a');
      link.href = urlFinal;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  // ─── Modal Lightbox de Certificados ───
  const modal        = document.getElementById('modalCertificado');
  const modalImg     = document.getElementById('modalImg');
  const modalCaption = document.getElementById('modalCaption');
  const btnFechar    = document.getElementById('btnFecharModal');

  if (modal && modalImg) {
    document.querySelectorAll('.certificado-card').forEach(card => {
      card.addEventListener('click', () => {
        const img   = card.querySelector('img');
        const title = card.dataset.title || '';
        modalImg.src             = img ? img.src : '';
        modalImg.alt             = img ? img.alt : '';
        modalCaption.textContent = title;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      });
    });

    btnFechar?.addEventListener('click', fecharModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) fecharModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') fecharModal(); });

    function fecharModal() {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

});
