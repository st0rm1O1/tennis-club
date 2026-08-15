// ---------- IMPORTS ----------
import Lenis from 'lenis';

// ---------- CONSTANTS ----------
const FONT_BASE = 16;
const BASE_W = 1920;
const COEF = 0.6666;

// ---------- ADAPTIVE FONT SCALING ----------
function adaptFontSize() {
    const w = window.innerWidth;
    const reduction = ((BASE_W - w) / BASE_W) * 100 * COEF;
    const size = FONT_BASE - (FONT_BASE * reduction) / 100;
    const html = document.documentElement;
    if (size > FONT_BASE) {
        html.style.fontSize = size + 'px';
    } else {
        html.style.removeProperty('font-size');
    }
}
window.addEventListener('resize', adaptFontSize);
adaptFontSize();

// ---------- SPRING HELPER ----------
function createSpring(initial, config) {
    const { tension = 170, friction = 26 } = config || {};
    let x = initial;
    let v = 0;
    return {
        get value() { return x; },
        set target(t) { this._target = t; },
        get target() { return this._target ?? initial; },
        step(dt) {
            const t = this._target ?? initial;
            const accel = -tension * (x - t) - friction * v;
            v += accel * dt;
            x += v * dt;
            return x;
        },
        reset(val) { x = val;
            v = 0;
            this._target = val; },
        snap(val) { x = val;
            v = 0; }
    };
}

// ---------- LENIS ----------
const lenis = new Lenis({ smoothWheel: true });
let lenisRafId = null;

function rafLoop(t) {
    lenis.raf(t);
    lenisRafId = requestAnimationFrame(rafLoop);
}
requestAnimationFrame(rafLoop);

// lock / unlock scroll
function lockScroll() {
    document.documentElement.classList.add('locked');
    document.body.classList.add('locked');
    lenis.stop();
}

function unlockScroll() {
    document.documentElement.classList.remove('locked');
    document.body.classList.remove('locked');
    lenis.start();
}

// ---------- LOADER ----------
const loader = document.getElementById('loader');
const loaderFill = document.getElementById('loaderFill');
let loaderProgress = 0;
let loaderReady = false;

function advanceLoader() {
    if (loaderReady) return;
    loaderProgress = Math.min(1, loaderProgress + (0.005 + Math.random() * 0.025));
    loaderFill.style.width = (loaderProgress * 100) + '%';
    if (loaderProgress < 1) {
        requestAnimationFrame(advanceLoader);
    } else {
        loaderReady = true;
        setTimeout(() => {
            loader.classList.add('hide');
            unlockScroll();
            // trigger hero reveals
            revealHero();
            // start collection autoplay
            startCollectionAutoplay();
            // init trust carousel
            initTrustCarousel();
            // init inview
            initInview();
        }, 400);
    }
}

// force completion if it stalls
setTimeout(() => {
    if (!loaderReady) {
        loaderProgress = 1;
        loaderFill.style.width = '100%';
        loaderReady = true;
        setTimeout(() => {
            loader.classList.add('hide');
            unlockScroll();
            revealHero();
            startCollectionAutoplay();
            initTrustCarousel();
            initInview();
        }, 400);
    }
}, 4000);

// start loader
lockScroll();
window.scrollTo(0, 0);
requestAnimationFrame(advanceLoader);

// ---------- REVEAL HELPERS ----------
function revealClipWords(container, stagger, duration, easing, baseDelay) {
    const words = container.querySelectorAll('.word-wrap');
    words.forEach((wrap, i) => {
        const inner = wrap.querySelector('.word-inner');
        if (!inner) return;
        const delay = (baseDelay || 0) + i * (stagger || 140);
        setTimeout(() => {
            inner.style.transition =
                `transform ${duration || 1100}ms ${easing || 'cubic-bezier(0.16,1,0.3,1)'}, opacity ${duration || 1100}ms ${easing || 'cubic-bezier(0.16,1,0.3,1)'}`;
            inner.classList.add('revealed');
        }, delay);
    });
}

function revealClipLines(container, stagger, duration, easing, baseDelay) {
    const lines = container.querySelectorAll('.line-wrap');
    lines.forEach((wrap, i) => {
        const inner = wrap.querySelector('.line-inner');
        if (!inner) return;
        const delay = (baseDelay || 0) + i * (stagger || 110);
        setTimeout(() => {
            inner.style.transition =
                `transform ${duration || 900}ms ${easing || 'cubic-bezier(0.16,1,0.3,1)'}, opacity ${duration || 900}ms ${easing || 'cubic-bezier(0.16,1,0.3,1)'}`;
            inner.classList.add('revealed');
        }, delay);
    });
}

