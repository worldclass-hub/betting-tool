// ============================================================
// JAZZMIN CUSTOM JAVASCRIPT - COMPLETE REDESIGN
// ============================================================

// ============================================================
// 1. REMOVE LOGO TEXT
// ============================================================
(function() {
    function removeAllTextFromLoginLogo() {
        const loginLogo = document.querySelector('.login-logo');
        if (!loginLogo) return;
        
        const img = loginLogo.querySelector('img');
        loginLogo.innerHTML = '';
        if (img) {
            loginLogo.appendChild(img);
            img.style.display = 'block';
            img.style.margin = '0 auto';
            img.style.maxWidth = '120px';
            img.style.width = '120px';
            img.style.height = 'auto';
        }
    }
    
    removeAllTextFromLoginLogo();
    document.addEventListener('DOMContentLoaded', removeAllTextFromLoginLogo);
    setTimeout(removeAllTextFromLoginLogo, 100);
    setTimeout(removeAllTextFromLoginLogo, 300);
})();

// ============================================================
// 2. PREVENT SCROLLING ON LOGIN
// ============================================================
document.addEventListener("DOMContentLoaded", function () {
    const loginContainer = document.querySelector(".login-box");
    if (loginContainer) {
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        
        const metaViewport = document.querySelector('meta[name="viewport"]');
        if (metaViewport) {
            metaViewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
        }
    }
});

// ============================================================
// 3. POSITION ELEMENTS - MOVED UP
// ============================================================
function positionElements() {
    console.log('Positioning elements up...');
    
    // Move the login box up
    const loginBox = document.querySelector('.login-box');
    if (loginBox) {
        loginBox.style.paddingTop = '60px';
        loginBox.style.paddingBottom = '40px';
        loginBox.style.display = 'flex';
        loginBox.style.flexDirection = 'column';
        loginBox.style.alignItems = 'center';
        loginBox.style.justifyContent = 'flex-start';
        loginBox.style.minHeight = '100vh';
    }
    
    // Position the logo
    const logo = document.querySelector('.login-logo img');
    if (logo) {
        logo.style.marginBottom = '30px';
        logo.style.display = 'block';
        logo.style.marginLeft = 'auto';
        logo.style.marginRight = 'auto';
        logo.style.maxWidth = '120px';
        logo.style.width = '120px';
        logo.style.height = 'auto';
    }
    
    // Position the card
    const card = document.querySelector('.login-box .card');
    if (card) {
        card.style.marginTop = '20px';
        card.style.marginBottom = '20px';
    }
    
    console.log('Elements positioned up!');
}

// ============================================================
// 4. COMPLETE REDESIGN OF LOGIN FORM
// ============================================================
function redesignLoginForm() {
    console.log('Redesigning login form...');
    
    // First position elements
    positionElements();
    
    // Get the card body
    const cardBody = document.querySelector('.login-box .card .card-body');
    if (!cardBody) {
        console.log('Card body not found');
        return;
    }
    
    // Find the form
    const form = cardBody.querySelector('form');
    if (!form) {
        console.log('Form not found');
        return;
    }
    
    // Get existing form elements
    const usernameField = form.querySelector('input[name="username"]');
    const passwordField = form.querySelector('input[name="password"]');
    const loginButton = form.querySelector('button[type="submit"]');
    const csrfToken = form.querySelector('input[name="csrfmiddlewaretoken"]');
    
    if (!usernameField || !passwordField) {
        console.log('Username or password field not found');
        return;
    }
    
    // Get the username label
    const usernameLabel = form.querySelector('label[for="id_username"]');
    const passwordLabel = form.querySelector('label[for="id_password"]');
    
    // Store the original values
    const usernameValue = usernameField.value;
    const usernamePlaceholder = usernameField.placeholder || 'Enter your username';
    const passwordPlaceholder = passwordField.placeholder || 'Enter your password';
    const usernameLabelText = usernameLabel ? usernameLabel.textContent : 'Username';
    const passwordLabelText = passwordLabel ? passwordLabel.textContent : 'Password';
    
    // Create new form structure
    const newFormHTML = `
        <!-- CSRF Token -->
        ${csrfToken ? csrfToken.outerHTML : ''}
        
        <!-- Username Field -->
        <div class="custom-form-group">
            <label class="custom-label" for="id_username">${usernameLabelText}</label>
            <div class="custom-input-wrapper">
                <input type="text" name="username" id="id_username" 
                       class="custom-input" 
                       placeholder="${usernamePlaceholder}"
                       value="${usernameValue}"
                       autofocus>
            </div>
        </div>
        
        <!-- Password Field -->
        <div class="custom-form-group custom-password-group">
            <label class="custom-label" for="id_password">${passwordLabelText}</label>
            <div class="custom-input-wrapper">
                <input type="password" name="password" id="id_password" 
                       class="custom-input custom-password-input" 
                       placeholder="${passwordPlaceholder}">
                <button type="button" class="custom-password-toggle" id="customPasswordToggle">
                    <i class="fas fa-eye"></i>
                </button>
            </div>
        </div>
        
        <!-- Login Button -->
        <button type="submit" class="custom-login-btn">
            ${loginButton ? loginButton.textContent : 'Log in'}
        </button>
        
        <!-- Links Section -->
        <div class="custom-links">
            <a href="/admin/password_reset/">Forgot password?</a>
        </div>
    `;
    
    // Replace the entire form content
    form.innerHTML = newFormHTML;
    
    // Now add event listeners for the password toggle
    const toggleBtn = document.getElementById('customPasswordToggle');
    const passwordInput = document.getElementById('id_password');
    
    if (toggleBtn && passwordInput) {
        toggleBtn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.className = 'fas fa-eye-slash';
            } else {
                passwordInput.type = 'password';
                icon.className = 'fas fa-eye';
            }
        });
    }
    
    // Add styles for the new form
    injectRedesignStyles();
    
    console.log('Login form redesigned!');
}

