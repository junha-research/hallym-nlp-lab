// 스크롤 애니메이션
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 공지사항 닫기 기능
function closeNotice() {
    const noticeBanner = document.querySelector('.notice-banner');
    noticeBanner.style.animation = 'slideUp 0.5s ease-in-out forwards';
    
    setTimeout(() => {
        noticeBanner.classList.add('hidden');
    }, 500);
}

// 페이지 로드시 공지사항 상태 확인
function checkNoticeStatus() {
    try {
        const closedTime = localStorage.getItem('notice-closed');
        if (closedTime && new Date().getTime() < parseInt(closedTime)) {
            const noticeBanner = document.querySelector('.notice-banner');
            noticeBanner.classList.add('hidden');
        }
    } catch (e) {
        // localStorage가 지원되지 않는 경우 무시
    }
}

// slideUp 애니메이션 추가
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        to {
            transform: translateY(-100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// 스크롤 투 탑 버튼 표시/숨김
window.addEventListener('scroll', function() {
    const scrollButton = document.querySelector('.scroll-to-top');
    if (window.pageYOffset > 300) {
        scrollButton.classList.add('visible');
    } else {
        scrollButton.classList.remove('visible');
    }
});

// 페이지 로드 시 애니메이션
window.addEventListener('load', function() {
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// 네비게이션 하이라이트
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('nav a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// 카드 호버 효과
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.card, .member-card, .research-item').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// 타이핑 효과 (연구실 소개)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// 배경 파티클 효과
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.style.position = 'fixed';
    particleContainer.style.top = '0';
    particleContainer.style.left = '0';
    particleContainer.style.width = '100%';
    particleContainer.style.height = '100%';
    particleContainer.style.pointerEvents = 'none';
    particleContainer.style.zIndex = '-1';
    document.body.appendChild(particleContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${5 + Math.random() * 10}s ease-in-out infinite`;
        particleContainer.appendChild(particle);
    }
}

// 인터섹션 옵저버를 활용한 애니메이션
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // 애니메이션 대상 요소들 관찰
    document.querySelectorAll('.section, .card, .research-item, .member-card').forEach(el => {
        observer.observe(el);
    });
}

// 네비게이션 활성 상태 CSS 추가
function addNavigationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        nav a.active {
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-2px);
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// 부드러운 스크롤을 위한 polyfill
function smoothScrollPolyfill() {
    if (!('scrollBehavior' in document.documentElement.style)) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/smoothscroll/1.4.10/SmoothScroll.min.js';
        document.head.appendChild(script);
    }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    // 공지사항 상태 확인
    checkNoticeStatus();
    
    // 스타일과 기능 초기화
    addNavigationStyles();
    smoothScrollPolyfill();
    initScrollAnimations();
    createParticles();
    
    // 로딩 완료 후 애니메이션 시작
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// 리사이즈 이벤트 처리
window.addEventListener('resize', function() {
    // 모바일에서 뷰포트 높이 조정
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

// 터치 디바이스 최적화
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // 터치 디바이스용 스타일 추가
    const touchStyle = document.createElement('style');
    touchStyle.textContent = `
        .touch-device .card:hover,
        .touch-device .member-card:hover,
        .touch-device .research-item:hover {
            transform: none;
        }
        
        .touch-device .card:active,
        .touch-device .member-card:active,
        .touch-device .research-item:active {
            transform: scale(0.98);
        }
    `;
    document.head.appendChild(touchStyle);
}
