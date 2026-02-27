function parseCsvList(value) {
    if (Array.isArray(value)) return value;
    if (typeof value !== 'string') return [];
    return value.split(',').map((item) => { return item.trim(); }).filter(Boolean);
}

function spotImageUrl(picture) {
    if (!picture) return '';
    return '/api/download-image?name=' + encodeURIComponent(picture);
}

var recentSearches = [
        { name: 'Better Buzz', icon: '☕', time: '12 mins away', rating: 4.3 },
        { name: 'Green Bean Coffee', icon: '☕', time: '10 mins away', rating: 4.3 },
        { name: 'Green Bean Coffee', icon: '☕', time: '10 mins away', rating: 4.3 },
        { name: 'Green Bean Coffee', icon: '☕', time: '10 mins away', rating: 4.3 },
        { name: 'Green Bean Coffee', icon: '☕', time: '10 mins away', rating: 4.3 },
        { name: 'Green Bean Coffee', icon: '☕', time: '10 mins away', rating: 4.3 }
];

function renderSearchMenuList(listContainerElement, spotSearchResultsList) {
    if (!listContainerElement) return;
    var source = Array.isArray(spotSearchResultsList) ? spotSearchResultsList : recentSearches;
    console.log('Rendering search menu list with source: ' + String.toString(source));
    listContainerElement.innerHTML = source.map(function (s) {
        return '<a class="search-menu-item" href="/spot?id=' + encodeURIComponent(s.id) + '">' +
                '<div class="search-menu-item">' +
                    '<span class="search-menu-item-icon">' + s.icon + '</span>' +
                    '<div class="search-menu-item-info">' +
                        '<div class="search-menu-item-title">' + s.name + '</div>' +
                    '<div class="search-menu-item-meta">' + s.time + ' <span class="star">★</span>' + s.rating + '</div>' +
            '</div></div>';
    }).join('');
}

async function fetchSpotSearchResults(searchTerm) {
    if (!searchTerm) return;
    return await fetch('/api/search-spot?term=' + encodeURIComponent(searchTerm));
}

function parseRawSpotJSON(rawSpotJSON) {
    var spot = rawSpotJSON;
    if (Array.isArray(rawSpotJSON) && rawSpotJSON.length > 0) {
        spot = rawSpotJSON[0];
    }
    if (!spot || typeof spot !== 'object') {
        throw new Error('Spot data was invalid');
    }
    if (spot.pictures) spot.pictures = parsePictures(spot.pictures);
    if (spot.tags) spot.tags = parseTags(spot.tags);
    console.log('Parsed spot: ' + JSON.stringify(spot));
    return spot;
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


if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        parseCsvList,
        spotImageUrl,
        renderSearchMenuList,
        fetchSpotSearchResults,
        parseRawSpotJSON,
    };
}

if (typeof window !== 'undefined') {
    window.spotImageUrl = spotImageUrl;
    window.parseCsvList = parseCsvList;
    window.renderSearchMenuList = renderSearchMenuList;
    window.fetchSpotSearchResults = fetchSpotSearchResults;
    window.parseRawSpotJSON = parseRawSpotJSON;
}