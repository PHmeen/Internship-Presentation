// ==========================================================================
// ระบบควบคุมการนำเสนอ (Presentation Engine)
// ทำหน้าที่: โหลดสไลด์, ควบคุมคีย์บอร์ด, เปลี่ยนเฉดสีธีม และรันเครื่องมือจำลอง CLI
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    
    // [1] รายการไฟล์สไลด์ทั้งหมด (เรียงตามลำดับหน้า 1 - 10)
    const slides = [
        "slides/01-cover.html",
        // "slides/02-profile.html",  // ← ซ่อนชั่วคราว: เปิดบรรทัดนี้เมื่อต้องการแสดงหน้าแนะนำตัวกลับมา
        "slides/03-about-company.html",
        "slides/04-scope.html",
        "slides/05a-responsibilities-p1.html",
        "slides/05b-responsibilities-p2.html",
        "slides/05c-gallery.html",
        // "slides/06-projects.html", // ← ซ่อนชั่วคราวตามคำขอของผู้ใช้
        "slides/07-challenges.html",
        "slides/08-learnings.html",
        "slides/08b-tech-stack.html",
        "slides/09-suggestions.html",
        "slides/10-conclusion.html"
    ];

    // [2] ชื่อหัวข้อสำหรับแสดงผลบนแถบด้านบน (Header Indicator) เพื่อความสวยงามและเป็นทางการ
    const sectionTitles = [
        "หน้าแรก",
        // "แนะนำผู้จัดทำ",  // ← ซ่อนพร้อมกับสไลด์ 02
        "ข้อมูลเกี่ยวกับองค์กร",
        "ตำแหน่งและลักษณะงาน",
        "บทบาทและหน้าที่รับผิดชอบ (ระบบจองอาหาร)",
        "บทบาทและหน้าที่รับผิดชอบ (STSP Innomart)",
        "ภาพตัวอย่างระบบเพิ่มเติม",
        // "โครงการเด่นช่วงฝึกงาน", // ← ซ่อนพร้อมกับสไลด์ 06
        "ปัญหาและแนวทางการแก้ไข",
        "ทักษะและสิ่งที่ได้รับ",
        "ทักษะและสิ่งที่ได้รับ",
        "ภาพกิจกรรมและการสนับสนุนงาน",
        "บทสรุปและการถามตอบ"
    ];

    // [3] ตัวแปรควบคุมสถานะสไลด์ปัจจุบัน (เริ่มต้นที่สไลด์หน้าแรกดัชนี 0)
    let currentSlide = 0;
    
    // ดึงค่า Element ต่างๆ จากไฟล์ HTML หลัก
    const slideWrapper = document.getElementById("slide-wrapper");
    const currentSlideNum = document.getElementById("current-slide-num");
    const totalSlidesNum = document.getElementById("total-slides-num");
    const currentSectionTitle = document.getElementById("current-section-title");
    const progressBar = document.getElementById("progress-bar");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    
    // ดึงรายการเมนูด้านซ้าย (Sidebar) ทั้งหมดมาเก็บไว้เพื่ออัปเดตสีแท็บ
    const sidebarListItems = document.querySelectorAll("#sidebar-list li");

    // กำหนดจำนวนสไลด์ทั้งหมดบนแถบแสดงผลด้านบน (แปลงเป็นเลข 2 หลัก เช่น "10")
    totalSlidesNum.textContent = String(slides.length).padStart(2, '0');

    // ==========================================================================
    // ฟังก์ชันหลัก: ใช้โหลดสไลด์จากโฟลเดอร์ slides/ เข้ามาแสดงผลแบบไดนามิก
    // ==========================================================================
    async function loadSlide(index) {
        if (index < 0 || index >= slides.length) return;
        
        // ปิดการคลิกปุ่มนำทางชั่วขณะ เพื่อป้องกันปัญหาโหลดสไลด์ซ้ำซ้อนกัน
        prevBtn.disabled = true;
        nextBtn.disabled = true;

        // นำเอฟเฟกต์เฟดออก (Fade-out) โดยถอดคลาส active จากกรอบคอนเทนเนอร์
        slideWrapper.classList.remove("active");

        // รอให้อนิเมชันเฟดออกแสดงผลเสร็จสิ้น (200 มิลลิวินาที) จึงเริ่มเขียนเนื้อหาใหม่
        setTimeout(async () => {
            try {
                // ส่งคำร้องขอโหลดไฟล์ HTML ของสไลด์นั้นๆ
                const response = await fetch(slides[index]);
                if (!response.ok) throw new Error(`ไม่สามารถโหลดไฟล์สไลด์ได้: ${slides[index]}`);
                const html = await response.text();
                
                // แทรกโค้ด HTML ของสไลด์นั้นเข้าไปในหน้าเว็บ
                slideWrapper.innerHTML = html;
                currentSlide = index;
                
                // อัปเดตตัวเลขอินดิเคเตอร์ปัจจุบัน (เช่น "02")
                currentSlideNum.textContent = String(currentSlide + 1).padStart(2, '0');
                
                // อัปเดตชื่อหัวข้อของสไลด์ที่แสดงตรง Header แถบบน
                currentSectionTitle.textContent = sectionTitles[currentSlide];
                
                // คำนวณร้อยละการดำเนินสไลด์เพื่อเปลี่ยนความยาวแถบ Progress bar ด้านล่าง
                const progressPercentage = (currentSlide / (slides.length - 1)) * 100;
                progressBar.style.width = `${progressPercentage}%`;
                
                // แผนผังแมปดัชนีสไลด์ไปยังปุ่มเมนู Sidebar ด้านซ้าย
                const slideToSidebarMap = {
                    0: 0, // Cover -> หน้าปก
                    1: 1, // About Company -> ข้อมูลองค์กร
                    2: 2, // Scope -> ตำแหน่งและลักษณะงาน
                    3: 3, // Responsibilities P1 -> บทบาทและหน้าที่
                    4: 3, // Responsibilities P2 -> บทบาทและหน้าที่
                    5: 3, // Responsibilities Gallery -> บทบาทและหน้าที่
                    // 6: 4, // Projects -> โครงการเด่น (Hidden)
                    6: 4, // Challenges -> ปัญหาและการแก้ไข
                    7: 5, // Learnings -> ทักษะและสิ่งที่ได้รับ
                    8: 5, // Tech Stack -> ทักษะและสิ่งที่ได้รับ
                    9: 6, // Suggestions -> ภาพกิจกรรม
                    10: 7  // Conclusion -> บทสรุป
                };

                // อัปเดตแถบสีแสดงผลที่เมนู Sidebar ด้านซ้าย (ลบคลาส active เก่า และเติมลงหน้าปัจจุบัน)
                sidebarListItems.forEach((li) => li.classList.remove("active"));
                const sidebarIndex = slideToSidebarMap[currentSlide];
                if (sidebarListItems[sidebarIndex] !== undefined) {
                    sidebarListItems[sidebarIndex].classList.add("active");
                }

                // เขียนค่า URL Hash (เช่น #/2) เพื่อช่วยให้กด Back/Forward ในเบราว์เซอร์ได้
                window.location.hash = `/${currentSlide + 1}`;

                // นำเอฟเฟกต์เฟดเข้า (Fade-in & Scale-up) มาแสดงผลโดยเติมคลาส active กลับคืน
                setTimeout(() => {
                    slideWrapper.classList.add("active");
                    // หากสไลด์ที่โหลดมาคือหน้าโปรเจกต์เด่น (หน้า 7 หรือดัชนี 6) ให้รันฟังก์ชันจำลอง CLI
                    if (currentSlide === 6) {
                        setupTerminalSimulation();
                        setupDataFlowSimulation();
                    }



                    // เปิดให้ปุ่มกดนำทางใช้งานได้ตามปกติ
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
        }, 200);
    }

    // ฟังก์ชันเลื่อนไปยังสไลด์ถัดไป
    function nextSlide() {
        if (currentSlide < slides.length - 1) {
            loadSlide(currentSlide + 1);
        }
    }

    // ฟังก์ชันย้อนกลับไปยังสไลด์ก่อนหน้า
    function prevSlide() {
        if (currentSlide > 0) {
            loadSlide(currentSlide - 1);
        }
    }

    // เติมระบบดักจับการคลิกปุ่ม Next/Prev ด้านล่างหน้าจอ
    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);

    // เติมระบบดักจับปุ่มกดบนคีย์บอร์ด (ลูกศรขวา/Spacebar = ถัดไป, ลูกศรซ้าย = ย้อนกลับ)
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
            e.preventDefault(); // ป้องกันเบราว์เซอร์เลื่อนหน้าจอลงเมื่อกด Spacebar
            nextSlide();
        } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
            e.preventDefault();
            prevSlide();
        }
    });

    // แผนผังแมปจากปุ่มเมนู Sidebar ด้านซ้ายไปยังดัชนีสไลด์เริ่มต้น
    const sidebarToSlideMap = {
        0: 0, // หน้าปก -> Cover
        1: 1, // ข้อมูลองค์กร -> About Company
        2: 2, // ตำแหน่งและลักษณะงาน -> Scope
        3: 3, // บทบาทและหน้าที่ -> Responsibilities P1 (หน้าแรกของหัวข้อนี้)
        // 4: 6, // โครงการเด่น -> Projects (Hidden)
        4: 6, // ปัญหาและการแก้ไข -> Challenges
        5: 7, // ทักษะและสิ่งที่ได้รับ -> Learnings
        6: 9, // ข้อเสนอแนะ -> Suggestions (ภาพกิจกรรม)
        7: 10  // บทสรุป -> Conclusion
    };

    // เปิดระบบดักจับการคลิกเลือกหัวข้อบน Sidebar เมนูด้านซ้ายโดยตรง
    sidebarListItems.forEach((li) => {
        li.addEventListener("click", () => {
            const index = parseInt(li.getAttribute("data-index"), 10);
            const targetSlide = sidebarToSlideMap[index];
            if (targetSlide !== undefined && targetSlide !== currentSlide) {
                loadSlide(targetSlide);
            }
        });
    });

    // ฟังก์ชันดักจับเมื่อมีการเปลี่ยน Hash บน URL (เช่น ผู้ใช้อาจกดย้อนกลับบนลูกศรของเบราว์เซอร์)
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
    // ลูกเล่นเปลี่ยนชุดสีของหน้าพรีเซนต์สดๆ (Live Accent Color Changer)
    // ==========================================================================
    const colorDots = document.querySelectorAll(".color-dot");
    colorDots.forEach((dot) => {
        dot.addEventListener("click", () => {
            // ล้างสถานะสีที่ไฮไลท์อยู่ในปัจจุบันออก
            colorDots.forEach((d) => d.classList.remove("active"));
            dot.classList.add("active");
            
            // อ่านค่าสี Hex จากปุ่มจุดกลมๆ ที่ผู้ใช้กดคลิก
            const hexColor = dot.getAttribute("data-color");
            
            // นำสีใหม่ไปเขียนทับตัวแปร CSS Variable (--color-accent) ในรูทหลัก
            document.documentElement.style.setProperty("--color-accent", hexColor);
            
            // แปลงรหัสสี Hex เป็นสเกล RGBA โปร่งแสง เพื่อใช้ในเอฟเฟกต์เรืองแสงด้านหลังสไลด์
            let r = parseInt(hexColor.slice(1, 3), 16);
            let g = parseInt(hexColor.slice(3, 5), 16);
            let b = parseInt(hexColor.slice(5, 7), 16);
            document.documentElement.style.setProperty("--color-accent-dim", `rgba(${r}, ${g}, ${b}, 0.12)`);
        });
    });

    // ==========================================================================
    // ลูกเล่นจำลองหน้าจอ Terminal ในสไลด์โครงการเด่น (Terminal Simulator)
    // ==========================================================================
    function setupTerminalSimulation() {
        const runBtn = document.getElementById("run-audit-btn");
        const screen = document.getElementById("terminal-screen");
        
        if (!runBtn || !screen) return;
        
        runBtn.addEventListener("click", () => {
            // ล็อคปุ่มกดระหว่างทำการประมวลผล เพื่อไม่ให้กดซ้ำซ้อน
            runBtn.disabled = true;
            runBtn.style.opacity = "0.5";
            
            // ล้างหน้าจอพิมพ์คำสั่งแรกเริ่ม
            screen.innerHTML = `<div class="terminal-line command">$ sqlite3 innomart.db</div>`;
            
            // ชุดรายการบรรทัดข้อความคิวรีจำลอง SQLite
            const steps = [
                { text: "sqlite> SELECT name, price, stock FROM products LIMIT 2;", delay: 600, class: "command" },
                { text: "1|STSP Honey|150.00|42", delay: 1200, class: "" },
                { text: "2|Rice Milk Soap|80.00|15", delay: 1600, class: "" },
                { text: "sqlite> SELECT * FROM bookings ORDER BY date DESC LIMIT 1;", delay: 2400, class: "command" },
                { text: "104|Science Hall|Coffee Break|2026-06-10|Confirmed", delay: 3000, class: "success" },
                { text: "sqlite> UPDATE products SET stock = 45 WHERE id = 1;", delay: 3600, class: "command" },
                { text: "Query OK, 1 row affected (0.02 sec)", delay: 4200, class: "success" }
            ];
            
            // ค่อยๆ ทยอยพิมพ์แต่ละบรรทัดขึ้นมาเลียนแบบการทำงานของโปรแกรมหลังบ้านจริง
            steps.forEach((step) => {
                setTimeout(() => {
                    const line = document.createElement("div");
                    line.className = `terminal-line ${step.class}`;
                    line.textContent = step.text;
                    screen.appendChild(line);
                    
                    // ปัดหน้าจอลงมาด้านล่างสุดโดยอัตโนมัติเมื่อข้อความยาวทะลุกรอบ
                    screen.scrollTop = screen.scrollHeight;
                }, step.delay);
            });
            
            // เปิดให้ปุ่มกดกลับมาทำงานได้ตามปกติหลังการจำลองเสร็จสิ้น
            setTimeout(() => {
                runBtn.disabled = false;
                runBtn.style.opacity = "1";
            }, 4600);
        });
    }

    // ==========================================================================
    // ระบบจำลองแผนภาพรับส่งข้อมูลแบบตอบสนอง (Interactive Data Flow Simulator)
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

        // Hover Frontend UI
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

        // Hover PHP 8 API
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

        // Hover SQLite3 Database
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
    // ระบบเปิดดูรูปภาพตัวอย่างแบบเต็มจอ (Interactive Lightbox Zoom)
    // ==========================================================================
    const lightboxModal = document.getElementById("lightbox-modal");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const lightboxClose = document.querySelector(".lightbox-close");

    if (slideWrapper && lightboxModal && lightboxImg && lightboxCaption) {
        slideWrapper.addEventListener("click", (e) => {
            const img = e.target.closest("img");
            if (img) {
                // ยกเว้นโลโก้ RSP เล็กๆ
                if (img.classList.contains("rsp-logo-img")) return;
                
                lightboxImg.src = img.src;
                lightboxCaption.textContent = img.alt || "ภาพขยายรายละเอียดหน้าอินเทอร์เฟซ";
                lightboxModal.style.display = "flex";
                // ให้เวลาเบราว์เซอร์จัด state เล็กน้อยเพื่อให้ CSS Transition ทำงาน
                setTimeout(() => {
                    lightboxModal.classList.add("show");
                }, 10);
            }
        });
    }

    if (lightboxClose) {
        lightboxClose.addEventListener("click", () => {
            lightboxModal.classList.remove("show");
            setTimeout(() => {
                lightboxModal.style.display = "none";
            }, 300);
        });
    }

    if (lightboxModal) {
        lightboxModal.addEventListener("click", (e) => {
            // คลิกพื้นหลังหรือคลิกตัวรูปภาพซูมเพื่อปิด
            if (e.target === lightboxModal || e.target === lightboxImg || e.target.classList.contains("lightbox-close")) {
                lightboxModal.classList.remove("show");
                setTimeout(() => {
                    lightboxModal.style.display = "none";
                }, 300);
            }
        });
    }

    // ทำการโหลดสไลด์หน้าแรกสุดเมื่อเปิดเว็บบราวเซอร์ขึ้นมาครั้งแรก
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