// ============================================================
// 5. INJECT REDESIGN STYLES
// ============================================================
function injectRedesignStyles() {
    console.log('Injecting redesign styles...');
    
    const styleTag = document.createElement('style');
    styleTag.id = 'redesign-styles';
    styleTag.innerHTML = `
        /* ============================================================
           CUSTOM LOGIN FORM - COMPLETE REDESIGN
           ============================================================ */
        
        /* Logo size override */
        .login-logo img {
            max-width: 120px !important;
            width: 120px !important;
            height: auto !important;
        }
        
        /* Form container */
        .login-box .card .card-body form {
            width: 100% !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
        }
        
        /* Custom form group */
        .custom-form-group {
            width: 100% !important;
            margin-bottom: 28px !important;
            display: flex !important;
            flex-direction: column !important;
        }
        
        .custom-form-group:last-of-type {
            margin-bottom: 32px !important;
        }
        
        /* Custom label */
        .custom-label {
            color: #1a1a1a !important;
            font-weight: 600 !important;
            font-size: 14px !important;
            margin-bottom: 8px !important;
            display: block !important;
            letter-spacing: 0.3px !important;
        }
        
        /* Custom input wrapper */
        .custom-input-wrapper {
            position: relative !important;
            width: 100% !important;
        }
        
        /* Custom input */
        .custom-input {
            width: 100% !important;
            height: 48px !important;
            padding: 12px 16px !important;
            font-size: 15px !important;
            color: #1a1a1a !important;
            background-color: #ffffff !important;
            border: 2px solid #e5e7eb !important;
            border-radius: 8px !important;
            outline: none !important;
            box-sizing: border-box !important;
            transition: all 0.3s ease !important;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
        }
        
        .custom-input:focus {
            border-color: #0f766e !important;
            box-shadow: 0 0 0 4px rgba(15, 118, 110, 0.15) !important;
            background-color: #ffffff !important;
        }
        
        .custom-input::placeholder {
            color: #9ca3af !important;
            font-weight: 400 !important;
        }
        
        /* Password input - extra padding for toggle */
        .custom-password-input {
            padding-right: 50px !important;
        }
        
        /* Custom password toggle */
        .custom-password-toggle {
            position: absolute !important;
            right: 12px !important;
            top: 50% !important;
            transform: translateY(-50%) !important;
            background: transparent !important;
            border: none !important;
            color: #6b7280 !important;
            cursor: pointer !important;
            padding: 6px !important;
            font-size: 18px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            transition: all 0.2s ease !important;
            border-radius: 50% !important;
            width: 32px !important;
            height: 32px !important;
        }
        
        .custom-password-toggle:hover {
            color: #0f766e !important;
            background-color: rgba(15, 118, 110, 0.1) !important;
        }
        
        .custom-password-toggle i {
            pointer-events: none !important;
            font-size: 18px !important;
        }
        
        /* Custom login button */
        .custom-login-btn {
            width: 100% !important;
            height: 50px !important;
            padding: 12px 20px !important;
            font-size: 16px !important;
            font-weight: 600 !important;
            color: #ffffff !important;
            background-color: #0f766e !important;
            border: none !important;
            border-radius: 8px !important;
            cursor: pointer !important;
            transition: all 0.3s ease !important;
            margin-top: 5px !important;
            margin-bottom: 20px !important;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
            letter-spacing: 0.5px !important;
        }
        
        .custom-login-btn:hover {
            background-color: #064e3b !important;
            transform: translateY(-1px) !important;
            box-shadow: 0 4px 12px rgba(15, 118, 110, 0.3) !important;
        }
        
        .custom-login-btn:active {
            transform: translateY(0) !important;
        }
        
        /* Custom links */
        .custom-links {
            width: 100% !important;
            text-align: center !important;
            padding-top: 8px !important;
        }
        
        .custom-links a {
            color: #0f766e !important;
            font-weight: 500 !important;
            font-size: 14px !important;
            text-decoration: none !important;
            transition: color 0.3s ease !important;
        }
        
        .custom-links a:hover {
            color: #064e3b !important;
            text-decoration: underline !important;
        }
        
        /* Hide Jazzmin's original elements */
        .login-box .card .form-group {
            display: none !important;
        }
        
        .login-box .card .btn-primary {
            display: none !important;
        }
        
        .login-box .card .text-center {
            display: none !important;
        }
        
        /* Mobile responsiveness */
        @media (max-width: 768px) {
            .login-logo img {
                max-width: 100px !important;
                width: 100px !important;
            }
            
            .custom-input {
                height: 44px !important;
                padding: 10px 14px !important;
                font-size: 14px !important;
            }
            
            .custom-login-btn {
                height: 44px !important;
                font-size: 15px !important;
                padding: 10px 16px !important;
            }
            
            .custom-form-group {
                margin-bottom: 24px !important;
            }
            
            .custom-form-group:last-of-type {
                margin-bottom: 28px !important;
            }
        }
        
        @media (max-width: 480px) {
            .login-logo img {
                max-width: 80px !important;
                width: 80px !important;
            }
            
            .login-box .card .card-body {
                padding: 25px 18px 20px 18px !important;
            }
            
            .custom-input {
                height: 40px !important;
                padding: 8px 12px !important;
                font-size: 13px !important;
                border-radius: 6px !important;
            }
            
            .custom-login-btn {
                height: 40px !important;
                font-size: 14px !important;
                padding: 8px 12px !important;
                border-radius: 6px !important;
            }
            
            .custom-label {
                font-size: 13px !important;
                margin-bottom: 6px !important;
            }
            
            .custom-form-group {
                margin-bottom: 20px !important;
            }
            
            .custom-form-group:last-of-type {
                margin-bottom: 24px !important;
            }
            
            .custom-password-toggle {
                right: 10px !important;
                font-size: 16px !important;
                width: 28px !important;
                height: 28px !important;
            }
            
            .custom-password-input {
                padding-right: 44px !important;
            }
            
            .custom-links a {
                font-size: 13px !important;
            }
        }
    `;
    
    // Remove existing style tag if any
    const existingTag = document.getElementById('redesign-styles');
    if (existingTag) {
        existingTag.remove();
    }
    
    document.head.appendChild(styleTag);
    console.log('Redesign styles injected!');
}

