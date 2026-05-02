document.addEventListener("DOMContentLoaded", () => {
  // --- Boot Sequence ---
  const bootText = [
    "INITIALIZING GROUND CONTROL SYSTEM...",
    "LOADING OPERATOR PROFILE: KUSH SARAF",
    "TELEMETRY LINK: ESTABLISHED",
    "ALL SYSTEMS NOMINAL"
  ];
  
  const bootDiv = document.getElementById('boot-text');
  const bootSequence = document.getElementById('boot-sequence');
  let lineIndex = 0;
  
  function typeLine() {
    if (lineIndex < bootText.length) {
      const p = document.createElement('p');
      bootDiv.appendChild(p);
      
      let charIndex = 0;
      const lineStr = bootText[lineIndex];
      
      const typeInterval = setInterval(() => {
        if (charIndex < lineStr.length) {
          p.textContent += lineStr.charAt(charIndex);
          charIndex++;
        } else {
          clearInterval(typeInterval);
          lineIndex++;
          setTimeout(typeLine, 300); // Wait before next line
        }
      }, 30); // Typing speed
    } else {
      // Boot finished
      setTimeout(() => {
        bootSequence.classList.add('scanline-flash');
        setTimeout(() => {
          bootSequence.style.display = 'none';
          document.body.classList.add('booted');
        }, 400); // Hide after flash
      }, 500);
    }
  }
  
  typeLine();

  // --- Clock (LOCAL Time) ---
  const clockEl = document.getElementById('zulu-clock');
  setInterval(() => {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    clockEl.textContent = `${h}:${m}:${s}`;
  }, 1000);

  // --- Radar System ---
  const radar = document.querySelector('.radar');
  const radarPanel = document.getElementById('radar-readout');
  const readoutTitle = document.getElementById('readout-title');
  const readoutDesc = document.getElementById('readout-desc');

  const targets = [
    { x: 25, y: 35, name: "MISSION-001", desc: "Multi-UAV Swarm" },
    { x: 65, y: 25, name: "MISSION-002", desc: "ISRO UAV Docking" },
    { x: 75, y: 65, name: "MISSION-003", desc: "Smart Child Safety" },
    { x: 30, y: 75, name: "MISSION-004", desc: "Jarvis for Windows" },
    { x: 50, y: 45, name: "MISSION-005", desc: "AI Internship — LTTRBX" },
    { x: 80, y: 40, name: "MISSION-006", desc: "Employee Monitoring" }
  ];

  targets.forEach(t => {
    const dot = document.createElement('div');
    dot.className = 'radar-dot';
    dot.style.left = `${t.x}%`;
    dot.style.top = `${t.y}%`;
    
    dot.addEventListener('mouseenter', () => {
      radarPanel.classList.add('active');
      readoutTitle.textContent = `TARGET LOCKED: ${t.name}`;
      readoutDesc.textContent = `PAYLOAD: ${t.desc}`;
      dot.style.boxShadow = "0 0 15px #ff6b35";
    });
    
    dot.addEventListener('mouseleave', () => {
      radarPanel.classList.remove('active');
      readoutTitle.textContent = "AWAITING LOCK...";
      readoutDesc.textContent = "Hover over radar targets to initialize scan.";
      dot.style.boxShadow = "0 0 8px #ff6b35";
    });

    dot.addEventListener('click', () => {
      const missionId = `mission-00${targets.indexOf(t) + 1}`;
      const el = document.getElementById(missionId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    radar.appendChild(dot);
  });

  // --- Data Flicker ---
  const flickerEls = document.querySelectorAll('.flicker');
  setInterval(() => {
    const el = flickerEls[Math.floor(Math.random() * flickerEls.length)];
    if(el) {
      const original = el.getAttribute('data-val');
      el.textContent = Math.floor(Math.random() * 99);
      setTimeout(() => {
        el.textContent = original;
      }, 100);
    }
  }, 3000);

  // --- Scroll Reveal ---
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(r => observer.observe(r));

  // --- Comms Form ---
  const form = document.getElementById('comms-form');
  const status = document.getElementById('transmit-status');
  if(form) {
    form.addEventListener('submit', () => {
      status.textContent = "UPLINKING TO ORBITAL RELAY...";
    });
  }
});
