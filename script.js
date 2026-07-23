// ---------- Button pop + glow-underneath, applied to every .btn on the page ----------
document.querySelectorAll('.btn').forEach(btn => {
  // give every button a glow-ring element to animate
  const ring = document.createElement('span');
  ring.className = 'btn-glow-ring';
  btn.appendChild(ring);

  btn.addEventListener('click', () => {
    btn.classList.remove('pop', 'glow');
    // force reflow so the animation can re-trigger on repeated clicks
    void btn.offsetWidth;
    btn.classList.add('pop', 'glow');
  });

  btn.addEventListener('animationend', (e) => {
    if (e.animationName === 'btn-pop') btn.classList.remove('pop');
    if (e.animationName === 'glow-bloom') btn.classList.remove('glow');
  });
});

// ---------- Toast helper (used for "coming soon" cases) ----------
const toast = document.getElementById('toast');
let toastTimer;
function showToast(message){
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

document.querySelectorAll('[data-toast]').forEach(el => {
  el.addEventListener('click', () => showToast(el.getAttribute('data-toast')));
});

// ---------- Reveal case files on scroll ----------
const revealTargets = document.querySelectorAll('.case-file-wrap, #cases');
if (revealTargets.length){
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed'); });
  }, { threshold: 0.15 });
  revealTargets.forEach(el => io.observe(el));
}
