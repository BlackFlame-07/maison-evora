/**
 * MAISON EVORA — STANDALONE HIGH-PERFORMANCE MOTION & LENIS ENGINE
 * Floor 2 | Ryan Howard | Blackflame Designs
 * 
 * - 0ms perceived input lag (Crisp Lerp 0.12 with buttery mouse wheel)
 * - 60fps GPU compositor isolation & parallax transforms
 * - Zero hydration contention
 * - Live Europe/Lisbon Studio Clock
 * - Interactive Menu Drawer Toggle
 */

(() => {
  let lenis = null;

  // 1. INITIALIZE BUTTERY ZERO-LAG LENIS ENGINE
  function initLenis() {
    if (typeof window.Lenis === 'undefined') {
      window.addEventListener('scroll', () => onScrollTick(window.scrollY), { passive: true });
      return;
    }

    lenis = new window.Lenis({
      lerp: 0.12,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.0,
      smoothWheel: true,
      smoothTouch: false,
      autoResize: true
    });

    window.__lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on('scroll', (e) => {
      const scrollY = e.scroll !== undefined ? e.scroll : window.scrollY;
      onScrollTick(scrollY);
    });

    // Anchor smooth scroll travel
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId && targetId !== '#') {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            lenis.scrollTo(targetEl, { offset: -60, duration: 1.0 });
          }
        }
      });
    });
  }

  // 2. SCROLL MATRIX HARMONIZER (Optimized 60fps compositor update)
  const telemetry = window.__FRAMER_TELEMETRY__ || {};
  const scrollMatrix = telemetry.scrollMatrix || {};
  const scrollIds = Object.keys(scrollMatrix).filter(id => {
    const points = scrollMatrix[id];
    return points && points.length > 1;
  });

  function onScrollTick(sy) {
    if (scrollIds.length === 0) return;
    for (let i = 0; i < scrollIds.length; i++) {
      const id = scrollIds[i];
      const el = document.querySelector(`[data-f-id="${id}"]`);
      if (!el) continue;
      const points = scrollMatrix[id];

      // Find nearest recorded sample
      let best = points[0];
      let minDiff = Math.abs(sy - best.y);
      for (let j = 1; j < points.length; j++) {
        const d = Math.abs(sy - points[j].y);
        if (d < minDiff) {
          minDiff = d;
          best = points[j];
        }
      }
      if (best.transform) el.style.transform = best.transform;
      if (best.opacity !== undefined && best.opacity !== '') el.style.opacity = best.opacity;
    }
  }

  // 3. ENTRANCE WAAPI ANIMATIONS (Sanitized null-safe playback)
  function initWaapi() {
    const waapiList = telemetry.waapi || [];
    const played = new Set();

    waapiList.forEach(item => {
      if (!item || !item.id || !item.keyframes) return;
      const el = document.querySelector(`[data-f-id="${item.id}"]`);
      if (!el) return;

      // Filter out null/undefined values to prevent browser console warnings
      const validKeyframes = item.keyframes.map(kf => {
        const cleanKf = {};
        if (kf.transform != null) cleanKf.transform = kf.transform;
        if (kf.opacity != null) cleanKf.opacity = kf.opacity;
        if (kf.offset != null) cleanKf.offset = kf.offset;
        return cleanKf;
      }).filter(kf => Object.keys(kf).length > 0);

      if (validKeyframes.length < 2) return;

      const opts = {
        duration: item.options.duration || 800,
        delay: item.options.delay || 0,
        easing: item.options.easing || 'cubic-bezier(0.22, 1, 0.36, 1)',
        fill: 'forwards',
        iterations: item.options.iterations === 'Infinity' ? Infinity : (item.options.iterations || 1)
      };

      if (opts.iterations === Infinity) {
        el.animate(validKeyframes, opts);
      } else if (!played.has(item.id)) {
        played.add(item.id);
        const io = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              el.animate(validKeyframes, opts);
              io.unobserve(el);
            }
          });
        }, { threshold: 0.1 });
        io.observe(el);
      }
    });
  }

  // 4. SUBTREE VARIANT HOVER TRIGGERS
  function initHovers() {
    const hoverMap = telemetry.hoverMap || {};
    Object.keys(hoverMap).forEach(rootId => {
      const root = document.querySelector(`[data-f-id="${rootId}"]`);
      if (!root) return;
      const data = hoverMap[rootId];

      root.addEventListener('pointerenter', () => {
        if (data.hoverClass && data.defaultClass) root.className = data.hoverClass;
        (data.waapi || []).forEach(anim => {
          const target = document.querySelector(`[data-f-id="${anim.id}"]`) || root;
          target.animate(anim.keyframes, { ...anim.options, fill: 'forwards' });
        });
      });

      root.addEventListener('pointerleave', () => {
        if (data.defaultClass) root.className = data.defaultClass;
        (data.waapi || []).forEach(anim => {
          const target = document.querySelector(`[data-f-id="${anim.id}"]`) || root;
          const rev = [...anim.keyframes].reverse();
          target.animate(rev, { ...anim.options, fill: 'forwards' });
        });
      });
    });
  }

  // 5. LIVE LISBON / EVORA STUDIO CLOCK
  function initClock() {
    const timeEls = document.querySelectorAll('[data-framer-name="Time"] p, [data-framer-name="Time"] span');
    if (timeEls.length === 0) return;

    const updateTime = () => {
      try {
        const now = new Date();
        const opts = { timeZone: 'Europe/Lisbon', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        const timeStr = new Intl.DateTimeFormat('en-GB', opts).format(now);
        timeEls.forEach(el => {
          if (el.innerText && el.innerText.includes(':')) {
            el.innerText = timeStr + ' GMT+1';
          }
        });
      } catch (e) {}
    };
    setInterval(updateTime, 1000);
    updateTime();
  }

  // 6. NAVIGATION MENU DRAWER TOGGLE
  function initNavToggle() {
    const menuButtons = document.querySelectorAll('[data-framer-name="Desktop - Open"], [data-framer-name="Default"]');
    menuButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') return;
        const currentName = btn.getAttribute('data-framer-name');
        btn.setAttribute('data-framer-name', currentName === 'Desktop - Open' ? 'Desktop - Close' : 'Desktop - Open');
      });
    });
  }

  // DOM READY MOUNT
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initLenis();
      initWaapi();
      initHovers();
      initClock();
      initNavToggle();
    });
  } else {
    initLenis();
    initWaapi();
    initHovers();
    initClock();
    initNavToggle();
  }
})();
