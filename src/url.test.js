import jcurl from './url';

describe('GET', () => {
    test('getParams()', () => {
        expect(jcurl.getParams('example.com')).toEqual({});
        expect(jcurl.getParams('example.com?bar=1&foo')).toEqual({ bar: '1', foo: '' });
        expect(jcurl.getParams('example.com?bar=1&bar=2')).toEqual({ bar: '2' });
        expect(jcurl.getParams('example.com?bar[]=1&bar[]=2')).toEqual({ bar: ['1', '2'] });
        expect(jcurl.getParams('example.com?bar=1&bar[]=2')).toEqual({ bar: ['2'] });
    });

    test('getParamsExtended()', () => {
        expect(jcurl.getParamsExtended('example.com?bar[t]=1&bar[j]=2')).toEqual({ bar: { t: '1', j: '2' } });
        expect(jcurl.getParamsExtended('example.com?bar[t]=1&bar[j]=2&bar[j]=3')).toEqual({ bar: { t: '1', j: '3' } });
        expect(jcurl.getParamsExtended('example.com?b[t]=1&b[j]=2&b[j][g]=3'))
            .toEqual({ b: { t: '1', j: { g: '3' } } });
        expect(jcurl.getParamsExtended('example.com?bar=-1&bar[]=0&bar[tr]=1&bar[j]=2&bar[foo][too][poo]=3&bar[]=4&bar[foo][too][hoo]=5'))
            .toEqual({ bar: { '0': '0', tr: '1', j: '2', foo: { too: { poo: '3', hoo: '5' } }, '1': '4' } });
    });
});

describe('ADD', () => {
    test('addParams()', () => {
        expect(jcurl.addParams('example.com', { bar: 1 })).toBe('example.com?bar=1');
        expect(jcurl.addParams('example.com', { bar: 1, foo: 2 })).toBe('example.com?bar=1&foo=2');
        expect(jcurl.addParams('example.com?bar=1&foo', { bar: 2 })).toBe('example.com?bar=2&foo=');
        expect(jcurl.addParams('example.com?bar=1&foo', { bar: 2, foo: 2 })).toBe('example.com?bar=2&foo=2');
        expect(jcurl.addParams('example.com?bar=1', { bar: [2, 3] })).toBe('example.com?bar[]=2&bar[]=3');
        expect(jcurl.addParams('example.com?bar=1&bar[]=2', { bar: [3, 4] })).toBe('example.com?bar[]=2&bar[]=3&bar[]=4');
        expect(jcurl.addParams('example.com?bar=1&bar=2', { bar: [3, 4] })).toBe('example.com?bar[]=3&bar[]=4');
        expect(jcurl.addParams('example.com?bar[]=1&bar[]=2', { bar: [3, 4] })).toBe('example.com?bar[]=1&bar[]=2&bar[]=3&bar[]=4');
    });

    test('addParamsExtended()', () => {
        // expect(jcurl.addParamsExtended('example.com', { bar: { t: '1', j: '2' } })).toBe('example.com?bar[t]=1&bar[j]=2');
    });
});
