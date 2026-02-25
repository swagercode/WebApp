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

        var searchPlaceholder = document.getElementById('search-placeholder');
        var searchInput = document.getElementById('search-input');

        if (searchLeftBtn && searchMenu) {
            searchLeftBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                if (searchInput && !searchLeftBtn.classList.contains('search-input-active')) {
                    searchLeftBtn.classList.add('search-input-active');
                    searchInput.focus();
                }
                var open = !searchMenu.hidden;
                var inInputMode = searchLeftBtn.classList.contains('search-input-active');
                if (open && !inInputMode) closeSearchMenu();
                else if (!open) {
                    closePreferenceMenu();
                    searchMenu.hidden = false;
                    searchLeftBtn.setAttribute('aria-expanded', 'true');
                }
            });
        }
        if (searchInput && searchLeftBtn) {
            searchInput.addEventListener('blur', function () {
                if (!searchInput.value.trim()) {
                    searchLeftBtn.classList.remove('search-input-active');
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

        var pathname = window.location.pathname;
        if ((pathname === '/' || pathname === '/index.html') && searchInput) {
            var content = document.getElementById('content');
            var searchTimeout;
            searchInput.addEventListener('input', function () {
                var term = searchInput.value.trim();
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(function () {
                    if (!content) return;
                    if (term === '') {
                        content.innerHTML = '<p class="add-spot-status home-load-status">Loading spots...</p>';
                        fetchHomeSpots().then(renderHomeSpots).catch(function () {
                            content.innerHTML = '<p class="add-spot-status error home-load-status">Failed to load spots.</p>';
                        });
                        return;
                    }
                    content.innerHTML = '<p class="add-spot-status home-load-status">Searching...</p>';
                    fetchSearchSpots(term).then(function (spots) {
                        renderHomeSpots(spots);
                    }).catch(function () {
                        content.innerHTML = '<p class="add-spot-status error home-load-status">Search failed.</p>';
                    });
                }, 250);
            });
        }
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
                window.location.href = '/add-spot';
            });
        }
    }

    function initAddSpotForm() {
        var form = document.getElementById('add-spot-form');
        if (!form) return;

        var imageInput = document.getElementById('spot-images');
        var imageDrop = document.getElementById('spot-image-drop');
        var previewGrid = document.getElementById('image-preview-grid');
        var uploadList = document.getElementById('image-upload-list');
        var status = document.getElementById('add-spot-status');
        var submitBtn = document.getElementById('add-spot-submit');
        var selectedFiles = [];
        var uploadedImagePaths = [];
        var isUploading = false;
        var MAX_IMAGE_COUNT = 3;
        var MIN_IMAGE_COUNT = 1;

        function setStatus(message, stateClass) {
            if (!status) return;
            status.textContent = message || '';
            status.classList.remove('error', 'success');
            if (stateClass) status.classList.add(stateClass);
        }

        function renderUploadRows(rows) {
            if (!uploadList) return;
            uploadList.innerHTML = rows.map(function (row) {
                return '<li class="' + row.state + '">' + row.message + '</li>';
            }).join('');
        }

        function renderImagePreviews(files) {
            if (!previewGrid) return;
            if (!files || files.length === 0) {
                previewGrid.innerHTML = '';
                return;
            }

            previewGrid.innerHTML = files.map(function (file) {
                var objectUrl = URL.createObjectURL(file);
                return '<div class="image-preview-item">' +
                    '<img src="' + objectUrl + '" alt="' + file.name.replace(/"/g, '&quot;') + '" />' +
                    '<span title="' + file.name.replace(/"/g, '&quot;') + '">' + file.name + '</span>' +
                    '</div>';
            }).join('');
        }

        function pickFilesFromInput() {
            if (imageInput) imageInput.click();
        }

        function normalizeFiles(fileLikeList) {
            return Array.prototype.filter.call(fileLikeList || [], function (file) {
                return file && typeof file.type === 'string' && file.type.indexOf('image/') === 0;
            });
        }

        function fileKey(file) {
            return [file.name, file.size, file.lastModified].join('::');
        }

        function mergeFiles(existingFiles, newFiles, maxCount) {
            var map = {};
            var merged = [];
            var i;

            for (i = 0; i < existingFiles.length; i++) {
                map[fileKey(existingFiles[i])] = true;
                merged.push(existingFiles[i]);
            }

            for (i = 0; i < newFiles.length; i++) {
                var key = fileKey(newFiles[i]);
                if (!map[key]) {
                    map[key] = true;
                    merged.push(newFiles[i]);
                }
            }

            return merged.slice(0, maxCount);
        }

        async function processSelectedFiles(fileLikeList) {
            var incomingFiles = normalizeFiles(fileLikeList);
            if (!incomingFiles || incomingFiles.length === 0) {
                setStatus('Please choose image files.', 'error');
                return;
            }

            var mergedFiles = mergeFiles(selectedFiles, incomingFiles, MAX_IMAGE_COUNT);

            if (mergedFiles.length < MIN_IMAGE_COUNT || mergedFiles.length > MAX_IMAGE_COUNT) {
                setStatus('Please upload between 1 and 3 images.', 'error');
                return;
            }

            var previousCount = selectedFiles.length;
            selectedFiles = mergedFiles;
            renderImagePreviews(selectedFiles);

            var newFiles = selectedFiles.slice(previousCount);
            if (newFiles.length === 0) {
                setStatus('Images ready.', 'success');
                return;
            }

            var existingRows = uploadedImagePaths.slice(0, previousCount).map(function (_, i) {
                return { state: 'ok', message: 'Image ' + (i + 1) + ' uploaded' };
            });

            if (submitBtn) submitBtn.disabled = true;
            setStatus('Uploading new images...', null);
            try {
                var existingPaths = uploadedImagePaths.slice();
                var newPaths = await uploadNewImagesOnly(newFiles, existingRows);
                uploadedImagePaths = existingPaths.concat(newPaths);
                setStatus('Images uploaded.', 'success');
            } catch (error) {
                setStatus(error.message || 'Image upload failed.', 'error');
            } finally {
                if (submitBtn) submitBtn.disabled = false;
            }
        }

        async function uploadNewImagesOnly(files, existingRows) {
            var filenames = [];
            var rows = Array.isArray(existingRows) ? existingRows.slice() : [];
            renderUploadRows(rows);
            isUploading = true;

            try {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    rows.push({ state: '', message: 'Uploading ' + file.name + '...' });
                    renderUploadRows(rows);

                    var formData = new FormData();
                    formData.append('file', file);

                    var response = await fetch('/api/upload-image', {
                        method: 'POST',
                        body: formData
                    });
                    var result = await response.json();
                    if (!response.ok) {
                        throw new Error(result.error || 'Upload failed');
                    }
                    var filename = result.filename || file.name;
                    filenames.push(filename);
                    rows[rows.length - 1] = { state: 'ok', message: file.name + ' uploaded' };
                    renderUploadRows(rows);
                }
                return filenames;
            } finally {
                isUploading = false;
            }
        }

        if (imageInput) {
            imageInput.addEventListener('change', async function () {
                await processSelectedFiles(imageInput.files);
                imageInput.value = '';
            });
        }

        if (imageDrop) {
            imageDrop.addEventListener('click', pickFilesFromInput);
            imageDrop.addEventListener('keydown', function (event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    pickFilesFromInput();
                }
            });

            ['dragenter', 'dragover'].forEach(function (eventName) {
                imageDrop.addEventListener(eventName, function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    imageDrop.classList.add('drag-over');
                });
            });

            ['dragleave', 'dragend', 'drop'].forEach(function (eventName) {
                imageDrop.addEventListener(eventName, function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    imageDrop.classList.remove('drag-over');
                });
            });

            imageDrop.addEventListener('drop', async function (event) {
                var dataTransfer = event.dataTransfer;
                await processSelectedFiles(dataTransfer ? dataTransfer.files : []);
            });
        }

        form.addEventListener('submit', async function (event) {
            event.preventDefault();
            setStatus('', null);

            if (!selectedFiles || selectedFiles.length < MIN_IMAGE_COUNT || selectedFiles.length > MAX_IMAGE_COUNT) {
                setStatus('Please upload between 1 and 3 images.', 'error');
                return;
            }

            if (isUploading) {
                setStatus('Please wait for images to finish uploading.', 'error');
                return;
            }

            if (uploadedImagePaths.length !== selectedFiles.length) {
                setStatus('Please wait for image upload to complete before submitting.', 'error');
                return;
            }

            if (submitBtn) submitBtn.disabled = true;

            try {
                var formData = new FormData(form); 
                var payload = {
                    name: String(formData.get('name')).trim(),
                    description: String(formData.get('description')).trim(),
                    address: String(formData.get('address')).trim(),
                    hours: String(formData.get('hours')).trim(),
                    phone: String(formData.get('phone')).trim(),
                    rating: Number(formData.get('rating')),
                    tags: String(formData.get('tags')).trim(),
                    pictures: uploadedImagePaths
                };
                console.log('add-spot request payload:', payload);

                var response = await fetch('/api/add-spot', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                var addSpotResult = null;
                try {
                    addSpotResult = await response.clone().json();
                    console.log('add-spot response json:', addSpotResult);
                } catch (jsonParseError) {
                    console.log('add-spot response was not JSON');
                }
                
                if (response.redirected && response.url) {
                    window.location.href = response.url;
                    return;
                }

                if (addSpotResult && addSpotResult.error) {
                    setStatus(addSpotResult.error, 'error');
                    return;
                }

                if (!response.ok) {
                    var errText = 'Failed to submit spot';
                    if (addSpotResult && addSpotResult.error) {
                        errText = addSpotResult.error;
                    }
                    throw new Error(errText);
                }

                setStatus('Spot added successfully.', 'success');
                var newId = addSpotResult && (addSpotResult.id != null) ? addSpotResult.id : '';
                window.location.href = newId ? '/spot-add-success?id=' + encodeURIComponent(newId) : '/spot-add-success';
            } catch (error) {
                setStatus(error.message || 'Something went wrong.', 'error');
            } finally {
                if (submitBtn) submitBtn.disabled = false;
            }
        });
    }

    function initSpotPage() {
        if (window.location.pathname.indexOf('/spot') !== 0) return;

        var params = new URLSearchParams(window.location.search);
        var spotId = params.get('id');

        var titleEl = document.getElementById('spot-title');
        var addressLineEl = document.getElementById('spot-address-line');
        var descEl = document.getElementById('spot-description');
        var ratingEl = document.getElementById('spot-rating');
        var phoneEl = document.getElementById('spot-phone');
        var addressEl = document.getElementById('spot-address');
        var mainImageEl = document.getElementById('spot-main-image');
        var galleryEl = document.getElementById('spot-gallery-grid');
        var tagsEl = document.getElementById('spot-tags-list');
        var statusEl = document.getElementById('spot-load-status');
        var hoursEl = document.getElementById('spot-hours');
        var openStatusEl = document.getElementById('spot-open-status');

        function setLoadStatus(message, isError) {
            if (!statusEl) return;
            statusEl.textContent = message || '';
            statusEl.classList.remove('error', 'success');
            if (isError) statusEl.classList.add('error');
        }

        function parsePictures(picturesField) {
            if (Array.isArray(picturesField)) return picturesField;
            if (typeof picturesField === 'string') {
                return picturesField.split(',').map(function (s) { return s.trim(); }).filter(Boolean);
            }
            return [];
        }

        function parseTags(tagsField) {
            if (Array.isArray(tagsField)) return tagsField;
            if (typeof tagsField === 'string') {
                return tagsField.split(',').map(function (s) { return s.trim(); }).filter(Boolean);
            }
            return [];
        }

        function renderGallery(images) {
            if (!galleryEl) return;
            galleryEl.innerHTML = images.slice(1, 5).map(function (img) {
                return '<div class="photo-item"><img src="' + spotImageUrl(img) + '" alt="Spot image" loading="lazy" /></div>';
            }).join('');
        }

        if (!spotId) {
            setLoadStatus('Missing spot id in URL. Open a spot from the spots page.', true);
            return;
        }

        setLoadStatus('Loading spot details...', false);

        fetch('/api/spot?id=' + encodeURIComponent(spotId))
            .then(async function (response) {
                var json = await response.json();
                if (!response.ok || (json && json.error)) {
                    throw new Error((json && json.error) || 'Failed to load spot');
                }
                return json;
            })
            .then(function (rawSpot) {
                var spot = rawSpot;
                if (Array.isArray(rawSpot) && rawSpot.length > 0) {
                    spot = rawSpot[0];
                }

                if (!spot || typeof spot !== 'object') {
                    throw new Error('Spot data was invalid');
                }

                var pictures = parsePictures(spot.pictures);
                var tags = parseTags(spot.tags);

                if (titleEl) titleEl.textContent = spot.name || 'Spot';
                var addr = spot.address || '';
                if (addressLineEl) addressLineEl.textContent = addr || 'Address unavailable';
                if (addressEl) addressEl.textContent = addr || '—';
                if (descEl) descEl.textContent = spot.description || 'No description available.';
                if (ratingEl) ratingEl.textContent = spot.rating != null ? String(spot.rating) : '—';
                if (hoursEl) hoursEl.textContent = spot.hours ? (' ' + spot.hours) : '—';
                if (openStatusEl) openStatusEl.textContent = '';
                if (phoneEl) {
                    var phone = spot.phone || '';
                    phoneEl.textContent = phone || 'Not available';
                    phoneEl.href = phone ? ('tel:' + phone) : '#';
                }

                if (mainImageEl) {
                    if (pictures.length > 0) {
                        mainImageEl.src = spotImageUrl(pictures[0]);
                    } else {
                        mainImageEl.removeAttribute('src');
                        mainImageEl.alt = 'No image available';
                    }
                }

                renderGallery(pictures);

                if (tagsEl) {
                    tagsEl.innerHTML = tags.length
                        ? tags.map(function (tag) {
                            return '<li>' + escapeHtml(tag) + '</li>';
                        }).join('')
                        : '<li>No tags</li>';
                }

                setLoadStatus('', false);
            })
            .catch(function (error) {
                setLoadStatus(error.message || 'Failed to load spot.', true);
            });
    }

    function escapeHtml(value) {
        return String(value == null ? '' : value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function parseCsvList(value) {
        if (Array.isArray(value)) return value;
        if (typeof value !== 'string') return [];
        return value.split(',').map(function (item) { return item.trim(); }).filter(Boolean);
    }

    function spotImageUrl(picture) {
        if (!picture) return '';
        return '/api/download-image?name=' + encodeURIComponent(picture);
    }

    async function fetchHomeSpots() {
        try {
            var listResponse = await fetch('/api/spots');
            if (listResponse.ok) {
                var listJson = await listResponse.json();
                if (Array.isArray(listJson)) return listJson;
            }
        } catch (e) {}

        // Fallback when list endpoint is unavailable: probe by id.
        var spots = [];
        var misses = 0;
        for (var id = 1; id <= 100 && misses < 20; id++) {
            try {
                var response = await fetch('/api/spot?id=' + id);
                if (!response.ok) {
                    misses += 1;
                    continue;
                }
                var spot = await response.json();
                if (spot && !spot.error) {
                    spots.push(spot);
                    misses = 0;
                } else {
                    misses += 1;
                }
            } catch (e) {
                misses += 1;
            }
        }
        return spots;
    }

    async function fetchSearchSpots() {
        const searchInput = document.getElementById('search-input');
        var searchTerm = searchInput.value;
        if (searchTerm.trim() == '') {
            return;
        }
        try {
            var response = await fetch(`/api/search-term?${searchTerm}`)
            var data = await response.json();
            return data;
        }
        catch (err) {
            console.error(err);
            return [];
        }
    }

    function renderSearchSpots() {
        
    }

    function renderHomeSpots(spots) {
        var content = document.getElementById('content');
        if (!content) return;

        if (!spots || spots.length === 0) {
            content.innerHTML = '<p class="add-spot-status error home-load-status">No spots found yet.</p>';
            return;
        }

        content.innerHTML = spots.map(function (spot, index) {
            var delay = (Math.floor(index / 3) * 50) + ((index % 3) * 100);
            var pictures = parseCsvList(spot.pictures);
            var imageSrc = pictures[0] ? spotImageUrl(pictures[0]) : 'static/categories/overall.svg';
            var rating = (spot.rating != null && spot.rating !== '') ? spot.rating : '-';
            var subtitle = spot.address || spot.hours || '';

            return '<div class="spot-container" style="--delay: ' + delay + 'ms;">' +
                '<a href="/spot?id=' + encodeURIComponent(spot.id) + '" class="spot-card">' +
                '<article>' +
                '<figure><img src="' + escapeHtml(imageSrc) + '" alt="' + escapeHtml(spot.name || 'Spot') + '" /></figure>' +
                '<dl>' +
                '<dt><span>' + escapeHtml(spot.name || 'Unnamed spot') + '</span><span>' + escapeHtml(rating) + '<span style="color: var(--rating-clr)">★</span></span></dt>' +
                '<dd>' + escapeHtml(subtitle) + '</dd>' +
                '</dl>' +
                '</article>' +
                '</a>' +
                '</div>';
        }).join('');
    }

    function initHomeSpots() {
        var content = document.getElementById('content');
        if (!content) return;

        var pathname = window.location.pathname;
        if (!(pathname === '/' || pathname === '/index.html')) return;

        content.innerHTML = '<p class="add-spot-status home-load-status">Loading spots...</p>';
        fetchHomeSpots()
            .then(renderHomeSpots)
            .catch(function () {
                content.innerHTML = '<p class="add-spot-status error home-load-status">Failed to load spots.</p>';
            });
    }

    function initSpotAddSuccessPage() {
        var pathname = window.location.pathname;
        if (pathname !== '/spot-add-success' && pathname !== '/spot_add_success.html') return;
        var params = new URLSearchParams(window.location.search);
        var id = params.get('id');
        var viewLink = document.getElementById('spot-success-view-link');
        if (viewLink && id) {
            viewLink.href = '/spot?id=' + encodeURIComponent(id);
            viewLink.removeAttribute('hidden');
        }
    }

    function init() {
        initSearchMenus();
        initHeaderHeight();
        initHeaderFold();
        initAddSpotButton();
        initAddSpotForm();
        initSpotPage();
        initHomeSpots();
        initSpotAddSuccessPage();
        window.addEventListener('resize', initHeaderHeight);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
