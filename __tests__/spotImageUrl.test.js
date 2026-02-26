/// <reference types="jest" />
const { spotImageUrl } = require('../static/utils')

test('builds URL for a normal filename', () => {
    const result = spotImageUrl('foo.png');
    expect(result).toBe('/api/download-image?name=foo.png');
});

test('returns empty string for empty input', () => {
    const result = spotImageUrl('');
    expect(result).toBe('');
});

test('returns empty string for null', () => {
    const result = spotImageUrl(null);
    expect(result).toBe('');
});

test('encodes special characters in filename', () => {
    const result = spotImageUrl('my image.png');
    expect(result).toBe('/api/download-image?name=my%20image.png');
});