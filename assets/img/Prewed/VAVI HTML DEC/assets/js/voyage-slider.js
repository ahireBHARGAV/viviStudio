// Voyage Slider Logic

(function() {
    // -------------------------------------------------
    // ------------------ Utilities --------------------
    // -------------------------------------------------

    // Math utilities
    const wrap = (n, max) => (n + max) % max;
    const lerp = (a, b, t) => a + (b - a) * t;

    // DOM utilities
    const isHTMLElement = (el) => el instanceof HTMLElement;

    const genId = (() => {
        let count = 0;
        return () => {
            return (count++).toString();
        };
    })();

    class Raf {
        constructor() {
            this.rafId = 0;
            this.raf = this.raf.bind(this);
            this.callbacks = [];

            this.start();
        }

        start() {
            this.raf();
        }

        stop() {
            cancelAnimationFrame(this.rafId);
        }

        raf() {
            this.callbacks.forEach(({ callback, id }) => callback({ id }));
            this.rafId = requestAnimationFrame(this.raf);
        }

        add(callback, id) {
            this.callbacks.push({ callback, id: id || genId() });
        }

        remove(id) {
            this.callbacks = this.callbacks.filter((callback) => callback.id !== id);
        }
    }

    class Vec2 {
        constructor(x = 0, y = 0) {
            this.x = x;
            this.y = y;
        }

        set(x, y) {
            this.x = x;
            this.y = y;
        }

        lerp(v, t) {
            this.x = lerp(this.x, v.x, t);
            this.y = lerp(this.y, v.y, t);
        }
    }

    const vec2 = (x = 0, y = 0) => new Vec2(x, y);

    function tilt(node, options) {
        let { trigger, target } = resolveOptions(node, options);

        let lerpAmount = 0.06;

        const rotDeg = { current: vec2(), target: vec2() };
        const bgPos = { current: vec2(), target: vec2() };

        const update = (newOptions) => {
            destroy();
            ({ trigger, target } = resolveOptions(node, newOptions));
            init();
        };

        let rafId;

        function ticker({ id }) {
            rafId = id;

            rotDeg.current.lerp(rotDeg.target, lerpAmount);
            bgPos.current.lerp(bgPos.target, lerpAmount);

            for (const el of target) {
                el.style.setProperty("--rotX", rotDeg.current.y.toFixed(2) + "deg");
                el.style.setProperty("--rotY", rotDeg.current.x.toFixed(2) + "deg");

                el.style.setProperty("--bgPosX", bgPos.current.x.toFixed(2) + "%");
                el.style.setProperty("--bgPosY", bgPos.current.y.toFixed(2) + "%");
            }
        }

        const onMouseMove = ({ offsetX, offsetY }) => {
            lerpAmount = 0.1;

            for (const el of target) {
                const ox = (offsetX - el.clientWidth * 0.5) / (Math.PI * 3);
                const oy = -(offsetY - el.clientHeight * 0.5) / (Math.PI * 4);

                rotDeg.target.set(ox, oy);
                bgPos.target.set(-ox * 0.3, oy * 0.3);
            }
        };

        const onMouseLeave = () => {
            lerpAmount = 0.06;

            rotDeg.target.set(0, 0);
            bgPos.target.set(0, 0);
        };

        const addListeners = () => {
            trigger.addEventListener("mousemove", onMouseMove);
            trigger.addEventListener("mouseleave", onMouseLeave);
        };

        const removeListeners = () => {
            trigger.removeEventListener("mousemove", onMouseMove);
            trigger.removeEventListener("mouseleave", onMouseLeave);
        };

        const init = () => {
            addListeners();
            raf.add(ticker);
        };

        const destroy = () => {
            removeListeners();
            raf.remove(rafId);
        };

        init();

        return { destroy, update };
    }

    function resolveOptions(node, options) {
        return {
            trigger: options?.trigger ?? node,
            target: options?.target
                ? Array.isArray(options.target)
                    ? options.target
                    : [options.target]
                : [node]
        };
    }

    // -----------------------------------------------------

    // Global Raf Instance
    const raf = new Raf();

    function initSlider() {

        const sliderSection = document.querySelector(".voyage-slider-section");
        
        if(!sliderSection) return;

        const slides = [...document.querySelectorAll(".slide")];
        const slidesInfo = [...document.querySelectorAll(".slide-info")];

        const buttons = {
            prev: document.querySelector(".slider--btn__prev"),
            next: document.querySelector(".slider--btn__next")
        };


        // Initialize state for slides (current, next, previous)
        if(slides.length > 0) {
            // Ensure first 3 have states if not set in HTML
             // Logic in HTML should ideally set data-current, data-next, data-previous
             // But let's assume valid HTML structure
        }

        slides.forEach((slide, i) => {
            const slideInner = slide.querySelector(".slide__inner");
            const slideInfoInner = slidesInfo[i].querySelector(".slide-info__inner");

            tilt(slide, { target: [slideInner, slideInfoInner] });
        });

        if(buttons.prev) buttons.prev.addEventListener("click", change(-1));
        if(buttons.next) buttons.next.addEventListener("click", change(1));
    }


    function change(direction) {
        return () => {
            const allSlides = [...document.querySelectorAll(".slide")];
            const allInfos = [...document.querySelectorAll(".slide-info")];
            const allBgs = [...document.querySelectorAll(".slide__bg")];
            
            // Find current index based on attribute, default to 0 if not found for safety
            let currentIndex = allSlides.findIndex(el => el.hasAttribute("data-current"));
            if (currentIndex === -1) currentIndex = 0; // Fallback

            let newCurrentIndex = wrap(currentIndex + direction, allSlides.length);
            let newNextIndex = wrap(newCurrentIndex + 1, allSlides.length);
            let newPrevIndex = wrap(newCurrentIndex - 1 + allSlides.length, allSlides.length);
            let newNext2Index = wrap(newCurrentIndex + 2, allSlides.length);
            let newPrev2Index = wrap(newCurrentIndex - 2 + allSlides.length, allSlides.length);

            // Clean Attributes for ALL
             allSlides.forEach(el => {
                 el.removeAttribute("data-current");
                 el.removeAttribute("data-next");
                 el.removeAttribute("data-previous");
                 el.removeAttribute("data-next-2");
                 el.removeAttribute("data-previous-2");
                 el.style.zIndex = "0"; // Reset z-index
             });
             allInfos.forEach(el => {
                 el.removeAttribute("data-current");
                 el.removeAttribute("data-next");
                 el.removeAttribute("data-previous");
                 el.removeAttribute("data-next-2");
                 el.removeAttribute("data-previous-2");
             });
             allBgs.forEach(el => {
                 el.removeAttribute("data-current");
                 el.removeAttribute("data-next");
                 el.removeAttribute("data-previous");
                 el.removeAttribute("data-next-2");
                 el.removeAttribute("data-previous-2");
             });

            // Set new Attributes
            allSlides[newCurrentIndex].setAttribute("data-current", "");
            allInfos[newCurrentIndex].setAttribute("data-current", "");
            allBgs[newCurrentIndex].setAttribute("data-current", "");
            
            allSlides[newNextIndex].setAttribute("data-next", "");
            allInfos[newNextIndex].setAttribute("data-next", "");
            allBgs[newNextIndex].setAttribute("data-next", "");

            allSlides[newPrevIndex].setAttribute("data-previous", "");
            allInfos[newPrevIndex].setAttribute("data-previous", "");
            allBgs[newPrevIndex].setAttribute("data-previous", "");
            
            allSlides[newNext2Index].setAttribute("data-next-2", "");
            allInfos[newNext2Index].setAttribute("data-next-2", "");
            allBgs[newNext2Index].setAttribute("data-next-2", "");

            allSlides[newPrev2Index].setAttribute("data-previous-2", "");
            allInfos[newPrev2Index].setAttribute("data-previous-2", "");
            allBgs[newPrev2Index].setAttribute("data-previous-2", "");
            
             // Z-Index Management for transition
            allSlides[newCurrentIndex].style.zIndex = "30";
            if (direction === 1) { // Next
                allSlides[newPrevIndex].style.zIndex = "20"; // Old Current becomes Prev
                allSlides[newNextIndex].style.zIndex = "20";
                
                allSlides[newPrev2Index].style.zIndex = "10";
                allSlides[newNext2Index].style.zIndex = "10";
            } else { // Prev
                allSlides[newNextIndex].style.zIndex = "20"; // Old Current becomes Next
                allSlides[newPrevIndex].style.zIndex = "20";
                
                allSlides[newNext2Index].style.zIndex = "10";
                allSlides[newPrev2Index].style.zIndex = "10";
            }
        };
    }

    // Start
    document.addEventListener("DOMContentLoaded", initSlider);

})();
