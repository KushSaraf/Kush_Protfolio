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
    { id: "mission-001", x: 25, y: 35, name: "MISSION-001", desc: "Multi-UAV Swarm" },
    { id: "mission-002", x: 65, y: 25, name: "MISSION-002", desc: "ISRO UAV Docking" },
    { id: "mission-003", x: 75, y: 65, name: "MISSION-003", desc: "Smart Child Safety" },
    { id: "mission-004", x: 30, y: 75, name: "MISSION-004", desc: "Jarvis for Windows" },
    { id: "assignments", x: 50, y: 45, name: "FIELD ASSIGNMENTS", desc: "LTTRBX — AI DEPLOYMENT" },
    { id: "mission-006", x: 80, y: 40, name: "MISSION-006", desc: "Employee Monitoring" }
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
      // Flash the dot
      dot.style.background = "#fff";
      dot.style.boxShadow = "0 0 20px #fff";
      
      // Update readout
      radarPanel.classList.add('active');
      readoutTitle.textContent = "ACQUIRING TARGET...";
      readoutDesc.textContent = "CALCULATING TRAJECTORY...";
      
      setTimeout(() => {
        dot.style.background = "var(--warning-accent)";
        dot.style.boxShadow = "0 0 15px var(--warning-accent)";
        const el = document.getElementById(t.id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setTimeout(() => {
             el.style.background = "rgba(0, 255, 159, 0.1)";
             el.style.borderColor = "var(--primary-accent)";
             setTimeout(() => {
                 el.style.background = "";
                 el.style.borderColor = "";
             }, 800);
          }, 500);
        }
      }, 500);
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

  // --- Tab Title Flicker ---
  const titles = [
    "KS-CONTROL | OPERATOR: KUSH SARAF",
    "KS-CONTROL | ALL SYSTEMS NOMINAL",
    "KS-CONTROL | UPLINK ACTIVE ●"
  ];
  let titleIndex = 0;
  setInterval(() => {
    titleIndex = (titleIndex + 1) % titles.length;
    document.title = titles[titleIndex];
  }, 3000);

  // --- Drone Cursor ---
  const cursor = document.getElementById('drone-cursor');
  if(cursor) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
      requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Hover states
    const interactables = document.querySelectorAll('a, button, .radar-dot, .field-op-entry');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('drone-hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('drone-hover'));
    });
    
    const missionCards = document.querySelectorAll('.mission-card');
    missionCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        cursor.classList.add('drone-hover');
        cursor.classList.add('drone-scanning');
      });
      card.addEventListener('mouseleave', () => {
        cursor.classList.remove('drone-hover');
        cursor.classList.remove('drone-scanning');
      });
    });
    
    // Click state
    document.addEventListener('mousedown', () => {
      cursor.classList.add('drone-click');
      setTimeout(() => cursor.classList.remove('drone-click'), 200);
    });
  }

  // --- GitHub Live Feed ---
  const ghRepos = document.getElementById('gh-repos');
  const ghFollowers = document.getElementById('gh-followers');
  const ghUpdated = document.getElementById('gh-updated');
  
  if(ghRepos) {
    fetch('https://api.github.com/users/KushSaraf')
      .then(response => response.json())
      .then(data => {
        ghRepos.textContent = data.public_repos || '--';
        ghFollowers.textContent = data.followers || '--';
        if(data.updated_at) {
          const date = new Date(data.updated_at);
          ghUpdated.textContent = date.toISOString().split('T')[0];
        }
      })
      .catch(err => console.error("GitHub telemetry failed", err));
  }

  // --- Terminal Easter Egg ---
  const terminalOverlay = document.getElementById('terminal-overlay');
  const closeTerminal = document.getElementById('close-terminal');
  const terminalInput = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');
  
  if(terminalOverlay) {
    // Open on 'T' key
    document.addEventListener('keydown', (e) => {
      // Don't open if typing in an input
      if (e.key.toLowerCase() === 't' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        terminalOverlay.classList.add('active');
        terminalInput.focus();
      }
    });
    
    closeTerminal.addEventListener('click', () => {
      terminalOverlay.classList.remove('active');
    });
    
    function printTerminal(text) {
      const p = document.createElement('p');
      p.textContent = text;
      terminalOutput.appendChild(p);
      const terminalBody = document.getElementById('terminal-body');
      if (terminalBody) {
        terminalBody.scrollTop = terminalBody.scrollHeight;
      }
    }
    
    terminalInput.addEventListener('keydown', (e) => {
      if(e.key === 'Enter') {
        const cmd = terminalInput.value.trim().toLowerCase();
        printTerminal(`KS-CONTROL:~$ ${cmd}`);
        terminalInput.value = '';
        
        switch(cmd) {
          case 'help':
            printTerminal("AVAILABLE COMMANDS: whoami, skills, clear, exit");
            break;
          case 'whoami':
            printTerminal("OPERATOR: KUSH SARAF | AUTONOMOUS SYSTEMS | BATCH 2028");
            break;
          case 'skills':
            printTerminal("LOADING SUBSYSTEMS... [████████░░] 80% NOMINAL");
            break;
          case 'clear':
            terminalOutput.innerHTML = '';
            break;
          case 'exit':
            terminalOverlay.classList.remove('active');
            break;
          case '':
            break;
          default:
            printTerminal(`Command not found: ${cmd}`);
            break;
        }
      }
    });
  }
});
