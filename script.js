// The 'DOMContentLoaded' event is good practice, ensuring the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', () => {
    // --- STATE & CONFIG ---
    let currentLanguage = 'en';
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition;

    // --- DOM ELEMENT SELECTOR ---
    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => document.querySelectorAll(selector);

    // --- TRANSLATION DATA ---
    // The large translations object would go here...
    // (Omitted for brevity, but you would copy it from your original file)
    const translations = { /* ... your entire translations object ... */ };

    // --- INITIALIZATION ---
    const init = () => {
        const savedLang = localStorage.getItem('karigar-lang') || 'en';
        setLanguage(savedLang);
        setupEventListeners();
        if (SpeechRecognition) {
            setupVoiceRecognition();
        } else {
            $('#voice-assistant-btn').classList.add('hidden');
        }
        if (!$('#app-container').classList.contains('hidden')) {
            loadContentFromHash();
        }
        
        // Register the Service Worker for PWA functionality
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => console.log('ServiceWorker registration successful! Scope: ', registration.scope))
                    .catch(err => console.log('ServiceWorker registration failed: ', err));
            });
        }
    };

    // --- LANGUAGE & TRANSLATION ---
    const setLanguage = (lang) => { /* ... same as before ... */ };

    // --- LOGIN FLOW ---
    const showLoginStep = (step) => { /* ... same as before ... */ };
    const handleLogin = () => { /* ... same as before ... */ };
    const completeLogin = () => { /* ... same as before ... */ };

    // --- NAVIGATION & CONTENT LOADING (ENHANCED) ---
    const toggleSidebar = () => { /* ... same as before ... */ };

    const loadContentFromHash = () => {
        const page = window.location.hash.substring(1) || 'home';
        const contentArea = $('#content-area');
        
        // **ENHANCEMENT**: Show a loading spinner for better UX
        contentArea.innerHTML = '<div class="loader mx-auto mt-10"></div>';

        // Use a short delay to allow the browser to render the spinner
        setTimeout(() => {
            const contentTemplate = $(`#${page}-content`);
            
            // **ENHANCEMENT**: Clear content area and clone from template
            contentArea.innerHTML = '';
            
            if (contentTemplate) {
                const clonedContent = contentTemplate.content.cloneNode(true);
                contentArea.appendChild(clonedContent);
            } else {
                // Fallback to home if page not found
                const homeTemplate = $('#home-content').content.cloneNode(true);
                contentArea.appendChild(homeTemplate);
            }
            
            setLanguage(currentLanguage);
            addDynamicEventListeners();
            
            $$('.menu-link').forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${page}`));
            
            if (!$('#sidebar').classList.contains('sidebar-hidden')) {
                toggleSidebar();
            }
            window.scrollTo(0, 0);
        }, 150); // 150ms delay
    };
    
    // --- DYNAMIC CONTENT ---
    const updateBannerContent = () => { /* ... same as before ... */ };
    
    // --- VOICE ASSISTANT ---
    const setupVoiceRecognition = () => { /* ... same as before ... */ };
    const handleVoiceCommand = (command) => { /* ... same as before ... */ };

    // --- NOTIFICATIONS ---
    const showNotification = (titleKey, bodyKey) => { /* ... same as before ... */ };
    
    // --- EVENT LISTENERS (ENHANCED) ---
    const setupEventListeners = () => {
        // --- Static Listeners ---
        $('#close-login-overlay-btn').addEventListener('click', completeLogin);
        $('#phone-login-btn').addEventListener('click', handleLogin);
        
        // **ENHANCEMENT**: Phone number validation
        const phoneInput = $('#phone-number');
        const phoneLoginBtn = $('#phone-login-btn');
        phoneInput.addEventListener('input', () => {
            const isValid = /^\d{10}$/.test(phoneInput.value);
            phoneLoginBtn.disabled = !isValid;
            phoneLoginBtn.classList.toggle('opacity-50', !isValid);
            phoneLoginBtn.classList.toggle('cursor-not-allowed', !isValid);
        });

        $('#has-card-btn').addEventListener('click', () => showLoginStep('#login-step-3'));
        $('#no-card-btn').addEventListener('click', () => window.open('https://services.india.gov.in/service/detail/handloom-weaver-id-card-application-odisha', '_blank'));
        $('#verify-card-btn').addEventListener('click', completeLogin);
        
        // --- App Listeners ---
        $('#menu-btn').addEventListener('click', toggleSidebar);
        $('#sidebar-overlay').addEventListener('click', toggleSidebar);
        $('#language-toggle').addEventListener('change', (e) => setLanguage(e.target.checked ? 'or' : 'en'));
        $('#logout-link').addEventListener('click', () => location.reload());
        $('#close-notification').addEventListener('click', () => $('#notification-popup').classList.add('hidden'));
        window.addEventListener('hashchange', loadContentFromHash);
        
        // Voice Assistant
        $('#voice-assistant-btn').addEventListener('click', () => {
             if (recognition) {
                 $('#voice-assistant-btn').classList.add('voice-listening');
                 $('#voice-status').classList.remove('hidden');
                 recognition.lang = currentLanguage === 'or' ? 'or-IN' : 'en-US';
                 recognition.start();
             }
        });

        // Sidebar links
        $$('.menu-link').forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.getAttribute('href') !== '#logout') {
                    e.preventDefault();
                    window.location.hash = link.getAttribute('href');
                }
            });
        });
    };

    const addDynamicEventListeners = () => {
        // Event filters
        $$('.filter-button').forEach(button => { /* ... same as before ... */ });
        
        // Scholarship tabs
        const scholarshipTabs = $('#scholarship-tabs');
        if (scholarshipTabs) { /* ... same as before ... */ }
        
        // Update banner content
        if ($('#notification-banner-content')) {
            updateBannerContent();
        }
    };

    // --- START THE APP ---
    init();
});