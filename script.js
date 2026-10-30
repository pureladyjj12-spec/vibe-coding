// 마우스 무브에 따른 배경 오로라 및 카드 인터랙션 효과
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.vibe-card');
  const orbs = document.querySelectorAll('.glow-orb');
  const navLinks = document.querySelectorAll('.nav-link');

  // 마우스 위치 기반 3D 틸트 및 조명 반응
  window.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // 중앙 기준 정규화 좌표 (-1 ~ 1)
    const normX = (clientX / windowWidth - 0.5) * 2;
    const normY = (clientY / windowHeight - 0.5) * 2;

    // 배경 오로라 오브 미세 시차 이동
    orbs.forEach((orb, index) => {
      const factor = (index + 1) * 15;
      orb.style.transform = `translate(${normX * factor}px, ${normY * factor}px)`;
    });

    // 화면이 충분히 넓을 때 활성 카드 3D 틸트
    if (windowWidth > 768) {
      const interactiveCards = document.querySelectorAll('.vibe-card, .hero-card');
      interactiveCards.forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        // 화면 안에 보일 때만 틸트 연산
        if (cardRect.top < windowHeight && cardRect.bottom > 0) {
          const cardCenterX = cardRect.left + cardRect.width / 2;
          const cardCenterY = cardRect.top + cardRect.height / 2;

          const deltaX = (clientX - cardCenterX) / (cardRect.width / 2);
          const deltaY = (clientY - cardCenterY) / (cardRect.height / 2);

          // 부드러운 틸트
          const rotateX = -deltaY * 2.2;
          const rotateY = deltaX * 2.2;

          card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
        }
      });
    }
  });

  // 마우스가 화면을 벗어났을 때 원래 위치 복원
  window.addEventListener('mouseleave', () => {
    document.querySelectorAll('.vibe-card, .hero-card').forEach((card) => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
    orbs.forEach((orb) => {
      orb.style.transform = 'translate(0px, 0px)';
    });
  });

  // 스크롤 위치에 따라 헤더 메뉴 활성화 (Scroll Spy)
  const heroEl = document.getElementById('hero');
  const introEl = document.getElementById('intro');
  const diffEl = document.getElementById('difference');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const diffTop = diffEl ? diffEl.offsetTop - 220 : 999999;
    const introTop = introEl ? introEl.offsetTop - 220 : 0;

    let targetHref = '#hero';
    if (scrollY >= diffTop) {
      targetHref = '#difference';
    } else if (scrollY >= introTop) {
      targetHref = '#intro';
    } else {
      targetHref = '#hero';
    }

    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === targetHref || (targetHref === '#hero' && href === '#')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  });

  // ==========================================
  // 모바일 햄버거 메뉴 열기/닫기 인터랙션
  // ==========================================
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const menuOverlay = document.getElementById('menuOverlay');

  function openMenu() {
    hamburgerBtn?.classList.add('active');
    hamburgerBtn?.setAttribute('aria-expanded', 'true');
    navMenu?.classList.add('active');
    menuOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden'; // 배경 스크롤 방지
  }

  function closeMenu() {
    hamburgerBtn?.classList.remove('active');
    hamburgerBtn?.setAttribute('aria-expanded', 'false');
    navMenu?.classList.remove('active');
    menuOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburgerBtn?.addEventListener('click', () => {
    const isOpen = hamburgerBtn.classList.contains('active');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // 오버레이 클릭 시 닫기
  menuOverlay?.addEventListener('click', closeMenu);

  // 메뉴 항목 클릭 시 자동으로 메뉴 닫고 해당 섹션으로 이동
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        closeMenu();
      }
    });
  });

  // ESC 키 누르면 메뉴 닫기
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hamburgerBtn?.classList.contains('active')) {
      closeMenu();
    }
  });

  // 창 크기가 다시 커지면 모바일 메뉴 상태 리셋
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && hamburgerBtn?.classList.contains('active')) {
      closeMenu();
    }
  });
});


