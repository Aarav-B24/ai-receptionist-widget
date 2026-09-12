// B2B AI Receptionist Embedded Integration Engine
(function() {
    // 1. Create the UI Chat Container dynamically
    const chatContainer = document.createElement('div');
    chatContainer.id = 'ai-receptionist-bubble';
    chatContainer.style.position = 'fixed';
    chatContainer.style.bottom = '20px';
    chatContainer.style.right = '20px';
    chatContainer.style.width = '60px';
    chatContainer.style.height = '60px';
    chatContainer.style.backgroundColor = '#1A1A1A';
    chatContainer.style.borderRadius = '50%';
    chatContainer.style.cursor = 'pointer';
    chatContainer.style.boxShadow = '0px 4px 12px rgba(0,0,0,0.3)';
    chatContainer.style.display = 'flex';
    chatContainer.style.alignItems = 'center';
    chatContainer.style.justifyContent = 'center';
    chatContainer.style.zIndex = '999999';
    chatContainer.style.fontSize = '30px';
 chatContainer.innerHTML = 'CHAT';
    
    // 2. Click interaction logic to launch the AI receptionist
    chatContainer.onclick = function() {
        alert("Connecting to business calendar and AI knowledge base...");
        // This is where your custom AI interface URL injects natively
    };

    // 3. Inject the compiled widget directly into the client website
    document.body.appendChild(chatContainer);
})();