// ---------- HERO REVEAL ----------
let heroRevealed = false;

function revealHero() {
    if (heroRevealed) return;
    heroRevealed = true;

    // Hero title
    const titleContainer = document.getElementById('hero-title');
    const titleWords = ['Own', 'The', 'Court'];
    titleContainer.innerHTML = titleWords.map(w =>
        `<span class="word-wrap"><span class="word-inner">${w}</span></span>`
    ).join(' ');
    revealClipWords(titleContainer, 140, 1100, 'cubic-bezier(0.16,1,0.3,1)', 0);

    // Tagline
    const tagline = document.getElementById('heroTagline');
    revealClipLines(tagline, 110, 900, 'cubic-bezier(0.16,1,0.3,1)', 350);

    // Collection slider inview
    const slider = document.getElementById('collectionSlider');
    slider.style.opacity = '0';
    slider.style.transform = 'translateY(28px)';
    setTimeout(() => {
        slider.style.transition =
            'opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)';
        slider.style.opacity = '1';
        slider.style.transform = 'translateY(0)';
    }, 650);

    // Membership card
    const memCard = document.getElementById('membershipCard');
    memCard.style.opacity = '0';
    memCard.style.transform = 'translateY(28px)';
    setTimeout(() => {
        memCard.style.transition =
            'opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)';
        memCard.style.opacity = '1';
        memCard.style.transform = 'translateY(0)';
    }, 780);
}

// ---------- COLLECTION SLIDER ----------
const collData = [{
    img: 'https://picsum.photos/seed/player-two/300/300',
    brand: 'Baseline Pro',
    title: 'Featured Gear',
    cta: 'Shop the kit →',
    alt: 'Player driving a backhand on a hard court'
}, {
    img: 'https://picsum.photos/seed/player-three/300/300',
    brand: 'Court Series',
    title: 'Summer Drop',
    cta: 'View the line →',
    alt: 'Player stretching for a forehand on clay'
}, {
    img: 'https://picsum.photos/seed/player-five/400/533',
    brand: 'Academy Kit',
    title: 'Junior Range',
    cta: 'Browse juniors →',
    alt: 'Player set in a ready stance on clay'
}];

let collIndex = 0;
let collInterval = null;
let collAnimating = false;

const collSlide = document.getElementById('collectionSlide');
const collThumb = document.getElementById('collThumb');
const collBrand = document.getElementById('collBrand');
const collTitle = document.getElementById('collTitle');
const collCta = document.getElementById('collCta');
const collDots = document.getElementById('collDots');

