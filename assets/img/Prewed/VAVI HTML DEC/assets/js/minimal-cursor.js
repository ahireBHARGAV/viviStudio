/* Custom Image Cursor Logic */

document.addEventListener('DOMContentLoaded', () => {
    // Check if device has touch capability (optional disable for mobile)
    if (window.matchMedia("(pointer: coarse)").matches) {
        return; // Don't run on touch devices
    }

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    
    // Create inner elements for smooth cross-fade
    const cursorWhite = document.createElement('div');
    cursorWhite.className = 'cursor-icon white'; // Default
    const cursorBlack = document.createElement('div');
    cursorBlack.className = 'cursor-icon black'; // Light theme
    
    cursor.appendChild(cursorWhite);
    cursor.appendChild(cursorBlack);
    document.body.appendChild(cursor);

    // Track visibility state
    let isVisible = false;

    // Movement Logic - Instant (1:1 feel)
    document.addEventListener('mousemove', (e) => {
        // Show cursor if it was hidden
        if (!isVisible) {
            cursor.style.opacity = '1';
            isVisible = true;
        }

        // Direct position update - No Lerp/Lag
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        
        // Instant check for light/dark theme under cursor
        checkTheme(e.target);
    });

    // Visibility Logic - Hide when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        isVisible = false;
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        isVisible = true;
    });

    // Theme Detection
    function checkTheme(target) {
        let current = target;
        let isLight = false;
        
        while (current && current !== document.body) {
            // Explicit override class
            if (current.classList && current.classList.contains('light-cursor-area')) {
                isLight = true;
                break;
            }

            // General white/input checks
            if (current.classList && (current.classList.contains('white-bg') || current.classList.contains('bg-white'))) {
                 isLight = true;
                 break;
            }
            
            if (current.tagName === 'INPUT' || current.tagName === 'TEXTAREA') {
                isLight = true;
                break;
            }

            // Strict background color check
            // Only honor explicit white backgrounds on block-level elements or documented containers
            // IGNORE if it's just a text element (span, a, p, h1-h6) unless it explicitly has the white-bg class
            // This prevents "switching on text" if the text element itself doesn't have a background set but sits on one.
            // Actually, if it sits on one (parent), strict checking up the DOM will find the parent.
            // Problem: maybe some text elements have 'background: white' computed from brower defaults? Unlikely.
            // Maybe user means "don't switch if hovering over text inside a dark section".
            // That should already be handled as parent loop won't find white.
            // But if user means "don't switch if hovering over text inside a light section" -> then cursor stays white on light bg? No.
            
            // Re-reading user: "its still switching to blaa=ck when it gose on texts"
            // Maybe they mean on DARK backgrounds?
            // If so, maybe some text elements trigger the `style.backgroundColor === 'white'` check? 
            // Unlikely for transparent text.
            // Let's safe-guard against random elements having 'style="background: white"' unless they are containers (div, section).
            
            if (current.style && (current.style.backgroundColor === 'white' || current.style.backgroundColor === '#fff' || current.style.backgroundColor === '#ffffff')) {
                // Only honor if it's a container or explicit block
                 if (!['SPAN', 'A', 'STRONG', 'B', 'I', 'EM', 'P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'LABEL'].includes(current.tagName)) {
                     isLight = true;
                     break;
                 }
                 // If it is text, we check if it REALLY has a background (rare for inline text to have white background in this design?)
                 // Let's assume text should inherit.
            }
            
            current = current.parentElement;
        }

        if (isLight) {
            cursor.classList.add('light-theme');
        } else {
            cursor.classList.remove('light-theme');
        }
    }

    // Hover interactions for rotation
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .entry, .hover-target');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.remove('hover-active'); // Reset to re-trigger
            void cursor.offsetWidth; // Trigger reflow
            cursor.classList.add('hover-active');
        });
        el.addEventListener('mouseleave', () => {
             cursor.classList.remove('hover-active');
        });
    });
    
    // Global mouseover to catch dynamic elements
    document.addEventListener('mouseover', (e) => {
        if (e.target.matches('a, button, input, textarea, .entry, .hover-target') || e.target.closest('a, button')) {
             if (!cursor.classList.contains('hover-active')) {
                 cursor.classList.add('hover-active');
             }
        }
    });

    // Global mouseout to catch dynamic elements leaving
    document.addEventListener('mouseout', (e) => {
        if (e.target.matches('a, button, input, textarea, .entry, .hover-target') || e.target.closest('a, button')) {
             cursor.classList.remove('hover-active');
        }
    });

});