// ============================================================
// 6. RUN THE REDESIGN
// ============================================================

// Run when DOM is ready
document.addEventListener("DOMContentLoaded", function() {
    setTimeout(redesignLoginForm, 300);
    setTimeout(redesignLoginForm, 600);
    setTimeout(redesignLoginForm, 1000);
    setTimeout(redesignLoginForm, 1500);
});

// Run on load
window.addEventListener('load', function() {
    setTimeout(redesignLoginForm, 500);
    setTimeout(redesignLoginForm, 1000);
    setTimeout(redesignLoginForm, 1500);
});

// ============================================================
// 7. MUTATION OBSERVER - WATCH FOR CHANGES
// ============================================================
(function() {
    let observerStarted = false;
    
    function startObserver() {
        if (observerStarted) return;
        observerStarted = true;
        
        const loginBox = document.querySelector('.login-box');
        if (!loginBox) return;
        
        const observer = new MutationObserver(function(mutations) {
            let shouldRedesign = false;
            
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === 1) {
                            if (node.querySelector && node.querySelector('form')) {
                                shouldRedesign = true;
                            }
                            if (node.tagName === 'FORM') {
                                shouldRedesign = true;
                            }
                        }
                    });
                }
            });
            
            if (shouldRedesign) {
                console.log('Form changes detected, reapplying redesign...');
                setTimeout(redesignLoginForm, 100);
                setTimeout(redesignLoginForm, 300);
                setTimeout(redesignLoginForm, 600);
            }
        });
        
        observer.observe(loginBox, {
            childList: true,
            subtree: true
        });
        
        console.log('Observer started!');
    }
    
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(startObserver, 500);
    });
    
    window.addEventListener('load', function() {
        setTimeout(startObserver, 1000);
    });
})();

// ============================================================
// 8. FINAL CLEANUP
// ============================================================
setTimeout(function() {
    console.log('Final redesign run...');
    redesignLoginForm();
}, 5000);

setTimeout(function() {
    console.log('Ultimate redesign run...');
    redesignLoginForm();
}, 8000);

setTimeout(function() {
    console.log('Super ultimate redesign run...');
    redesignLoginForm();
}, 10000);

// ============================================================
// 9. FLOATING HOME BUTTON
// ============================================================
document.addEventListener("DOMContentLoaded", function () {
    const loginContainer = document.querySelector(".login-box");
    if (!loginContainer) {
        const homeButton = document.createElement("a");
        homeButton.href = "/";
        homeButton.className = "floating-home-btn";
        homeButton.title = "Go to Home";
        homeButton.innerHTML = `<i class="fas fa-home"></i>`;
        document.body.appendChild(homeButton);
    }
});

// ============================================================
// END
// ============================================================