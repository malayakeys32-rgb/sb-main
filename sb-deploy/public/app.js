const API_BASE = "https://sb-main-back.onrender.com";
/* ── Nav switching ───────────────────────────────────────────────────────── */
document.querySelectorAll('.sb-nav button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.sb-nav button').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.sb-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('panel-' + btn.dataset.panel).classList.add('active');
  });
});

/* ── Waveform bars ───────────────────────────────────────────────────────── */
const waveform = document.getElementById('waveform');
if (waveform) {
  waveform.style.display = 'flex';
  waveform.style.alignItems = 'flex-end';
  waveform.style.gap = '2px';
  waveform.style.padding = '4px 6px';
  waveform.style.background = 'rgba(255,140,0,0.04)';
  for (let i = 0; i < 55; i++) {
    const bar = document.createElement('div');
    bar.style.cssText = `
      flex:1; background:linear-gradient(to top,#ff8c00,#ffd27f);
      height:20%; border-radius:1px;
      animation:sb-wave 1.2s ease-in-out infinite;
      animation-delay:${(i * 0.05).toFixed(2)}s;
    `;
    waveform.appendChild(bar);
  }
  const style = document.createElement('style');
  style.textContent = '@keyframes sb-wave{0%,100%{height:15%}50%{height:80%}}';
  document.head.appendChild(style);
}

/* ── Live status ping ────────────────────────────────────────────────────── */
const dot   = document.getElementById('linkDot');
const label = document.getElementById('linkLabel');

fetch('/api/status')
  .then(r => r.ok ? r.json() : Promise.reject())
  .then(() => {
    dot.className   = 'sb-dot online';
    label.textContent = 'Secure Link Active';
  })
  .catch(() => {
    dot.className   = 'sb-dot offline';
    label.textContent = 'Link Offline';
  });

/* ── Dashboard ───────────────────────────────────────────────────────────── */
fetch('/api/dashboard')
  .then(r => r.json())
  .then(d => {
    document.getElementById('systemsOnline').textContent      = d.systemsOnline;
    document.getElementById('activeAlerts').textContent       = d.activeAlerts;
    document.getElementById('operativesDeployed').textContent = d.operativesDeployed;
    document.getElementById('currentOp').textContent          = d.currentOp;
    document.getElementById('threatLevel').textContent        = d.threatLevel;
    document.getElementById('threatLevel').style.color        = '#ff5c3a';

    const list = document.getElementById('activityList');
    d.recentActivity.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.text} — ${item.time}`;
      list.appendChild(li);
    });
  });

/* ── Evidence ────────────────────────────────────────────────────────────── */
fetch('/api/evidence')
  .then(r => r.json())
  .then(d => {
    document.getElementById('totalCases').textContent    = d.totalCases;
    document.getElementById('pendingReview').textContent = d.pendingReview;
    document.getElementById('archived').textContent      = d.archived;

    const list = document.getElementById('evidenceList');
    d.items.forEach(item => {
      const li  = document.createElement('li');
      li.innerHTML = `
        <span>${item.name} <small style="color:#ffa040">[${item.status}]</small></span>
        <button class="sb-view-btn">VIEW</button>`;
      list.appendChild(li);
    });
  });

/* ── Ops ─────────────────────────────────────────────────────────────────── */
fetch('/api/ops')
  .then(r => r.json())
  .then(d => {
    document.getElementById('activeOps').textContent    = d.activeOps;
    document.getElementById('completedOps').textContent = d.completedOps;

    const list = document.getElementById('opsList');
    d.operations.forEach(op => {
      const li = document.createElement('li');
      li.textContent = `${op.name} — ${op.status} — ${op.lead}`;
      list.appendChild(li);
    });
  });

/* ── System health ───────────────────────────────────────────────────────── */
fetch('/api/system')
  .then(r => r.json())
  .then(d => {
    document.getElementById('cpuLoad').textContent      = d.cpuLoad;
    document.getElementById('memoryUsage').textContent  = d.memoryUsage;
    document.getElementById('networkStatus').textContent = d.networkStatus;
    document.getElementById('sysUptime').textContent    = d.uptime;

    const list = document.getElementById('servicesList');
    d.services.forEach(svc => {
      const li = document.createElement('li');
      li.textContent = `${svc.name}: ${svc.status}`;
      list.appendChild(li);
    });
  });

/* ── Settings ────────────────────────────────────────────────────────────── */
fetch('/api/settings')
  .then(r => r.json())
  .then(d => {
    document.getElementById('settingNotifications').textContent = d.notifications ? 'Enabled' : 'Disabled';
    document.getElementById('settingTwoFactor').textContent     = d.twoFactorAuth  ? 'Enabled' : 'Disabled';
    document.getElementById('settingTheme').textContent         = d.theme;
    document.getElementById('settingAccess').textContent        = d.apiAccessLevel;
  });

/* ── Auth login ──────────────────────────────────────────────────────────── */
document.getElementById('loginBtn').addEventListener('click', () => {
  const user   = document.getElementById('loginUser').value;
  const pass   = document.getElementById('loginPass').value;
  const result = document.getElementById('loginResult');

  fetch('/api/auth/login', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ user, pass })
  })
    .then(r => r.json())
    .then(d => {
      if (d.token) {
        result.style.color = '#39ff14';
        result.textContent = 'Authentication successful — token issued.';
      } else {
        result.style.color = '#ff5c3a';
        result.textContent = d.error || 'Authentication failed.';
      }
    })
    .catch(() => {
      result.style.color = '#ff5c3a';
      result.textContent = 'Connection error.';
    });
});