function renderCollSlide(index, fade) {
    const d = collData[index];
    collThumb.src = d.img;
    collThumb.alt = d.alt;
    collBrand.textContent = d.brand;
    collTitle.textContent = d.title;
    collCta.textContent = d.cta;
    // dots
    collDots.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function initCollDots() {
    collDots.innerHTML = '';
    collData.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Slide ${i+1}`);
        dot.addEventListener('click', () => {
            if (collAnimating || i === collIndex) return;
            goCollSlide(i);
        });
        collDots.appendChild(dot);
    });
}
initCollDots();

function goCollSlide(newIndex) {
    if (collAnimating || newIndex === collIndex) return;
    collAnimating = true;
    const oldIndex = collIndex;
    collIndex = newIndex;

    // fade out old
    const oldCard = collSlide.cloneNode(true);
    oldCard.style.position = 'absolute';
    oldCard.style.inset = '0';
    oldCard.style.margin = '0';
    oldCard.style.pointerEvents = 'none';
    oldCard.style.transition = 'opacity 0.4s, transform 0.4s';
    oldCard.style.opacity = '1';
    oldCard.style.transform = 'scale(1) translateY(0)';
    collSlide.parentElement.style.position = 'relative';
    collSlide.parentElement.appendChild(oldCard);

    // update content
    renderCollSlide(newIndex, true);

    // animate old out
    requestAnimationFrame(() => {
        oldCard.style.opacity = '0';
        oldCard.style.transform = 'scale(0.96) translateY(16px)';
    });

    // animate new in
    collSlide.style.opacity = '0';
    collSlide.style.transform = 'scale(0.96) translateY(16px)';
    collSlide.style.transition = 'opacity 0.4s, transform 0.4s';
    requestAnimationFrame(() => {
        collSlide.style.opacity = '1';
        collSlide.style.transform = 'scale(1) translateY(0)';
    });

    setTimeout(() => {
        oldCard.remove();
        collAnimating = false;
        collSlide.style.transition = '';
        collSlide.style.opacity = '';
        collSlide.style.transform = '';
    }, 450);
}

function startCollectionAutoplay() {
    if (collInterval) clearInterval(collInterval);
    collInterval = setInterval(() => {
        if (collAnimating) return;
        const next = (collIndex + 1) % collData.length;
        goCollSlide(next);
    }, 3800);
}

// initial render
renderCollSlide(0, false);

// ---------- TRUST CAROUSEL ----------
const trustData = [{
    headline: ['Expert', 'Result-', 'Driven', 'Coaching'],
    img: 'https://picsum.photos/seed/player-five/400/533',
    name: 'Marco Vidal',
    role: 'Head Coach',
    alt: 'Head coach set in a ready stance on clay'
}, {
    headline: ['Sharper', 'Faster', 'Stronger', 'Player'],
    img: 'https://picsum.photos/seed/player-four/400/533',
    name: 'Elena Sokolova',
    role: 'Performance Coach',
    alt: 'Performance coach following through on a serve'
}, {
    headline: ['Future', 'Champions', 'Start', 'Here'],
    img: 'https://picsum.photos/seed/player-one/400/533',
    name: 'James Okoro',
    role: 'Juniors Lead',
    alt: 'Juniors lead waiting to return on clay'
}];

let trustIndex = 0;
let trustAnimating = false;

const trustRow1 = document.getElementById('trustRow1');
const trustRow2 = document.getElementById('trustRow2');
const coachImg = document.getElementById('coachImg');
const coachName = document.getElementById('coachName');
const coachRole = document.getElementById('coachRole');
const trustDots = document.getElementById('trustDots');

function renderTrustSlide(index, fade) {
    const d = trustData[index];
    // ghost words
    const words = d.headline;
    trustRow1.innerHTML = words.slice(0, 2).map((w, i) => {
        const cls = (i === 0) ? 'ghost' : 'ghost';
        return `<span class="word-wrap"><span class="word-inner ${cls}">${w}</span></span>`;
    }).join('');
    trustRow2.innerHTML = words.slice(2, 4).map((w, i) => {
        const cls = (i === 0) ? 'ink' : 'ghost';
        return `<span class="word-wrap"><span class="word-inner ${cls}">${w}</span></span>`;
    }).join('');

    // coach
    if (fade) {
        coachImg.style.transition = 'opacity 0.5s';
        coachImg.style.opacity = '0';
        setTimeout(() => {
            coachImg.src = d.img;
            coachImg.alt = d.alt;
            coachImg.style.opacity = '1';
        }, 250);
    } else {
        coachImg.src = d.img;
        coachImg.alt = d.alt;
        coachImg.style.opacity = '1';
    }
    coachName.textContent = d.name;
    coachRole.textContent = d.role;

    // dots
    trustDots.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });

    // re-fire ghost reveals after a tick
    setTimeout(() => {
        const allWords = trustRow1.querySelectorAll('.word-wrap');
        const allWords2 = trustRow2.querySelectorAll('.word-wrap');
        [...allWords, ...allWords2].forEach((wrap, i) => {
            const inner = wrap.querySelector('.word-inner');
            if (!inner) return;
            inner.classList.remove('revealed');
            inner.style.transition = '';
            setTimeout(() => {
                inner.style.transition =
                    `transform 700ms cubic-bezier(0.16,1,0.3,1), opacity 700ms cubic-bezier(0.16,1,0.3,1)`;
                inner.classList.add('revealed');
            }, 50 + i * 60);
        });
    }, 100);
}

function initTrustDots() {
    trustDots.innerHTML = '';
    trustData.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Coach ${i+1}`);
        dot.addEventListener('click', () => {
            if (trustAnimating || i === trustIndex) return;
            goTrustSlide(i);
        });
        trustDots.appendChild(dot);
    });
}
initTrustDots();

function goTrustSlide(newIndex) {
    if (trustAnimating || newIndex === trustIndex) return;
    trustAnimating = true;
    trustIndex = newIndex;
    renderTrustSlide(newIndex, true);
    setTimeout(() => { trustAnimating = false; }, 550);
}

