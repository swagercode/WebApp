/** @jest-environment jsdom */
/// <reference types="jest" />

beforeEach(() => {
    jest.useFakeTimers();
    document.body.innerHTML = '';

    window.matchMedia = window.matchMedia || function () {
        return {
          matches: false,
          media: '',
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        };
    };
    global.fetch = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
});
test('search flow shows result in menu', async () => {
    jest.useRealTimers();
    document.body.innerHTML = `
      <div id="content"></div>
      <div class="search-bar" id="search-bar">
        <div class="search-bar-input-area search-bar-input-button" id="search-left-btn">
          <input type="text" class="search-input" id="search-input" />
        </div>
        <div class="search-menu-wrapper" id="search-menu" hidden>
          <div class="search-menu-container">
            <div class="search-menu-header" id="spot-search-menu-header">
              <div class="search-menu-title">Recent searches</div>
              <div class="search-menu-desc">Find your previous study spots</div>
            </div>
            <hr class="search-menu-divider" id="spot-search-menu-header-hr" />
            <div class="search-menu-list" id="search-menu-list"></div>
          </div>
        </div>
      </div>
    `;

    global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => [
            { id: 1, name: 'Cafe Amazon', pictures: ['foo.jpg'], time: '', rating: 5 },
        ],
    });

    require('../static/utils');
    require('../static/app');

    const input = document.getElementById('search-input');
    input.value = 'Cafe';
    input.dispatchEvent(new Event('input', { bubbles: true }));

    await new Promise((resolve) => setTimeout(resolve, 300));

    const list = document.getElementById('search-menu-list');
    const items = list.querySelectorAll('a.search-menu-item');
    expect(items.length).toBe(1);

    const title = items[0].querySelector('.search-menu-item-title');
    expect(title.textContent).toBe('Cafe Amazon');

    expect(global.fetch).toHaveBeenCalledWith(
        '/api/search-spot?term=' + encodeURIComponent('Cafe'),
    );
});