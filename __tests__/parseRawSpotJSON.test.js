/// <reference types="jest" />

const { parseRawSpotJSON } = require('../static/utils');

describe('parseRawSpotJSON', () => {
  test('returns spot unchanged when given a single object', () => {
    const raw = {
      id: 1,
      name: 'Cafe Amazon',
      address: 'Japan',
      description: 'Great coffee.',
      hours: '8am - 3pm',
      phone: '123',
      rating: 5,
      pictures: 'a.jpg,b.jpg',
      tags: 'cafe,quiet',
    };

    const spot = parseRawSpotJSON(raw);

    expect(spot.id).toBe(1);
    expect(spot.name).toBe('Cafe Amazon');
    expect(spot.pictures).toStrictEqual(['a.jpg', 'b.jpg']);
    expect(spot.tags).toStrictEqual(['cafe', 'quiet']);
  });

  test('unwraps array when given an array of spots', () => {
    const rawArray = [
      {
        id: 2,
        name: 'Quiet Library',
        pictures: 'lib1.png, lib2.png',
        tags: 'library,quiet',
      },
    ];

    const spot = parseRawSpotJSON(rawArray);

    expect(spot.id).toBe(2);
    expect(spot.name).toBe('Quiet Library');
    expect(spot.pictures).toStrictEqual(['lib1.png', 'lib2.png']);
    expect(spot.tags).toStrictEqual(['library', 'quiet']);
  });

  test('throws on invalid input', () => {
    expect(() => parseRawSpotJSON(null)).toThrow('Spot data was invalid');
    expect(() => parseRawSpotJSON(undefined)).toThrow('Spot data was invalid');
  });
});

