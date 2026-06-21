document.addEventListener("DOMContentLoaded", () => {
  // --- Boot Sequence ---
  const bootText = [
    "INITIALIZING GROUND CONTROL SYSTEM...",
    "LOADING OPERATOR PROFILE: KUSH SARAF",
    "HCR LAB LINK: ACTIVE  |  REUDE UPLINK: ESTABLISHED",
    "TELEMETRY LINK: NOMINAL  |  DEPLOYMENTS: 3 ACTIVE",
    "ALL SYSTEMS NOMINAL"
  ];
  
  const bootDiv = document.getElementById('boot-text');
  const bootSequence = document.getElementById('boot-sequence');
  let lineIndex = 0;
  let bootFallback;
  
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
          setTimeout(typeLine, 200); // Wait before next line
        }
      }, 20); // Typing speed
    } else {
      // Boot finished
      clearTimeout(bootFallback);
      setTimeout(() => {
        bootSequence.classList.add('scanline-flash');
        setTimeout(() => {
          bootSequence.style.display = 'none';
          document.body.classList.add('booted');
        }, 400); // Hide after flash
      }, 500);
    }
  }
  
  if (window.innerWidth < 768) {
    bootSequence.style.display = 'none';
    document.body.classList.add('booted');
  } else {
    bootFallback = setTimeout(() => {
      bootSequence.style.display = 'none';
      document.body.classList.add('booted');
    }, 4000);
    typeLine();
  }

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
    { id: "mission-aerosense", x: 40, y: 20, name: "MISSION-006", desc: "AeroSense Simulation" },
    { id: "mission-001", x: 25, y: 35, name: "MISSION-001", desc: "Multi-UAV Swarm" },
    { id: "mission-002", x: 65, y: 25, name: "MISSION-002", desc: "ISRO UAV Docking" },
    { id: "mission-003", x: 75, y: 65, name: "MISSION-003", desc: "Smart Child Safety" },
    { id: "mission-004", x: 30, y: 75, name: "MISSION-004", desc: "Jarvis for Windows" },
    { id: "mission-005", x: 80, y: 40, name: "MISSION-005", desc: "Employee Monitoring" },
    { id: "assignments", x: 50, y: 45, name: "FIELD DEPLOYMENTS", desc: "HCR IIT-GN | REUDE | LTTRBX" },
    { id: "achievements", x: 85, y: 80, name: "COMMENDATIONS", desc: "Grants & Victories" },
    { id: "research", x: 15, y: 55, name: "RESEARCH OPS", desc: "IEEE Publications" }
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
  const ghGists = document.getElementById('gh-gists');
  const ghOrigin = document.getElementById('gh-origin');
  const ghUpdated = document.getElementById('gh-updated');
  
  if(ghRepos) {
    fetch('https://api.github.com/users/KushSaraf')
      .then(response => response.json())
      .then(data => {
        ghRepos.textContent = data.public_repos || '0';
        if(ghGists) ghGists.textContent = data.public_gists || '0';
        if(ghOrigin && data.created_at) {
          const originDate = new Date(data.created_at);
          ghOrigin.textContent = originDate.getFullYear();
        }
        if(data.updated_at) {
          const updateDate = new Date(data.updated_at);
          ghUpdated.textContent = updateDate.toISOString().split('T')[0];
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
            printTerminal("AVAILABLE COMMANDS: whoami, deployments, vins, gait, skills, clear, exit");
            break;
          case 'whoami':
            printTerminal("OPERATOR: KUSH SARAF | AUTONOMOUS SYSTEMS / GAIT ANALYSIS | BATCH 2028");
            printTerminal("AFFIL   : KARNAVATI UNIVERSITY × IIT GANDHINAGAR — HCR LAB");
            printTerminal("ACTIVE  : VINS UAV NAV (REUDE) | WEARABLE SENSING (HCR LAB IIT-GN)");
            break;
          case 'deployments':
            printTerminal(">> ACTIVE FIELD DEPLOYMENTS");
            printTerminal("   D-001: HCR LAB IIT-GN — RESEARCH INTERN [ACTIVE] MAY-JUL 2026");
            printTerminal("         Wearable gait sensing | PCB design | I2C/UART | vGRF estimation");
            printTerminal("   D-002: REUDE TECHNOLOGIES — UAV NAV & CONTROL [ACTIVE]");
            printTerminal("         VINS integration | MAVLink offboard | ROS2 autonomy");
            printTerminal("   D-003: LTTRBX TECHNOLABS — AI INTERN [COMPLETE] MAY-JUL 2025");
            printTerminal("         NLP CRM engine | ML financial forecasting");
            break;
          case 'vins':
            printTerminal(">> VINS — VISUAL-INERTIAL NAVIGATION SYSTEMS");
            printTerminal("   PLATFORM : ROS2 + MAVLink offboard control");
            printTerminal("   SENSORS  : Camera + IMU (synchronized)");
            printTerminal("   STATUS   : ACTIVE DEV @ REUDE TECHNOLOGIES");
            printTerminal("   GOAL     : GPS-denied UAV state estimation and trajectory control");
            break;
          case 'gait':
            printTerminal(">> WEARABLE GAIT ANALYSIS — HCR LAB, IIT GANDHINAGAR");
            printTerminal("   SENSORS : Pneumatic insoles + IMUs");
            printTerminal("   TARGET  : Vertical Ground Reaction Force (vGRF) estimation");
            printTerminal("   HW      : Custom PCBs | I2C/UART | Sensor integration");
            printTerminal("   ML      : Pressure + inertial data pipeline for gait characterization");
            break;
          case 'skills':
            printTerminal(">> ONBOARD SYSTEMS DIAGNOSTIC");
            printTerminal("   [NOMINAL] Python/C++ | ROS2/MAVLink | PyTorch/OpenCV");
            printTerminal("   [NOMINAL] PCB Design | I2C/UART | SolidWorks | Flask");
            printTerminal("   [NOMINAL] YOLOv8 | DeepSORT | SLAM | Gazebo SITL");
            printTerminal("   SYSTEMS OPERATIONAL: 15 / 15  ██████████ 100%");
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

  // --- Mobile Nav Active State ---
  const sections = document.querySelectorAll('section');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  
  if(mobileNavLinks.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          mobileNavLinks.forEach(link => {
            link.classList.remove('active');
            if(link.getAttribute('href') === `#${entry.target.id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(sec => sectionObserver.observe(sec));
  }
});
