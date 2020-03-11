import { getParams, getParamsExtended, addParams, addParamsExtended } from './url';

describe('GET', () => {
    test('getParams()', () => {
        expect(getParams('example.com')).toEqual({});
        expect(getParams('example.com?bar=1&foo')).toEqual({ bar: '1', foo: '' });
        expect(getParams('example.com?bar=1&bar=2')).toEqual({ bar: '2' });
        expect(getParams('example.com?bar[]=1&bar[]=2')).toEqual({ bar: ['1', '2'] });
        expect(getParams('example.com?bar=1&bar[]=2')).toEqual({ bar: ['2'] });
        expect(getParams('example.com?bar=test+test%2Ctest')).toEqual({ bar: 'test test,test' });
    });

    test('getParamsExtended()', () => {
        expect(getParamsExtended('example.com?bar[t]=test+test%2Ctest')).toEqual({ bar: { t: 'test test,test' } });
        expect(getParamsExtended('example.com?bar[t]=1&bar[j]=2')).toEqual({ bar: { t: '1', j: '2' } });
        expect(getParamsExtended('example.com?bar[t]=1&bar[j]=2&bar[j]=3')).toEqual({ bar: { t: '1', j: '3' } });
        expect(getParamsExtended('example.com?b[t]=1&b[j]=2&b[j][g]=3'))
            .toEqual({ b: { t: '1', j: { g: '3' } } });
        expect(getParamsExtended('example.com?bar=-1&bar[]=0&bar[tr]=1&bar[j]=2&bar[foo][too][poo]=3&bar[]=4&bar[foo][too][hoo]=5'))
            .toEqual({ bar: { '1': '0', tr: '1', j: '2', foo: { too: { poo: '3', hoo: '5' } }, '5': '4' } });
    });
});

describe('ADD', () => {
    test('addParams()', () => {
        expect(addParams('example.com', { bar: 1 })).toBe('example.com?bar=1');
        expect(addParams('example.com', { bar: 1, foo: 2 })).toBe('example.com?bar=1&foo=2');
        expect(addParams('example.com?bar=1&foo', { bar: 2 })).toBe('example.com?bar=2&foo=');
        expect(addParams('example.com?bar=1&foo', { bar: 2, foo: 2 })).toBe('example.com?bar=2&foo=2');
        expect(addParams('example.com?bar=1', { bar: [2, 3] })).toBe('example.com?bar[]=2&bar[]=3');
        expect(addParams('example.com?bar=1&bar[]=2', { bar: [3, 4] })).toBe('example.com?bar[]=2&bar[]=3&bar[]=4');
        expect(addParams('example.com?bar=1&bar=2', { bar: [3, 4] })).toBe('example.com?bar[]=3&bar[]=4');
        expect(addParams('example.com?bar[]=1&bar[]=2', { bar: [3, 4] })).toBe('example.com?bar[]=1&bar[]=2&bar[]=3&bar[]=4');
    });

    test('addParamsExtended()', () => {
        expect(addParamsExtended('example.com', { bar: 1, foo: 2 })).toBe('example.com?bar=1&foo=2');
        /**
         * BUG
         */
        // expect(addParamsExtended('example.com?bar[foo]=test&bar[joo]=2', { bar: { foo: 'new', too: 5 } }))
        //     .toBe('example.com?bar[foo]=new&bar[joo]=2&bar[too]=5');
        expect(addParamsExtended('example.com', { bar: { foo: 'test', joo: 2 } }))
            .toBe('example.com?bar[foo]=test&bar[joo]=2');
        expect(addParamsExtended('example.com', {
            f1: { f11: 1, f12: 2, f13: 3 }, f2: 4, f3: { f31: { f311: 6, f312: { f3121: 9 } }, f32: { f321: 2 } },
            f4: { f41: 3, f42: { f421: 2 } }, f5: [2, 4]
        })).toBe('example.com?f1[f11]=1&f1[f12]=2&f1[f13]=3&f2=4&f3[f31][f311]=6&f3[f31][f312][f3121]=9&f3[f32][f321]=2&f4[f41]=3&f4[f42][f421]=2&f5[0]=2&f5[1]=4');
    });
});
