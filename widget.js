(function () {
  'use strict';

  /**
   * ============================================================
   *  B2B AI Receptionist Widget (Self-Contained, No Dependencies)
   * ============================================================
   * - Safe IIFE scope (no global variable pollution)
   * - Pure JS inline styles (no external CSS/framework)
   * - DOMContentLoaded + body-safe bootstrap pipeline
   * - Floating Action Button (FAB) + toggled chat window
   * - Placeholder iframe source for scheduling/chat integration
   */

  console.log('🧩 [AI Receptionist] Script loaded. Waiting for safe DOM mount...');

  // --------------------------
  // Configurable Integration
  // --------------------------
  var CONFIG = {
iframeSrc: 'https://creator.voiceflow.com/share/6aa5fd1485d52ad39ce609ca/environment/main/draft',
    zIndex: 999999,
    fabSize: 65,
    chatWidth: 380,
    chatHeight: 550
  };

  // Internal state
  var state = {
    mounted: false,
    isOpen: false
  };

  /**
   * Utility: Apply a map of inline style properties.
   * @param {HTMLElement} el
   * @param {Object<string,string|number>} styles
   */
  function applyStyles(el, styles) {
    for (var key in styles) {
      if (Object.prototype.hasOwnProperty.call(styles, key)) {
        el.style[key] = styles[key];
      }
    }
  }

  /**
   * Build and mount widget to document.body
   */
  function mountWidget() {
    if (state.mounted) {
      console.log('ℹ️ [AI Receptionist] Mount skipped: already mounted.');
      return;
    }

    if (!document.body) {
      console.warn('⚠️ [AI Receptionist] document.body not ready yet. Retrying...');
      return;
    }

    // Root container (fixed anchor for all widget elements)
    var root = document.createElement('div');
    root.setAttribute('data-ai-receptionist-widget', 'true');
    applyStyles(root, {
      position: 'fixed',
      right: '24px',
      bottom: '24px',
      zIndex: String(CONFIG.zIndex),
      fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      boxSizing: 'border-box',
      lineHeight: '1.2'
    });

    // Ensure style isolation for all descendants
    root.style.all = 'initial';
    root.style.position = 'fixed';
    root.style.right = '24px';
    root.style.bottom = '24px';
    root.style.zIndex = String(CONFIG.zIndex);
    root.style.fontFamily =
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
    root.style.boxSizing = 'border-box';

    // Chat Window Wrapper
    var chatWindow = document.createElement('div');
    applyStyles(chatWindow, {
      position: 'absolute',
      right: '0',
      bottom: (CONFIG.fabSize + 16) + 'px',
      width: CONFIG.chatWidth + 'px',
      height: CONFIG.chatHeight + 'px',
      maxWidth: 'calc(100vw - 24px)',
      maxHeight: 'calc(100vh - 100px)',
      borderRadius: '16px',
      background: '#0E0F14',
      boxShadow: '0px 8px 32px rgba(0,0,0,0.5)',
      overflow: 'hidden',
      display: 'none', // hidden default
      flexDirection: 'column',
      opacity: '0',
      transform: 'translateY(18px) scale(0.98)',
      transition: 'opacity 220ms ease-in-out, transform 220ms ease-in-out'
    });

    // Header
    var header = document.createElement('div');
    header.textContent = 'AI Business Receptionist';
    applyStyles(header, {
      height: '58px',
      minHeight: '58px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px',
      color: '#F5F7FF',
      fontSize: '15px',
      fontWeight: '600',
      letterSpacing: '0.2px',
      background: 'linear-gradient(135deg, #1A1A24 0%, #2D2D3F 100%)',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      boxSizing: 'border-box'
    });

    // Content frame (iframe placeholder)
    var content = document.createElement('div');
    applyStyles(content, {
      flex: '1',
      minHeight: '0',
      background: '#0E0F14'
    });

    var frame = document.createElement('iframe');
    frame.setAttribute('title', 'AI Receptionist Scheduler');
    frame.setAttribute('loading', 'lazy');
    frame.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
    frame.src = CONFIG.iframeSrc;
    applyStyles(frame, {
      width: '100%',
      height: '100%',
      border: '0',
      display: 'block',
      background: '#0E0F14'
    });

    // Floating Action Button
    var fab = document.createElement('button');
    fab.type = 'button';
    fab.setAttribute('aria-label', 'Open AI Receptionist Chat');
    fab.setAttribute('title', 'Chat with AI Receptionist');
    fab.textContent = '💬';
    applyStyles(fab, {
      width: CONFIG.fabSize + 'px',
      height: CONFIG.fabSize + 'px',
      borderRadius: '50%',
      border: '0',
      outline: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '22px',
      color: '#FFFFFF',
      background: 'linear-gradient(135deg, #1A1A24 0%, #2D2D3F 100%)',
      boxShadow: '0 10px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.12)',
      transition: 'transform 180ms ease, box-shadow 180ms ease, filter 180ms ease',
      userSelect: 'none',
      WebkitTapHighlightColor: 'transparent'
    });

    // Hover + press animation handlers
    fab.addEventListener('mouseenter', function () {
      fab.style.transform = 'translateY(-2px) scale(1.03)';
      fab.style.boxShadow = '0 14px 30px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.15)';
      fab.style.filter = 'brightness(1.08)';
    });

    fab.addEventListener('mouseleave', function () {
      fab.style.transform = 'translateY(0) scale(1)';
      fab.style.boxShadow = '0 10px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.12)';
      fab.style.filter = 'brightness(1)';
    });

    fab.addEventListener('mousedown', function () {
      fab.style.transform = 'translateY(0) scale(0.97)';
    });

    fab.addEventListener('mouseup', function () {
      fab.style.transform = state.isOpen ? 'translateY(-2px) scale(1.03)' : 'translateY(0) scale(1)';
    });

    // Toggle chat visibility logic
    function openChat() {
      state.isOpen = true;
      chatWindow.style.display = 'flex';

      // Force reflow so transition can animate from initial state
      // eslint-disable-next-line no-unused-expressions
      chatWindow.offsetHeight;

      chatWindow.style.opacity = '1';
      chatWindow.style.transform = 'translateY(0) scale(1)';
      fab.setAttribute('aria-label', 'Close AI Receptionist Chat');
      console.log('💬 [AI Receptionist] Chat window opened.');
    }

    function closeChat() {
      state.isOpen = false;
      chatWindow.style.opacity = '0';
      chatWindow.style.transform = 'translateY(18px) scale(0.98)';
      fab.setAttribute('aria-label', 'Open AI Receptionist Chat');

      // Hide display after transition
      window.setTimeout(function () {
        if (!state.isOpen) {
          chatWindow.style.display = 'none';
        }
      }, 220);

      console.log('🛑 [AI Receptionist] Chat window closed.');
    }

    fab.addEventListener('click', function () {
      try {
        if (state.isOpen) {
          closeChat();
        } else {
          openChat();
        }
      } catch (err) {
        console.error('❌ [AI Receptionist] Toggle error:', err);
      }
    });

    // Mobile responsiveness adjustment
    function handleResponsiveLayout() {
      try {
        if (window.innerWidth <= 440) {
          chatWindow.style.width = 'calc(100vw - 20px)';
          chatWindow.style.height = 'min(550px, calc(100vh - 100px))';
          root.style.right = '10px';
          root.style.bottom = '16px';
        } else {
          chatWindow.style.width = CONFIG.chatWidth + 'px';
          chatWindow.style.height = CONFIG.chatHeight + 'px';
          root.style.right = '24px';
          root.style.bottom = '24px';
        }
      } catch (err) {
        console.error('❌ [AI Receptionist] Responsive layout error:', err);
      }
    }

    window.addEventListener('resize', handleResponsiveLayout);

    // Assemble node tree
    content.appendChild(frame);
    chatWindow.appendChild(header);
    chatWindow.appendChild(content);
    root.appendChild(chatWindow);
    root.appendChild(fab);

    // Mount to body
    document.body.appendChild(root);

    // Initial layout pass
    handleResponsiveLayout();

    state.mounted = true;
    console.log('🚀 B2B AI Receptionist Live Engine Initialized Successfully.');
  }

  /**
   * Safe bootstrap:
   * - If body exists and DOM is ready => mount now
   * - Else wait for DOMContentLoaded
   * - Fallback polling for unusual embedding timing edge-cases
   */
  function bootstrap() {
    try {
      if (document.body && (document.readyState === 'interactive' || document.readyState === 'complete')) {
        mountWidget();
        return;
      }

      document.addEventListener('DOMContentLoaded', function onReady() {
        document.removeEventListener('DOMContentLoaded', onReady);
        mountWidget();
      });

      // Extra safety fallback in case DOMContentLoaded already fired before listener
      var retries = 0;
      var maxRetries = 200; // ~10s at 50ms interval
      var interval = window.setInterval(function () {
        retries += 1;
        if (document.body && !state.mounted) {
          mountWidget();
          window.clearInterval(interval);
          return;
        }
        if (retries >= maxRetries) {
          window.clearInterval(interval);
          if (!state.mounted) {
            console.error('❌ [AI Receptionist] Failed to mount: body not available after timeout.');
          }
        }
      }, 50);
    } catch (err) {
      console.error('❌ [AI Receptionist] Bootstrap initialization error:', err);
    }
  }

  bootstrap();
})();
