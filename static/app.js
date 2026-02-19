(function () {
    'use strict';

    var currentFilter = 'All';
    var recentSearches = [
        { name: 'Better Buzz', icon: '☕', time: '12 mins away', rating: 4.3 },
        { name: 'Green Bean Coffee', icon: '☕', time: '10 mins away', rating: 4.3 },
        { name: 'Green Bean Coffee', icon: '☕', time: '10 mins away', rating: 4.3 },
        { name: 'Green Bean Coffee', icon: '☕', time: '10 mins away', rating: 4.3 },
        { name: 'Green Bean Coffee', icon: '☕', time: '10 mins away', rating: 4.3 },
        { name: 'Green Bean Coffee', icon: '☕', time: '10 mins away', rating: 4.3 }
    ];

    function getCurrCategory(rating, category) {
        if (!rating) return 0;
        switch (category) {
            case 'overall': return rating.overall;
            case 'atmosphere': return rating.atmosphere;
            case 'comfort': return rating.comfort;
            case 'quiet': return rating.quiet;
            case 'seating': return rating.seating;
            default: return rating.overall;
        }
    }

    function renderSearchMenuList(containerId) {
        var list = document.getElementById(containerId);
        if (!list) return;
        list.innerHTML = recentSearches.map(function (s) {
            return '<div class="search-menu-item">' +
                '<span class="search-menu-item-icon">' + s.icon + '</span>' +
                '<div class="search-menu-item-info">' +
                '<div class="search-menu-item-title">' + s.name + '</div>' +
                '<div class="search-menu-item-meta">' + s.time + ' <span class="star">★</span>' + s.rating + '</div>' +
                '</div></div>';
        }).join('');
    }

    function initSearchMenus() {
        var searchLeftBtn = document.getElementById('search-left-btn');
        var filterBtn = document.getElementById('filter-btn');
        var searchMenu = document.getElementById('search-menu');
        var preferenceMenu = document.getElementById('preference-menu');
        var filterLabel = document.getElementById('filter-label');

        renderSearchMenuList('search-menu-list');
        renderSearchMenuList('preference-menu-list');

        if (filterLabel) filterLabel.textContent = currentFilter;

        function closeSearchMenu() {
            if (searchMenu) {
                searchMenu.hidden = true;
                if (searchLeftBtn) searchLeftBtn.setAttribute('aria-expanded', 'false');
            }
        }
        function closePreferenceMenu() {
            if (preferenceMenu) {
                preferenceMenu.hidden = true;
                if (filterBtn) filterBtn.setAttribute('aria-expanded', 'false');
            }
        }

        if (searchLeftBtn && searchMenu) {
            searchLeftBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                var open = !searchMenu.hidden;
                if (open) closeSearchMenu();
                else {
                    closePreferenceMenu();
                    searchMenu.hidden = false;
                    searchLeftBtn.setAttribute('aria-expanded', 'true');
                }
            });
        }
        if (filterBtn && preferenceMenu) {
            filterBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                var open = !preferenceMenu.hidden;
                if (open) closePreferenceMenu();
                else {
                    closeSearchMenu();
                    preferenceMenu.hidden = false;
                    filterBtn.setAttribute('aria-expanded', 'true');
                }
            });
        }

        document.addEventListener('click', function (e) {
            if (searchMenu && !searchMenu.hidden && searchLeftBtn && !searchLeftBtn.contains(e.target) && !searchMenu.contains(e.target)) {
                closeSearchMenu();
            }
            if (preferenceMenu && !preferenceMenu.hidden && filterBtn && !filterBtn.contains(e.target) && !preferenceMenu.contains(e.target)) {
                closePreferenceMenu();
            }
        });
    }

    function initHeaderHeight() {
        var isSpotPage = window.location.pathname.indexOf('spot') !== -1;
        var isMobile = window.matchMedia('(max-width: 650px)').matches;
        if (isMobile) {
            document.documentElement.style.setProperty('--header-height', '144px');
        } else if (isSpotPage) {
            document.documentElement.style.setProperty('--header-height', 'calc(96px + 3rem)');
        } else {
            document.documentElement.style.setProperty('--header-height', 'calc(96px + 82.333333px + 3rem)');
        }
    }

    function initHeaderFold() {
        var nav = document.getElementById('nav');
        var routesWrapper = document.querySelector('.top-routes-wrapper');
        var mobileQuery = window.matchMedia('(max-width: 784px)');
        var lastScrollY = window.scrollY;

        if (!nav || !routesWrapper) return;

        function setFolded(isFolded) {
            nav.classList.toggle('folded', isFolded);
        }

        function syncForViewport() {
            if (mobileQuery.matches) {
                setFolded(false);
                return;
            }
            setFolded(window.scrollY !== 0);
        }

        window.addEventListener('scroll', function () {
            if (mobileQuery.matches) {
                lastScrollY = window.scrollY;
                return;
            }

            if ((window.scrollY === 0 && lastScrollY !== 0) || (window.scrollY !== 0 && lastScrollY === 0)) {
                setFolded(!nav.classList.contains('folded'));
            }
            lastScrollY = window.scrollY;
        }, { passive: true });

        window.addEventListener('resize', syncForViewport);
        syncForViewport();
    }

    function initAddSpotButton() {
        var addSpotBtn = document.getElementById('add-spot-btn');
        if (addSpotBtn) {
            addSpotBtn.addEventListener('click', function () {
                // TODO: navigate to add-spot page or open add-spot modal
                window.location.hash = 'add-spot';
            });
        }
    }

    function init() {
        initSearchMenus();
        initHeaderHeight();
        initHeaderFold();
        initAddSpotButton();
        window.addEventListener('resize', initHeaderHeight);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
