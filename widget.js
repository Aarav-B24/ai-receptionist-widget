// B2B AI Receptionist Embedded Integration Engine
(function() {
    console.log("AI Receptionist Widget initialized successfully.");
    
    // 1. Create the UI Chat Container dynamically
    const chatContainer = document.createElement('div');
    chatContainer.id = 'ai-receptionist-bubble';
    
    // Apply styling layouts directly to the element container properties
    chatContainer.style.position = 'fixed';
    chatContainer.style.bottom = '20px';
    chatContainer.style.right = '20px';
    chatContainer.style.width = '70px';
    chatContainer.style.height = '70px';
    chatContainer.style.backgroundColor = '#4F46E5'; // Premium Indigo highlight
    chatContainer.style.borderRadius = '50%';
    chatContainer.style.cursor = 'pointer';
    chatContainer.style.boxShadow = '0px 4px 20px rgba(0,0,0,0.5)';
    chatContainer.style.display = 'flex';
    chatContainer.style.alignItems = 'center';
    chatContainer.style.justifyContent = 'center';
    chatContainer.style.zIndex = '999999';
    chatContainer.style.fontSize = '14px';
    chatContainer.style.fontWeight = 'bold';
    chatContainer.style.color = '#FFFFFF';
    chatContainer.innerHTML = 'CHAT'; 
    
    // 2. Click interaction logic to launch the AI receptionist
    chatContainer.onclick = function() {
        alert("Connecting to business calendar and AI knowledge base...");
    };

    // 3. Inject the compiled widget directly into the client website DOM body
    document.body.appendChild(chatContainer);
})();
