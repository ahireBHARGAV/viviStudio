document.addEventListener("DOMContentLoaded", function () {
    const overlay = document.getElementById('intro-overlay');
    if (!overlay) return;

    // Total animation time is roughly:
    // 1.5s delay + 0.8s animation = 2.3s.
    // We add a little buffer to ensure it's fully done before fading out the container.

    setTimeout(() => {
        // Fade out
        overlay.classList.add('fade-out');

        // Remove from DOM after fade out transition (0.5s)
        setTimeout(() => {
            overlay.style.display = 'none'; // Hard remove
            // optionally overlay.remove(); 
        }, 500);

    }, 2500); // 2.5 seconds
});
