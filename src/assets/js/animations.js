(function () {
    'use strict';

    function safeQuery(selector) {
        return document.querySelector(selector);
    }

    function safeQueryAll(selector) {
        return document.querySelectorAll(selector) || [];
    }

    // ===== SCROLL ANIMATIONS =====
    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('anim-visible');
                    obs.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    function initAnimations() {
        safeQueryAll('.anim').forEach((el) => observer.observe(el));
    }

    // ===== MAP TOGGLE =====
    function initMap() {
        const mapBanner = safeQuery('#mapBanner');
        const mapToggleBtn = safeQuery('#mapToggleBtn');

        if (!mapBanner || !mapToggleBtn) return;

        let mapExpanded = false;

        mapToggleBtn.addEventListener('click', function () {
            mapExpanded = !mapExpanded;

            mapBanner.style.height = mapExpanded ? '500px' : '280px';
            mapToggleBtn.innerHTML = mapExpanded
                ? '<i class="fas fa-compress"></i>'
                : '<i class="fas fa-expand"></i>';
        });
    }

    // ===== CURRENCY =====
    function initCurrency() {
        const items = safeQueryAll('.currency-selector span');
        if (!items.length) return;

        items.forEach((el) => {
            el.addEventListener('click', function () {
                items.forEach((s) => s.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    // ===== LOAD MORE =====
    function initLoadMore() {
        const btn = safeQuery('#loadMoreBtn');
        if (!btn) return;

        let loadCount = 0;

        btn.addEventListener('click', function () {
            loadCount++;

            const container = safeQuery('.col-lg-9');
            if (!container) return;

            const row = document.createElement('div');
            row.className = 'row';

            row.innerHTML = `<div class="col-md-4">Nuevo item</div>`;

            container.appendChild(row);

            if (loadCount >= 3) {
                btn.textContent = 'NO MORE RESULTS';
                btn.disabled = true;
            }
        });
    }

    // ===== INIT =====
    function initAll() {
        initAnimations();
        initMap();
        initCurrency();
        initLoadMore();
    }

    // 🔥 IMPORTANTE: esperar a Vue
    window.addEventListener('load', initAll);

})();