/// <reference types="jest" />

const { fetchSpotSearchResults } = require('../static/utils');

describe('fetchSpotSearchResults', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('returns early and does not call fetch for empty search term', async () => {
    const result = await fetchSpotSearchResults('');
    expect(global.fetch).not.toHaveBeenCalled();
    expect(result).toBeUndefined();
  });

  test('calls fetch with encoded term and returns the response', async () => {
    const fakeResponse = { ok: true };
    global.fetch.mockResolvedValue(fakeResponse);

    const term = 'Cafe Amazon';
    const result = await fetchSpotSearchResults(term);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/search-spot?term=' + encodeURIComponent(term),
    );
    expect(result).toBe(fakeResponse);
  });
});

