/// <reference types="jest" />
const { parseCsvList } = require('../static/utils')

test('returns input if input is an array', () => {
const result = parseCsvList([1,2,3,4]);
expect(result).toStrictEqual([1,2,3,4]);
});

test('returns split list for normal CSV of strings', () => {
const result = parseCsvList('asd,zxc,hi,1,4,1231231231231');
expect(result).toStrictEqual(['asd', 'zxc', 'hi', '1', '4', '1231231231231']);
});

test('returns [] for non-string non-array input', () => {
const result = parseCsvList(123);
expect(result).toStrictEqual([]);
});

test('trims whitespace around items', () => {
const result = parseCsvList(' a ,  b ,   c ');
expect(result).toStrictEqual(['a', 'b', 'c']);
});

test('returns [] for empty string', () => {
expect(parseCsvList('')).toStrictEqual([]);
});

test('returns [] for whitespace-only string', () => {
expect(parseCsvList('   ')).toStrictEqual([]);
});

test('returns [] for null', () => {
expect(parseCsvList(null)).toStrictEqual([]);
});

test('returns [] for undefined', () => {
expect(parseCsvList(undefined)).toStrictEqual([]);
});