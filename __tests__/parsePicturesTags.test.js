/// <reference types="jest" />

const { parseRawSpotJSON } = require('../static/utils');

describe('parsePictures and parseTags via parseRawSpotJSON', () => {
  test('parses comma-separated pictures string into array', () => {
    const raw = {
      id: 1,
      name: 'Test Spot',
      pictures: 'one.jpg, two.png , three.gif',
    };

    const spot = parseRawSpotJSON(raw);
    expect(spot.pictures).toStrictEqual(['one.jpg', 'two.png', 'three.gif']);
  });

  test('returns pictures array unchanged when already an array', () => {
    const raw = {
      id: 2,
      name: 'Array Spot',
      pictures: ['a.jpg', 'b.jpg'],
    };

    const spot = parseRawSpotJSON(raw);
    expect(spot.pictures).toStrictEqual(['a.jpg', 'b.jpg']);
  });

  test('parses comma-separated tags string into array', () => {
    const raw = {
      id: 3,
      name: 'Taggy Spot',
      tags: 'cafe, quiet , wifi',
    };

    const spot = parseRawSpotJSON(raw);
    expect(spot.tags).toStrictEqual(['cafe', 'quiet', 'wifi']);
  });

  test('returns tags array unchanged when already an array', () => {
    const raw = {
      id: 4,
      name: 'Array Tags Spot',
      tags: ['cafe', 'quiet'],
    };

    const spot = parseRawSpotJSON(raw);
    expect(spot.tags).toStrictEqual(['cafe', 'quiet']);
  });
});

