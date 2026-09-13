(function () {
  'use strict';

  /**
   * ============================================================
   *  B2B AI Receptionist Widget (Self-Contained, No Dependencies)
   * ============================================================
   */

  console.log('🧩 [AI Receptionist] Script loaded. Waiting for safe DOM mount...');

  var CONFIG = {
    // FIX: This is the correct, public URL format that streams your specific bot brain
iframeSrc: 'https://voiceflow.com',
    zIndex: 999999,
    fabSize: 65,
    chatWidth: 380,
    chatHeight: 550
  };

  var state = {
    mounted: false,
    isOpen: false
  };

  function applyStyles(el, styles) {
    for (var key in styles) {
      if (Object.prototype.hasOwnProperty.call(styles, key)) {
        el.style[key] = styles[key];
      }
    }
  }

  function mountWidget() {
    if (state.mounted) return;
    if (!document.body) return;

    var root = document.createElement('div');
    root.setAttribute('data-ai-receptionist-widget', 'true');
    
    root.style.all = 'initial';
    root.style.position = 'fixed';
    root.style.right = '24px';
    root.style.bottom = '24px';
    root.style.zIndex = String(CONFIG.zIndex);
    root.style.fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
    root.style.boxSizing = 'border-box';

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
      display: 'none',
      flexDirection: 'column',
      opacity: '0',
      transform: 'translateY(18px) scale(0.98)',
      transition: 'opacity 220ms ease-in-out, transform 220ms ease-in-out'
    });

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

    var content = document.createElement('div');
    applyStyles(content, {
      flex: '1',
      minHeight: '0',
      background: '#0E0F14'
    });

    var frame = document.createElement('iframe');
    frame.setAttribute('title', 'AI Receptionist Chat Interface');
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
      userSelect: 'none'
    });

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

    function openChat() {
      state.isOpen = true;
      chatWindow.style.display = 'flex';
      chatWindow.offsetHeight; // Force reflow
      chatWindow.style.opacity = '1';
      chatWindow.style.transform = 'translateY(0) scale(1)';
    }

    function closeChat() {
      state.isOpen = false;
      chatWindow.style.opacity = '0';
      chatWindow.style.transform = 'translateY(18px) scale(0.98)';
      window.setTimeout(function () {
        if (!state.isOpen) { chatWindow.style.display = 'none'; }
      }, 220);
    }

    fab.addEventListener('click', function () {
      if (state.isOpen) { closeChat(); } else { openChat(); }
    });

    function handleResponsiveLayout() {
      if (window.innerWidth <= 440) {
        chatWindow.style.width = 'calc(100vw - 20px)';
        chatWindow.style.height = 'min(550px, calc(100vh - 100px))';
      } else {
        chatWindow.style.width = CONFIG.chatWidth + 'px';
        chatWindow.style.height = CONFIG.chatHeight + 'px';
      }
    }

    window.addEventListener('resize', handleResponsiveLayout);
    handleResponsiveLayout();

    content.appendChild(frame);
    chatWindow.appendChild(header);
    chatWindow.appendChild(content);
    root.appendChild(chatWindow);
    root.appendChild(fab);
    document.body.appendChild(root);
    
    state.mounted = true;
    console.log('🚀 [AI Receptionist] Widget mounted successfully.');
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    mountWidget();
  } else {
    document.addEventListener('DOMContentLoaded', mountWidget);
  }
})();
