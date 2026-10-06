document.addEventListener('DOMContentLoaded', function() {

    // ** 新增代碼：每次頁面載入時，將滾動條設為頁面頂部 **
    window.scrollTo(0, 0);
    
    // 1. Loading Indicator Logic (加載指示器邏輯)
    // ------------------------------------------------
    const loadingScreen = document.getElementById('loading-screen');
    
    // 確保頁面加載後至少等待 2 秒才消失
    window.addEventListener('load', function() {
        setTimeout(function() {
            document.body.classList.add('loaded');
            
            // 加載畫面消失後，手動觸發一次滾動檢查，確保第一屏內容顯示
            setTimeout(checkScrollAnimation, 100); 
        }, 2000);
    });

    // 2. Scroll Animation (Fade-in) Logic (滾動淡入邏輯)
    // ------------------------------------------------
    // 選擇所有的 section 和 footer
    const animatedElements = document.querySelectorAll('section, footer');

    const observerOptions = {
        root: null,        // 使用視窗作為根
        rootMargin: '0px', // 無邊距
        threshold: 0.15    // 當元素 15% 進入視窗時觸發
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 添加 visible class 來觸發 CSS 動畫
                entry.target.classList.add('visible');
                // 一旦顯示後，取消觀察該元素（只做一次動畫）
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 註冊觀察器
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // 備用函數：如果在某些舊瀏覽器 Observer 不工作，或者為了確保首屏加載
    function checkScrollAnimation() {
        animatedElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if(rect.top < window.innerHeight) {
                el.classList.add('visible');
            }
        });
    }

    // 3. Original Smooth Scroll Logic (原有的平滑滾動邏輯)
    // ------------------------------------------------
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});