document.getElementById('trustPrev').addEventListener('click', () => {
    const next = (trustIndex - 1 + trustData.length) % trustData.length;
    goTrustSlide(next);
});
document.getElementById('trustNext').addEventListener('click', () => {
    const next = (trustIndex + 1) % trustData.length;
    goTrustSlide(next);
});

// initial render
renderTrustSlide(0, false);

// ---------- INVIEW ----------
function initInview() {
    const els = document.querySelectorAll('.inview-init');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const data = el.dataset.inview ? JSON.parse(el.dataset.inview) : {};
                const delay = data.delay || 0;
                const y = data.y !== undefined ? data.y : 28;
                const scale = data.scale !== undefined ? data.scale : 1;
                const opacity = data.opacity !== undefined ? data.opacity : 1;

                setTimeout(() => {
                    el.style.transition =
                        `opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)`;
                    el.style.opacity = opacity;
                    el.style.transform = `translateY(0) scale(${scale})`;
                    el.classList.add('inview-revealed');
                }, delay);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    els.forEach(el => {
        // set initial state
        const data = el.dataset.inview ? JSON.parse(el.dataset.inview) : {};
        const y = data.y !== undefined ? data.y : 28;
        const scale = data.scale !== undefined ? data.scale : 1;
        const opacity = data.opacity !== undefined ? data.opacity : 0;
        el.style.opacity = opacity;
        el.style.transform = `translateY(${y}px) scale(${scale})`;
        el.style.transition = 'none';
        observer.observe(el);
    });
}

// also init already-visible items after loader
setTimeout(() => {
    // programs title reveal
    const progTitle = document.getElementById('programs-title');
    revealClipLines(progTitle, 110, 900, 'cubic-bezier(0.16,1,0.3,1)', 200);

    // inview for stats, testimonials, facilities, trust badge
    // but we already have inview-init on them — the observer will catch
}, 600);

// ---------- PARALLAX ----------
const heroParallax = document.getElementById('heroParallax');

function updateParallax() {
    const rect = document.getElementById('hero').getBoundingClientRect();
    const viewportH = window.innerHeight;
    const top = Math.max(0, Math.min(1, (rect.top + rect.height) / (viewportH + rect.height)));
    // top=0 when bottom hits viewport top, top=1 when top hits viewport bottom
    const progress = 1 - top;
    const y = progress * 12; // 0% → 12%
    heroParallax.style.transform = `translateY(${y}%)`;
    requestAnimationFrame(updateParallax);
}
requestAnimationFrame(updateParallax);

// ---------- MENU ----------
const menuOverlay = document.getElementById('menu-overlay');
const menuToggle = document.getElementById('menuToggle');
const menuClose = document.getElementById('menuClose');
const footerMenuBtn = document.getElementById('footerMenuBtn');

function openMenu() {
    menuOverlay.classList.add('open');
    menuToggle.setAttribute('aria-expanded', 'true');
    lockScroll();
}

function closeMenu() {
    menuOverlay.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    unlockScroll();
}

menuToggle.addEventListener('click', () => {
    if (menuOverlay.classList.contains('open')) closeMenu();
    else openMenu();
});
menuClose.addEventListener('click', closeMenu);
footerMenuBtn.addEventListener('click', openMenu);
menuOverlay.addEventListener('click', (e) => {
    if (e.target === menuOverlay) closeMenu();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOverlay.classList.contains('open')) closeMenu();
});

// menu links close
menuOverlay.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', (e) => {
        if (a.id === 'menuBookBtn') {
            e.preventDefault();
            closeMenu();
            openModal();
            return;
        }
        closeMenu();
    });
});

// ---------- MODAL ----------
const modal = document.getElementById('contact-modal');
const modalClose = document.getElementById('modalClose');
const bookBtns = [
    document.getElementById('bookVisitBtn'),
    document.getElementById('footerBookBtn')
];

function openModal() {
    modal.classList.add('open');
    lockScroll();
}

function closeModal() {
    modal.classList.remove('open');
    unlockScroll();
}

bookBtns.forEach(btn => {
    if (btn) btn.addEventListener('click', openModal);
});
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
});

// form submit
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thanks for your interest! A member of our team will be in touch shortly.');
    closeModal();
});

// ---------- CLEANUP ----------
window.addEventListener('beforeunload', () => {
    if (collInterval) clearInterval(collInterval);
    if (lenisRafId) cancelAnimationFrame(lenisRafId);
});

console.log('Baseline — Tennis Club & Academy loaded.');
