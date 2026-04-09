
window.addEventListener("load", function () {
    // Config
    var color1 = '#fff';

    // No moveBar needed with Flexbox flow!

    var timeline = gsap.timeline({ delay: 0.2 });

    timeline
        .set('.txt1', { color: color1, fontWeight: 'normal', width: 0 }) // Ensure start width 0
        .set('.bar', { backgroundColor: color1 })

        .to('.bar', { duration: 0.1, opacity: 0, ease: "expo.in", yoyo: true, repeat: 5, repeatDelay: 0.3 }, 0)
        .to('.txt1', { duration: 1.5, width: "auto", ease: "steps(18)" }, 2.5) // Animate to auto width
        .to('.bar', { duration: 0.5, opacity: 0 }, '+=0.5')
        .to('.txt1', { duration: 1.5, opacity: 0.25, ease: "power3.inOut" }, '+=0.1')
        .to('#intro-wrapper', {
            duration: 1, opacity: 0, ease: "power2.inOut", onComplete: function () {
                document.querySelector('#intro-wrapper').style.display = 'none';
                document.querySelector('#new-intro-container').style.display = 'none';
            }
        })
        .timeScale(1.45);

});
