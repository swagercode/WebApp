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

        async function processSelectedFiles(fileLikeList) {
            var files = normalizeFiles(fileLikeList);
            if (!files || files.length === 0) {
                selectedFiles = [];
                uploadedImagePaths = [];
                renderImagePreviews([]);
                renderUploadRows([]);
                setStatus('Please choose image files.', 'error');
                return;
            }

            if (files.length < MIN_IMAGE_COUNT || files.length > MAX_IMAGE_COUNT) {
                setStatus('Please upload between 1 and 3 images.', 'error');
                selectedFiles = [];
                uploadedImagePaths = [];
                renderImagePreviews([]);
                renderUploadRows([]);
                return;
            }

            selectedFiles = files;
            renderImagePreviews(selectedFiles);

            if (submitBtn) submitBtn.disabled = true;
            setStatus('Uploading images...', null);
            try {
                await uploadSelectedImages(selectedFiles);
                setStatus('Images uploaded.', 'success');
            } catch (error) {
                uploadedImagePaths = [];
                setStatus(error.message || 'Image upload failed.', 'error');
            } finally {
                if (submitBtn) submitBtn.disabled = false;
            }
        }

        async function uploadSelectedImages(files) {
            var rows = [];
            uploadedImagePaths = [];
            renderUploadRows([]);
            isUploading = true;

            try {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    rows.push({ state: '', message: 'Uploading ' + file.name + '...' });
                    renderUploadRows(rows);

                    var formData = new FormData();
                    formData.append('file', file);

                    try {
                        var response = await fetch('/api/upload-image', {
                            method: 'POST',
                            body: formData
                        });
                        var result = await response.json();
                        if (!response.ok) {
                            throw new Error(result.error || 'Upload failed');
                        }
                        uploadedImagePaths.push(result.file_path || result.path || file.name);
                        rows[rows.length - 1] = { state: 'ok', message: file.name + ' uploaded' };
                    } catch (error) {
                        rows[rows.length - 1] = { state: 'error', message: file.name + ' failed: ' + error.message };
                        renderUploadRows(rows);
                        throw error;
                    }
                    renderUploadRows(rows);
                }
            } finally {
                isUploading = false;
            }
        }

        if (imageInput) {
            imageInput.addEventListener('change', async function () {
                await processSelectedFiles(imageInput.files);
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
                    name: String(formData.get('name') || '').trim(),
                    description: String(formData.get('description') || '').trim(),
                    address: String(formData.get('address') || '').trim(),
                    hours: String(formData.get('hours') || '').trim(),
                    phone: String(formData.get('phone') || '').trim(),
                    rating: Number(formData.get('rating') || 0),
                    tags: String(formData.get('tags') || '').trim(),
                    pictures: uploadedImagePaths
                };

                var response = await fetch('/api/add-spot', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                
                if (response.redirected && response.url) {
                    window.location.href = response.url;
                    return;
                }

                if (!response.ok) {
                    var errText = 'Failed to submit spot';
                    try {
                        var result = await response.json();
                        errText = result.error || errText;
                    } catch (e) {}
                    throw new Error(errText);
                }

                setStatus('Spot added successfully.', 'success');
                window.location.href = '/spot-add-success';
            } catch (error) {
                setStatus(error.message || 'Something went wrong.', 'error');
            } finally {
                if (submitBtn) submitBtn.disabled = false;
            }
        });
    }

    function init() {
        initSearchMenus();
        initHeaderHeight();
        initHeaderFold();
        initAddSpotButton();
        initAddSpotForm();
        window.addEventListener('resize', initHeaderHeight);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
