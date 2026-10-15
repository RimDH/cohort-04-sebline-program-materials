const slides = [...document.querySelectorAll('.slide')]; function fitSlides() { const scale = Math.min(innerWidth / 1440, innerHeight / 810); slides.forEach(s => { s.style.transform = `translate(${(innerWidth - 1440 * scale) / 2 / scale}px, ${(innerHeight - 810 * scale) / 2 / scale}px) scale(${scale})`; s.style.transform = `translate(${(innerWidth - 1440 * scale) / 2}px, ${(innerHeight - 810 * scale) / 2}px) scale(${scale})`; }); } window.addEventListener('resize', fitSlides); fitSlides(); let current = 0; const counter = document.querySelector('#counter'), progress = document.querySelector('#progress'); function show(n) { current = Math.max(0, Math.min(slides.length - 1, n)); slides.forEach((s, i) => s.classList.toggle('active', i === current)); counter.textContent = `${String(current + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`; document.querySelector('#pageNumber').textContent = String(current + 1).padStart(2, '0'); progress.style.width = `${(current + 1) / slides.length * 100}%`; } document.querySelector('#prev').onclick = () => show(current - 1); document.querySelector('#next').onclick = () => show(current + 1); document.querySelector('#full').onclick = () => document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen(); document.addEventListener('keydown', e => { if (['ArrowRight', 'ArrowDown', ' ', 'PageDown'].includes(e.key)) { e.preventDefault(); show(current + 1) } if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) { e.preventDefault(); show(current - 1) } if (e.key.toLowerCase() === 't' && !e.ctrlKey && !e.metaKey) document.querySelector('#themeToggle').click(); if (e.key.toLowerCase() === 'f' && !e.ctrlKey && !e.metaKey) document.querySelector('#full').click(); if (e.key === 'Home') show(0); if (e.key === 'End') show(slides.length - 1) }); let touchX = 0; document.addEventListener('touchstart', e => touchX = e.changedTouches[0].screenX); document.addEventListener('touchend', e => { const d = e.changedTouches[0].screenX - touchX; if (Math.abs(d) > 65) show(current + (d < 0 ? 1 : -1)) }); show(0);

const themeButton = document.getElementById('themeToggle');
function applyTheme(theme) { document.body.dataset.theme = theme; themeButton.textContent = theme === 'dark' ? '☼' : '☾'; themeButton.title = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'; themeButton.setAttribute('aria-label', themeButton.title); try { localStorage.setItem('dh-theme', theme) } catch (e) { } }
let savedTheme = 'dark'; try { savedTheme = localStorage.getItem('dh-theme') || 'dark' } catch (e) { }
applyTheme(savedTheme);
themeButton.addEventListener('click', () => applyTheme(document.body.dataset.theme === 'dark' ? 'light' : 'dark'));

let uiHideTimer;
function revealUI() {
    document.body.classList.remove('ui-hidden');
    clearTimeout(uiHideTimer);
    uiHideTimer = setTimeout(() => document.body.classList.add('ui-hidden'), 1000);
}
document.addEventListener('pointermove', revealUI);
document.addEventListener('touchstart', revealUI, { passive: true });
document.addEventListener('keydown', revealUI);
revealUI();
