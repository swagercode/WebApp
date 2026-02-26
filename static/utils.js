function parseCsvList(value) {
    if (Array.isArray(value)) return value;
    if (typeof value !== 'string') return [];
    return value.split(',').map((item) => { return item.trim(); }).filter(Boolean);
}

function spotImageUrl(picture) {
    if (!picture) return '';
    return '/api/download-image?name=' + encodeURIComponent(picture);
}

module.exports = {
    parseCsvList,
    spotImageUrl,
};

if (typeof window !== 'undefined') {
    window.spotImageUrl = spotImageUrl;
    window.parseCsvList = parseCsvList;
}