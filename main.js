// ═══ ACTIVE NAV — based on current page ═══
(function () {
  const page = document.body.dataset.page;
  if (!page) return;
  document.querySelectorAll('.nav-links a[data-page], .mobile-menu a[data-page]').forEach(a => {
    if (a.dataset.page === page) a.classList.add('active');
  });
})();

// ═══ MOBILE MENU ═══
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

// ═══ FAQ ═══
function toggleFaq(btn) {
  const item = btn.parentElement;
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// ═══ FORMS — Web3Forms ═══
async function handleFormSubmit(event, formId, successId) {
  event.preventDefault();
  const form = document.getElementById(formId);
  const btn = form.querySelector('button[type="submit"]');
  const orig = btn.textContent;
  btn.textContent = 'Sending...'; btn.disabled = true;
  try {
    const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: new FormData(form) });
    const data = await res.json();
    if (data.success) {
      form.style.display = 'none';
      const el = document.getElementById(successId);
      if (el) el.style.display = 'block';
    } else {
      btn.textContent = orig; btn.disabled = false;
      alert('Something went wrong. Please email us at info@gridlogicjm.com');
    }
  } catch (err) {
    btn.textContent = orig; btn.disabled = false;
    alert('Unable to send. Please email info@gridlogicjm.com directly.');
  }
}

// ═══ FADE-IN ANIMATIONS ═══
function observeFadeIns() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) { setTimeout(() => e.target.classList.add('visible'), i * 70); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in:not(.visible)').forEach(el => obs.observe(el));
}
window.addEventListener('load', observeFadeIns);

// ═══ EXCEL-STYLE DEMO ANIMATIONS (home hero) ═══
const formulas = ['=SUMIF(B:B,"Done",D:D)', '=COUNTIF(B:B,"Pending")', '=SUM(D2:D6)', '=TODAY()-E3', '=VLOOKUP(A6,Clients!A:C,2,0)'];
const statuses = ['Ready  |  Jobs', 'Calculating...  |  AutoSum', 'Formula Applied  |  0 Errors', 'Ready  |  6 records'];
const rowIds = ['row2', 'row3', 'row4', 'row5', 'row6'];
let fi = 0, si = 0, ri = 0;

if (document.getElementById('formulaText')) {
  setInterval(() => {
    fi = (fi + 1) % formulas.length;
    const el = document.getElementById('formulaText');
    if (el) { el.style.opacity = 0; setTimeout(() => { el.textContent = formulas[fi]; el.style.opacity = 1; }, 300); }
  }, 3000);

  setInterval(() => {
    rowIds.forEach(id => { const e = document.getElementById(id); if (e) e.classList.remove('highlight'); });
    ri = (ri + 1) % rowIds.length;
    const t = document.getElementById(rowIds[ri]);
    if (t) t.classList.add('highlight');
  }, 2200);

  setInterval(() => {
    si = (si + 1) % statuses.length;
    const el = document.getElementById('excelStatus');
    if (el) el.textContent = statuses[si];
  }, 2500);
}
