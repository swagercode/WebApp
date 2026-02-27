/** @jest-environment jsdom */
/// <reference types="jest" />

const { renderSearchMenuList } = require('../static/utils');

describe('renderSearchMenuList', () => {
  test('renders links for provided spots with picture thumbnails', () => {
    const container = document.createElement('div');

    const spots = [
      {
        id: 1,
        name: 'Cafe Amazon',
        pictures: ['foo.jpg'],
        time: '5 mins away',
        rating: 4.5,
      },
      {
        id: 2,
        name: 'Quiet Library',
        pictures: ['bar.png'],
        time: '10 mins away',
        rating: 4.8,
      },
    ];

    renderSearchMenuList(container, spots);

    const links = container.querySelectorAll('a.search-menu-item');
    expect(links.length).toBe(2);

    // First item
    const first = links[0];
    expect(first.getAttribute('href')).toBe('/spot?id=1');

    const firstImg = first.querySelector('img.search-menu-item-icon');
    expect(firstImg).not.toBeNull();
    expect(firstImg.getAttribute('src')).toBe(
      '/api/download-image?name=' + encodeURIComponent('foo.jpg'),
    );

    const firstTitle = first.querySelector('.search-menu-item-title');
    expect(firstTitle.textContent).toBe('Cafe Amazon');
  });

  test('throws if a spot has no pictures array', () => {
    const container = document.createElement('div');
    const badSpots = [
      { id: 1, name: 'No Picture Spot' }, // no pictures field
    ];

    expect(() => renderSearchMenuList(container, badSpots)).toThrow(
      'Expected spot to have at least one picture',
    );
  });

  test('falls back to recentSearches when no results list provided', () => {
    const container = document.createElement('div');

    // Call without second argument so utils.js uses recentSearches
    renderSearchMenuList(container);

    const links = container.querySelectorAll('a.search-menu-item');
    expect(links.length).toBeGreaterThan(0);

    const firstTitle = links[0].querySelector('.search-menu-item-title');
    expect(firstTitle).not.toBeNull();
    expect(firstTitle.textContent).toBeTruthy();
  });
});

