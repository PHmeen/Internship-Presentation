// ==========================================================================
// ระบบควบคุมการนำเสนอ (Presentation Engine)
// Fully Responsive + Mobile Touch Support
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {

    // [1] รายการไฟล์สไลด์ทั้งหมด
    const slides = [
        "slides/01-cover.html",
        "slides/03-about-company.html",
        "slides/04-scope.html",
        "slides/05a-responsibilities-p1.html",
        "slides/05b-responsibilities-p2.html",
        "slides/05c-gallery.html",
        "slides/07-challenges.html",
        "slides/08-learnings.html",
        "slides/08b-tech-stack.html",
        "slides/09-suggestions.html",
        "slides/10-conclusion.html"
    ];

    // [2] ชื่อหัวข้อ
    const sectionTitles = [
        "หน้าแรก",
        "ข้อมูลเกี่ยวกับองค์กร",
        "ตำแหน่งและลักษณะงาน",
        "บทบาทและหน้าที่ (ระบบจองอาหาร)",
        "บทบาทและหน้าที่ (STSP Innomart)",
        "ภาพตัวอย่างระบบเพิ่มเติม",
        "ปัญหาและแนวทางการแก้ไข",
        "ทักษะและสิ่งที่ได้รับ",
        "เครื่องมือและเทคโนโลยี",
        "ภาพกิจกรรมระหว่างฝึกงาน",
        "บทสรุปและการถามตอบ"
    ];

    // [3] ตัวแปรสถานะ
    let currentSlide = 0;

    const slideWrapper = document.getElementById("slide-wrapper");
    const currentSlideNum = document.getElementById("current-slide-num");
    const totalSlidesNum = document.getElementById("total-slides-num");
    const currentSectionTitle = document.getElementById("current-section-title");
    const progressBar = document.getElementById("progress-bar");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const sidebarListItems = document.querySelectorAll("#sidebar-list li");

    // Mobile sidebar elements
    const appSidebar = document.getElementById("app-sidebar");
    const sidebarToggle = document.getElementById("sidebar-toggle");
    const sidebarOverlay = document.getElementById("sidebar-overlay");

    totalSlidesNum.textContent = String(slides.length).padStart(2, '0');

    // ==========================================================================
    // Mobile Sidebar Toggle
    // ==========================================================================
    function openSidebar() {
        appSidebar.classList.add("open");
        sidebarOverlay.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeSidebar() {
        appSidebar.classList.remove("open");
        sidebarOverlay.classList.remove("active");
        document.body.style.overflow = "";
    }

    if (sidebarToggle) {
        sidebarToggle.addEventListener("click", () => {
            if (appSidebar.classList.contains("open")) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener("click", closeSidebar);
    }

    // ==========================================================================
    // ฟังก์ชันโหลดสไลด์
    // ==========================================================================
    async function loadSlide(index) {
        if (index < 0 || index >= slides.length) return;

        // Play click sound effect
        playClickSound();

        // Reset any active tilted cards to base transforms before transition to avoid animation conflicts
        const tiltedCards = slideWrapper.querySelectorAll(".content-card, .challenge-card, .metric-card, .activity-card");
        tiltedCards.forEach(card => {
            card.style.transform = "";
        });

        prevBtn.disabled = true;
        nextBtn.disabled = true;

        const isInitialLoad = slideWrapper.innerHTML.trim() === "";

        if (isInitialLoad) {
            try {
                const response = await fetch(slides[index]);
                if (!response.ok) throw new Error(`ไม่สามารถโหลดสไลด์: ${slides[index]}`);
                const html = await response.text();

                slideWrapper.innerHTML = html;
                currentSlide = index;

                currentSlideNum.textContent = String(currentSlide + 1).padStart(2, '0');
                currentSectionTitle.textContent = sectionTitles[currentSlide];

                const progressPercentage = (currentSlide / (slides.length - 1)) * 100;
                progressBar.style.width = `${progressPercentage}%`;

                const slideToSidebarMap = {
                    0: 0, 1: 1, 2: 2, 3: 3, 4: 3, 5: 3, 6: 4, 7: 5, 8: 5, 9: 6, 10: 7
                };

                sidebarListItems.forEach((li) => li.classList.remove("active"));
                const sidebarIndex = slideToSidebarMap[currentSlide];
                if (sidebarListItems[sidebarIndex] !== undefined) {
                    sidebarListItems[sidebarIndex].classList.add("active");
                }

                window.location.hash = `/${currentSlide + 1}`;

                slideWrapper.classList.add("active");

                prevBtn.disabled = false;
                nextBtn.disabled = false;
            } catch (error) {
                console.error(error);
                slideWrapper.innerHTML = `<div class="content-card"><h3>เกิดข้อผิดพลาดในการโหลด</h3><p>${error.message}</p></div>`;
                slideWrapper.classList.add("active");
                prevBtn.disabled = false;
                nextBtn.disabled = false;
            }
        } else {
            slideWrapper.classList.remove("active");

            setTimeout(async () => {
                try {
                    const response = await fetch(slides[index]);
                    if (!response.ok) throw new Error(`ไม่สามารถโหลดสไลด์: ${slides[index]}`);
                    const html = await response.text();

                    slideWrapper.innerHTML = html;
                    currentSlide = index;

                    currentSlideNum.textContent = String(currentSlide + 1).padStart(2, '0');
                    currentSectionTitle.textContent = sectionTitles[currentSlide];

                    const progressPercentage = (currentSlide / (slides.length - 1)) * 100;
                    progressBar.style.width = `${progressPercentage}%`;

                    const slideToSidebarMap = {
                        0: 0, 1: 1, 2: 2, 3: 3, 4: 3, 5: 3, 6: 4, 7: 5, 8: 5, 9: 6, 10: 7
                    };

                    sidebarListItems.forEach((li) => li.classList.remove("active"));
                    const sidebarIndex = slideToSidebarMap[currentSlide];
                    if (sidebarListItems[sidebarIndex] !== undefined) {
                        sidebarListItems[sidebarIndex].classList.add("active");
                    }

                    window.location.hash = `/${currentSlide + 1}`;

                    setTimeout(() => {
                        slideWrapper.classList.add("active");

                        // Trigger confetti if last slide is loaded
                        if (currentSlide === slides.length - 1) {
                            initConfetti();
                        } else {
                            stopConfetti();
                        }

                        prevBtn.disabled = false;
                        nextBtn.disabled = false;
                    }, 50);

                } catch (error) {
                    console.error(error);
                    slideWrapper.innerHTML = `<div class="content-card"><h3>เกิดข้อผิดพลาดในการโหลด</h3><p>${error.message}</p></div>`;
                    slideWrapper.classList.add("active");
                    prevBtn.disabled = false;
                    nextBtn.disabled = false;
                }
            }, 120);
        }
    }

    function nextSlide() {
        if (currentSlide < slides.length - 1) {
            loadSlide(currentSlide + 1);
            closeSidebar();
        }
    }

    function prevSlide() {
        if (currentSlide > 0) {
            loadSlide(currentSlide - 1);
            closeSidebar();
        }
    }

    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
            e.preventDefault();
            nextSlide();
        } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
            e.preventDefault();
            prevSlide();
        } else if (e.key === "Escape") {
            closeSidebar();
        }
    });

    // ==========================================================================
    // Touch Swipe Support (Mobile)
    // ==========================================================================
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    const minSwipeDistance = 50;

    const viewport = document.getElementById("presentation-container");
    if (viewport) {
        viewport.addEventListener("touchstart", (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });

        viewport.addEventListener("touchend", (e) => {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            handleSwipe();
        }, { passive: true });
    }

    function handleSwipe() {
        const dx = touchEndX - touchStartX;
        const dy = touchEndY - touchStartY;
        // Only trigger horizontal swipe if it's more horizontal than vertical
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > minSwipeDistance) {
            if (dx < 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }

    // ==========================================================================
    // Sidebar Navigation Clicks
    // ==========================================================================
    const sidebarToSlideMap = {
        0: 0,  // Cover
        1: 1,  // About Company
        2: 2,  // Scope
        3: 3,  // Responsibilities P1
        4: 6,  // Challenges
        5: 7,  // Learnings
        6: 9,  // Suggestions
        7: 10  // Conclusion
    };

    sidebarListItems.forEach((li) => {
        li.addEventListener("click", () => {
            const index = parseInt(li.getAttribute("data-index"), 10);
            const targetSlide = sidebarToSlideMap[index];
            if (targetSlide !== undefined && targetSlide !== currentSlide) {
                loadSlide(targetSlide);
            }
            closeSidebar();
        });
    });

    // Hash change navigation
    function handleHashChange() {
        const hash = window.location.hash;
        const match = hash.match(/^\#\/(\d+)$/);
        if (match) {
            const slideNum = parseInt(match[1], 10) - 1;
            if (slideNum >= 0 && slideNum < slides.length && slideNum !== currentSlide) {
                loadSlide(slideNum);
                return;
            }
        }
        loadSlide(currentSlide);
    }

    window.addEventListener("hashchange", handleHashChange);

    // ==========================================================================
    // Theme Color Picker
    // ==========================================================================
    const colorDots = document.querySelectorAll(".color-dot");
    colorDots.forEach((dot) => {
        dot.addEventListener("click", () => {
            colorDots.forEach((d) => d.classList.remove("active"));
            dot.classList.add("active");

            const hexColor = dot.getAttribute("data-color");
            document.documentElement.style.setProperty("--color-accent", hexColor);

            let r = parseInt(hexColor.slice(1, 3), 16);
            let g = parseInt(hexColor.slice(3, 5), 16);
            let b = parseInt(hexColor.slice(5, 7), 16);
            document.documentElement.style.setProperty("--color-accent-dim", `rgba(${r}, ${g}, ${b}, 0.12)`);
        });
    });

    // ==========================================================================
    // Terminal Simulation (Challenges Slide)
    // ==========================================================================
    function setupTerminalSimulation() {
        const runBtn = document.getElementById("run-audit-btn");
        const screen = document.getElementById("terminal-screen");

        if (!runBtn || !screen) return;

        runBtn.addEventListener("click", () => {
            runBtn.disabled = true;
            runBtn.style.opacity = "0.5";

            screen.innerHTML = `<div class="terminal-line command">$ sqlite3 innomart.db</div>`;

            const steps = [
                { text: "sqlite> SELECT name, price, stock FROM products LIMIT 2;", delay: 600, class: "command" },
                { text: "1|STSP Honey|150.00|42", delay: 1200, class: "" },
                { text: "2|Rice Milk Soap|80.00|15", delay: 1600, class: "" },
                { text: "sqlite> SELECT * FROM bookings ORDER BY date DESC LIMIT 1;", delay: 2400, class: "command" },
                { text: "104|Science Hall|Coffee Break|2026-06-10|Confirmed", delay: 3000, class: "success" },
                { text: "sqlite> UPDATE products SET stock = 45 WHERE id = 1;", delay: 3600, class: "command" },
                { text: "Query OK, 1 row affected (0.02 sec)", delay: 4200, class: "success" }
            ];

            steps.forEach((step) => {
                setTimeout(() => {
                    const line = document.createElement("div");
                    line.className = `terminal-line ${step.class}`;
                    line.textContent = step.text;
                    screen.appendChild(line);
                    screen.scrollTop = screen.scrollHeight;
                }, step.delay);
            });

            setTimeout(() => {
                runBtn.disabled = false;
                runBtn.style.opacity = "1";
            }, 4600);
        });
    }

    // ==========================================================================
    // Data Flow Simulation (Challenges Slide)
    // ==========================================================================
    function setupDataFlowSimulation() {
        const nodeUi = document.getElementById("flow-node-ui");
        const nodePhp = document.getElementById("flow-node-php");
        const nodeDb = document.getElementById("flow-node-db");
        const glow1 = document.getElementById("glow-dot-1");
        const glow2 = document.getElementById("glow-dot-2");
        const descText = document.getElementById("flow-desc-text");
        const descBox = document.getElementById("flow-description-box");

        if (!nodeUi || !nodePhp || !nodeDb || !glow1 || !glow2 || !descText || !descBox) return;

        nodeUi.addEventListener("mouseenter", () => {
            nodeUi.style.borderColor = "var(--color-accent)";
            nodeUi.style.boxShadow = "0 0 12px var(--color-accent-dim)";
            glow1.classList.add("glow-active");
            glow1.style.opacity = "1";
            descText.innerHTML = "⚡ <strong>Frontend UI:</strong> ส่งแบบฟอร์มคำขอจองอาหารห้องประชุม หรือคำขอค้นหาข้อมูลสินค้าในระบบ STSP Innomart ไปยังเซิร์ฟเวอร์หลังบ้าน";
            descBox.style.borderColor = "rgba(0, 163, 255, 0.35)";
        });

        nodeUi.addEventListener("mouseleave", () => {
            nodeUi.style.borderColor = "var(--color-border)";
            nodeUi.style.boxShadow = "none";
            glow1.classList.remove("glow-active");
            glow1.style.opacity = "0";
            resetFlowDesc();
        });

        nodePhp.addEventListener("mouseenter", () => {
            nodePhp.style.borderColor = "#4f5b93";
            nodePhp.style.boxShadow = "0 0 12px rgba(79, 91, 147, 0.25)";
            glow2.classList.add("glow-active");
            glow2.style.opacity = "1";
            descText.innerHTML = "🐘 <strong>PHP 8 Controller:</strong> ทำหน้าที่รับ HTTP Request, ตรวจสอบความถูกต้องและสิทธิ์การเข้าถึงข้อมูล (Validation), และทำการแปลงคำสั่งเขียน SQL Query";
            descBox.style.borderColor = "rgba(79, 91, 147, 0.5)";
        });

        nodePhp.addEventListener("mouseleave", () => {
            nodePhp.style.borderColor = "var(--color-border)";
            nodePhp.style.boxShadow = "none";
            glow2.classList.remove("glow-active");
            glow2.style.opacity = "0";
            resetFlowDesc();
        });

        nodeDb.addEventListener("mouseenter", () => {
            nodeDb.style.borderColor = "#00a3ff";
            nodeDb.style.boxShadow = "0 0 12px rgba(0, 163, 255, 0.25)";
            descText.innerHTML = "🗄️ <strong>SQLite3 Database:</strong> ประมวลผลคำสั่ง SQL โดยตรงบนไฟล์ฐานข้อมูลเดี่ยว มีความรวดเร็วและใช้เวลาดึง/เขียนบันทึกข้อมูลเฉลี่ยเพียง 3-5ms";
            descBox.style.borderColor = "rgba(0, 163, 255, 0.35)";
        });

        nodeDb.addEventListener("mouseleave", () => {
            nodeDb.style.borderColor = "var(--color-border)";
            nodeDb.style.boxShadow = "none";
            resetFlowDesc();
        });

        function resetFlowDesc() {
            descText.innerHTML = "💡 เอาเมาส์ชี้ที่คอมโพเนนต์ด้านบนเพื่อทดสอบจำลองการส่งข้อมูล (Data Flow)";
            descBox.style.borderColor = "rgba(255, 255, 255, 0.05)";
        }
    }

    // ==========================================================================
    // Lightbox (Zoom Images)
    // ==========================================================================
    const lightboxModal = document.getElementById("lightbox-modal");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const lightboxClose = document.querySelector(".lightbox-close");

    if (slideWrapper && lightboxModal && lightboxImg && lightboxCaption) {
        slideWrapper.addEventListener("click", (e) => {
            const img = e.target.closest("img");
            if (img) {
                if (img.classList.contains("rsp-logo-img")) return;
                lightboxImg.src = img.src;
                lightboxCaption.textContent = img.alt || "ภาพขยายรายละเอียดหน้าอินเทอร์เฟซ";
                lightboxModal.style.display = "flex";
                setTimeout(() => { lightboxModal.classList.add("show"); }, 10);
            }
        });
    }

    function closeLightbox() {
        lightboxModal.classList.remove("show");
        setTimeout(() => { lightboxModal.style.display = "none"; }, 300);
    }

    if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);

    if (lightboxModal) {
        lightboxModal.addEventListener("click", (e) => {
            if (e.target === lightboxModal || e.target === lightboxImg || e.target.classList.contains("lightbox-close")) {
                closeLightbox();
            }
        });
    }

    // ==========================================================================
    // Confetti System (Canvas Particles)
    // ==========================================================================
    const confettiCanvas = document.getElementById("confetti-canvas");
    const confettiCtx = confettiCanvas ? confettiCanvas.getContext("2d") : null;
    let confettiParticles = [];
    let confettiAnimationId = null;

    function resizeConfettiCanvas() {
        if (confettiCanvas) {
            confettiCanvas.width = window.innerWidth;
            confettiCanvas.height = window.innerHeight;
        }
    }
    window.addEventListener("resize", resizeConfettiCanvas);
    resizeConfettiCanvas();

    class Confetti {
        constructor() {
            this.x = Math.random() * confettiCanvas.width;
            this.y = Math.random() * -confettiCanvas.height - 20;
            this.size = Math.random() * 8 + 6;
            this.color = ["#00a3ff", "#10b981", "#a855f7", "#f59e0b", "#ef4444", "#38bdf8"][Math.floor(Math.random() * 6)];
            this.speedX = Math.random() * 4 - 2;
            this.speedY = Math.random() * 5 + 4;
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 4 - 2;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.rotation += this.rotationSpeed;
            if (this.y > confettiCanvas.height) {
                this.y = -20;
                this.x = Math.random() * confettiCanvas.width;
            }
        }
        draw() {
            if (!confettiCtx) return;
            confettiCtx.save();
            confettiCtx.translate(this.x, this.y);
            confettiCtx.rotate((this.rotation * Math.PI) / 180);
            confettiCtx.fillStyle = this.color;
            confettiCtx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            confettiCtx.restore();
        }
    }

    function initConfetti() {
        confettiParticles = [];
        for (let i = 0; i < 100; i++) {
            confettiParticles.push(new Confetti());
        }
        if (!confettiAnimationId) {
            animateConfetti();
        }
    }

    function animateConfetti() {
        if (!confettiCtx) return;
        confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        confettiParticles.forEach((p) => {
            p.update();
            p.draw();
        });
        confettiAnimationId = requestAnimationFrame(animateConfetti);
    }

    function stopConfetti() {
        if (confettiAnimationId) {
            cancelAnimationFrame(confettiAnimationId);
            confettiAnimationId = null;
        }
        if (confettiCtx && confettiCanvas) {
            confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        }
    }

    // ==========================================================================
    // Web Audio Sound Synthesizer (Mechanical Click)
    // ==========================================================================
    let soundEnabled = localStorage.getItem("soundEnabled") === "true";
    const soundToggle = document.getElementById("sound-toggle");
    const soundOnIcon = document.getElementById("sound-on-icon");
    const soundOffIcon = document.getElementById("sound-off-icon");

    function updateSoundUI() {
        if (soundEnabled) {
            if (soundOnIcon) soundOnIcon.style.display = "block";
            if (soundOffIcon) soundOffIcon.style.display = "none";
            if (soundToggle) soundToggle.classList.add("active");
        } else {
            if (soundOnIcon) soundOnIcon.style.display = "none";
            if (soundOffIcon) soundOffIcon.style.display = "block";
            if (soundToggle) soundToggle.classList.remove("active");
        }
    }

    if (soundToggle) {
        soundToggle.addEventListener("click", () => {
            soundEnabled = !soundEnabled;
            localStorage.setItem("soundEnabled", soundEnabled);
            updateSoundUI();
            if (soundEnabled) playClickSound();
        });
    }
    updateSoundUI();

    function playClickSound() {
        if (!soundEnabled) return;
        try {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            const ctx = new AudioContextClass();
            
            // Synthetic crisp click
            const osc = ctx.createOscillator();
            const gainNode = ctx.createGain();
            
            osc.type = "sine";
            osc.frequency.setValueAtTime(1500, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.08);
            
            gainNode.gain.setValueAtTime(0.04, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
            
            osc.connect(gainNode);
            gainNode.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.07);
            
            // Resonance
            const oscRes = ctx.createOscillator();
            const gainRes = ctx.createGain();
            oscRes.type = "triangle";
            oscRes.frequency.setValueAtTime(200, ctx.currentTime);
            oscRes.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.08);
            gainRes.gain.setValueAtTime(0.03, ctx.currentTime);
            gainRes.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);
            
            oscRes.connect(gainRes);
            gainRes.connect(ctx.destination);
            oscRes.start();
            oscRes.stop(ctx.currentTime + 0.08);
        } catch (e) {
            console.warn("AudioContext init error", e);
        }
    }

    // ==========================================================================
    // 3D Tilt Card and Gloss Shine Effect
    // ==========================================================================
    if (slideWrapper) {
        slideWrapper.addEventListener("mouseenter", (e) => {
            const card = e.target.closest(".content-card, .challenge-card, .metric-card, .activity-card");
            if (card && !card.querySelector(".card-shine")) {
                const shine = document.createElement("div");
                shine.className = "card-shine";
                card.appendChild(shine);
            }
        }, true);

        slideWrapper.addEventListener("mousemove", (e) => {
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
            if (window.innerWidth < 768) return;
            // Only tilt cards if the slide transition is fully complete and active
            if (!slideWrapper.classList.contains("active")) return;

            const card = e.target.closest(".content-card, .challenge-card, .metric-card, .activity-card");
            if (!card) return;

            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty("--shine-x", `${x}px`);
            card.style.setProperty("--shine-y", `${y}px`);

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((centerY - y) / centerY) * 4;
            const rotateY = ((x - centerX) / centerX) * 4;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.015)`;
        });

        slideWrapper.addEventListener("mouseleave", (e) => {
            const card = e.target.closest(".content-card, .challenge-card, .metric-card, .activity-card");
            if (card) {
                card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
            }
        }, true);
    }

    // ==========================================================================
    // Initial Load
    // ==========================================================================
    const initialHash = window.location.hash;
    const initialMatch = initialHash.match(/^\#\/(\d+)$/);
    if (initialMatch) {
        const initialSlide = parseInt(initialMatch[1], 10) - 1;
        if (initialSlide >= 0 && initialSlide < slides.length) {
            loadSlide(initialSlide);
            return;
        }
    }
    loadSlide(0);
});
