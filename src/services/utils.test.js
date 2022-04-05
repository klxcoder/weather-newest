import {convertCtoF} from './utils';

// describe('test convertCtoF function', () => {
    test('0C must be equal 32F', () => {
        expect(convertCtoF(0)).toBe(32);
    });

    test('1C must be equal 33.8F', () => {
        expect(convertCtoF(1)).toBe(33.8);
    });

    test('10C must be equal 50F', () => {
        expect(convertCtoF(10)).toBe(50);
    });
// });