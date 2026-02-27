function parseCsvList(value) {
    if (Array.isArray(value)) return value;
    if (typeof value !== 'string') return [];
    return value.split(',').map((item) => { return item.trim(); }).filter(Boolean);
}

function spotImageUrl(picture) {
    if (!picture) return '';
    return '/api/download-image?name=' + encodeURIComponent(picture);
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


module.exports = {
    parseCsvList,
    spotImageUrl,
    renderSearchMenuList,
};

if (typeof window !== 'undefined') {
    window.spotImageUrl = spotImageUrl;
    window.parseCsvList = parseCsvList;
    window.renderSearchMenuList = renderSearchMenuList;
}