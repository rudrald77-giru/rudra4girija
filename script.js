document.addEventListener('DOMContentLoaded', function() {
  // Get all elements safely
  const noBtn = document.getElementById('noBtn');
  const yesBtn = document.getElementById('yesBtn');
  const headline = document.getElementById('headline');
  const bgMusic = document.getElementById('bgMusic');
  const musicBtn = document.getElementById('musicBtn');
  const heartsBg = document.getElementById('heartsBg');
  const yesOverlay = document.getElementById('yesOverlay');
  const noOverlay = document.getElementById('noOverlay');
  const closeYes = document.getElementById('closeYes');
  const closeNo = document.getElementById('closeNo');

  // FIXED: Complete message arrays
  const prePopup = [
    "i love you giru please 💘",
    "please choose me girija 🙏",
    "i really really love you ❤️",
    "every moment with you feels magical ✨",
    "you are my favorite person always ❤️",
    "your smile makes my whole day ☀️"
  ];

  const postPopup = [
    "please say yes girija — let's make memories 💞",
    "i want to hold your hand forever 🤝❤️", 
    "you're building my whole world 🧩✨",
    "say yes and let's write our story 📖💕", 
    "i'll cherish every second with you 🌅"
  ];

  let hoverCount = 0;
  let popupShown = false;
  let lastSafePos = { x: 100, y: 200 };
  let musicUnlocked = false;

  // 🎵 Unlock music on first interaction
  function unlockMusic() {
    if (!musicUnlocked && bgMusic && bgMusic.paused) {
      bgMusic.play().then(() => {
        musicUnlocked = true;
        if (musicBtn) {
          musicBtn.textContent = '⏸️ Vachindamma';
          musicBtn.classList.add('playing');
        }
      }).catch(() => {});
    }
  }

  document.addEventListener('click', unlockMusic, { once: true });
  document.addEventListener('touchstart', unlockMusic, { once: true });

  // ❤️ RED HEARTS - Floating background
  function createFloatingHeart() {
    if (!heartsBg) return;
    const heart = document.createElement('div');
    heart.className = 'heart-float';
    heart.innerHTML = ['❤️','💖','💕','❤️'][Math.floor(Math.random() * 4)];
    heart.style.left = Math.random() * 95 + 'vw';
    heart.style.animationDuration = (4 + Math.random() * 4) + 's';
    heartsBg.appendChild(heart);
    setTimeout(() => heart.remove(), 8000);
  }
  setInterval(createFloatingHeart, 400);

  // 🎵 Music toggle
  if (musicBtn) {
    musicBtn.addEventListener('click', async (e) => {
      e.stopPropagation();
      try {
        if (bgMusic.paused) {
          bgMusic.currentTime = 0;
          await bgMusic.play();
          musicBtn.textContent = '⏸️ Vachindamma';
          musicBtn.classList.add('playing');
        } else {
          bgMusic.pause();
          musicBtn.textContent = '▶️ Vachindamma';
          musicBtn.classList.remove('playing');
        }
      } catch(e) {}
    });
  }

  // Initial headline
  if (headline) {
    headline.style.opacity = '0';
    headline.style.transition = 'all 0.5s ease';
    setTimeout(() => {
      headline.textContent = "FOR GIRIJA — MY EVERYTHING ❤️";
      headline.style.opacity = '1';
    }, 300);
  }

  // 🔥 No button - FIXED positioning + messages
  function moveNoButton(avoidX = -100, avoidY = -100) {
    if (!noBtn) return;
    
    const rect = noBtn.getBoundingClientRect();
    const btnWidth = rect.width || 130;
    const btnHeight = rect.height || 55;
    
    const safeMinX = 25;
    const safeMaxX = window.innerWidth - btnWidth - 25;
    const safeMinY = 220;
    const safeMaxY = window.innerHeight - btnHeight - 120;
    
    let newX, newY, validPos = false, attempts = 0;
    
    do {
      newX = safeMinX + Math.random() * (safeMaxX - safeMinX);
      newY = safeMinY + Math.random() * (safeMaxY - safeMinY);
      
      const distFromMouse = Math.hypot(newX - avoidX, newY - avoidY);
      const distFromLast = Math.hypot(newX - lastSafePos.x, newY - lastSafePos.y);
      
      validPos = distFromMouse > 120 && distFromLast > 80;
      attempts++;
    } while (!validPos && attempts < 30);
    
    lastSafePos = { x: newX, y: newY };
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
    noBtn.style.zIndex = '30';
    noBtn.style.transition = 'all 0.3s ease';
  }

  // 🖱️ No button hover - FIXED messages continue after popup
  if (noBtn) {
    noBtn.addEventListener('mouseenter', (e) => {
      hoverCount++;
      
      // ✅ FIXED: Messages work BEFORE and AFTER popup
      if (hoverCount <= prePopup.length && headline) {
        headline.textContent = prePopup[hoverCount - 1];
      } else if (headline) {
        const idx = (hoverCount - prePopup.length - 1) % postPopup.length;
        headline.textContent = postPopup[idx];
      }
      
      // Animate headline
      if (headline) {
        headline.style.opacity = '0.8';
        headline.style.transform = 'translateY(3px)';
        setTimeout(() => {
          headline.style.opacity = '1';
          headline.style.transform = 'translateY(0)';
        }, 150);
      }
      
      moveNoButton(e.clientX, e.clientY);
      
      // ✨ Custom popup at 6th hover
      if (hoverCount === 6 && !popupShown) {
        popupShown = true;
        setTimeout(() => showEvenIfCustomPopup(), 200);
      }
    });

    // Block No clicks
    noBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      showNoOverlay();
    });

    noBtn.tabIndex = -1;
    noBtn.setAttribute('aria-disabled', 'true');
  }

  // ✅ YES BUTTON - Perfect Rose Day explosion
  if (yesBtn) {
    yesBtn.addEventListener('click', async (e) => {
      e.stopPropagation();
      
      // ❤️ MASSIVE RED HEART EXPLOSION (80 hearts)
      for (let i = 0; i < 80; i++) {
        setTimeout(() => {
          if (i % 4 === 0) {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.cssText = `
              position: fixed; left: ${Math.random()*90}vw; top: 100vh;
              font-size: 2.8rem; z-index: 1001; pointer-events: none;
              animation: celebrateHeart 2s linear forwards;
              text-shadow: 0 0 20px rgba(255,68,68,0.8);
            `;
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 2000);
          }
        }, i * 6);
      }

      // Music blast
      if (bgMusic) {
        bgMusic.currentTime = 0;
        bgMusic.volume = 0.4;
        bgMusic.play().catch(() => {});
      }

      // Show Rose Day Yes overlay
      if (yesOverlay) {
        yesOverlay.classList.add('show');
      }
    });
  }

  // ❌ NO OVERLAY - Gentle hearts
  function showNoOverlay() {
    if (bgMusic) {
      bgMusic.currentTime = 0;
      bgMusic.volume = 0.25;
      bgMusic.play().catch(() => {});
    }

    for (let i = 0; i < 40; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.cssText = `
          position: fixed; left: ${Math.random()*90}vw; top: ${Math.random()*40+20}vh;
          font-size: 1.6rem; z-index: 1001; pointer-events: none;
          animation: gentleFloat 3s ease-out forwards;
          text-shadow: 0 0 15px rgba(255,68,68,0.6);
        `;
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 3000);
      }, i * 25);
    }

    if (noOverlay) {
      noOverlay.classList.add('show');
    }
  }

  // ✨ GORGEOUS CUSTOM POPUP (6 hovers) - Messages continue after
  function showEvenIfCustomPopup() {
    // Heart trail
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.cssText = `
          position: fixed; left: ${Math.random()*90}vw; top: ${Math.random()*50+20}vh;
          font-size: 2rem; z-index: 1002; pointer-events: none;
          animation: gentleFloat 3s ease-out forwards;
          text-shadow: 0 0 20px rgba(255,68,68,0.8);
        `;
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 3000);
      }, i * 25);
    }

    const popup = document.createElement('div');
    popup.id = 'customEvenIfPopup';
    popup.style.cssText = `
      position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(0.7);
      width: 90%; max-width: 450px; background: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,240,240,0.9));
      backdrop-filter: blur(35px); border-radius: 30px; padding: 3rem 2rem; border: 2px solid rgba(255,255,255,0.7);
      text-align: center; z-index: 1003; box-shadow: 0 40px 80px rgba(0,0,0,0.3), 0 0 60px rgba(255,68,68,0.4);
      animation: epicPopupReveal 0.8s cubic-bezier(0.34,1.56,0.64,1) forwards;
    `;
    
    popup.innerHTML = `
      <div style="font-size: 2.5rem; margin-bottom: 1rem; animation: emojiFloat 2s ease-in-out infinite;">❤️✨❤️</div>
      <h2 style="font-size: clamp(1.8em, 6vw, 2.8em); font-weight: 900; margin-bottom: 1rem; color: #FF69B4; text-shadow: 0 0 30px rgba(168,85,247,0.8);">Even If You Say No</h2>
      <p style="font-size: 1.4em; font-weight: 800; color: #FF6B9D; margin: 1.5rem 0; text-shadow: 0 0 25px rgba(168,85,247,0.8); animation: heartPulse 2s ease-in-out infinite;">
        My heart will <span style="color: #FF4444; text-shadow: 0 0 40px #FF4444; font-size: 1.1em;">ALWAYS</span> choose you ❤️
      </p>
      <p style="font-size: 1.2em; color: #6B7280; margin: 1.5rem 0; line-height: 1.7;">
        Girija... no matter what you choose 💕<br>
        <span style="color: #FF69B4; font-weight: 700; text-shadow: 0 0 20px rgba(168,85,247,0.6);">I'll wait for you forever ✨</span>
      </p>
      <button onclick="document.getElementById('customEvenIfPopup')?.remove()" style="background: linear-gradient(135deg, #FF6B9D, #FF4444); color: white; border: none; border-radius: 25px; padding: 1rem 2.5rem; font-size: 1.1rem; font-weight: 700; cursor: pointer; margin-top: 1.5rem; box-shadow: 0 15px 35px rgba(255,68,68,0.5); transition: all 0.3s ease;">
        I Know You Love Me Too ❤️
      </button>
    `;
    
    document.body.appendChild(popup);
    
    const style = document.createElement('style');
    style.textContent = `
      @keyframes epicPopupReveal { 0% { transform: translate(-50%, -50%) scale(0.7) rotateX(30deg); opacity: 0; } 50% { transform: translate(-50%, -50%) scale(1.05); } 100% { transform: translate(-50%, -50%) scale(1) rotateX(0deg); opacity: 1; } }
      @keyframes emojiFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
      @keyframes heartPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
      @keyframes celebrateHeart { 0% { transform: translateY(100vh) scale(0) rotate(0deg); opacity: 0; } 20% { opacity: 1; transform: scale(1) rotate(180deg); } 100% { transform: translateY(-120px) scale(0) rotate(720deg); opacity: 0; } }
      @keyframes gentleFloat { 0% { transform: translateY(0) scale(0.5); opacity: 0; } 20% { opacity: 1; transform: scale(1); } 100% { transform: translateY(-60px) scale(1.1) rotate(15deg); opacity: 0; } }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
      if (document.getElementById('customEvenIfPopup')) {
        document.getElementById('customEvenIfPopup').style.animation = 'epicPopupReveal 0.5s reverse forwards';
        setTimeout(() => document.getElementById('customEvenIfPopup')?.remove(), 500);
      }
    }, 8000);
  }

  // Close buttons
  if (closeYes) closeYes.addEventListener('click', () => yesOverlay?.classList.remove('show'));
  if (closeNo) closeNo.addEventListener('click', () => noOverlay?.classList.remove('show'));

  // Safety positioning
  setTimeout(() => moveNoButton(), 600);
  window.addEventListener('resize', () => setTimeout(moveNoButton, 200));
});
