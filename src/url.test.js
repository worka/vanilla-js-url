import JcURL from './url';

test('Get params from URL', () => {
    expect(JcURL.getParams('example.com')).toEqual({});
    expect(JcURL.getParams('example.com?bar=1&foo')).toEqual({ bar: '1', foo: '' });
    expect(JcURL.getParams('example.com?bar=1&bar=2')).toEqual({ bar: '2' });
    expect(JcURL.getParams('example.com?bar[]=1&bar[]=2')).toEqual({ bar: ['1', '2'] });
    // @todo to realize
    // expect(JcURL.getParams('example.com?bar[t]=1&bar[j]=2')).toEqual({ bar: { t: '1', j: '2' } });
    // expect(JcURL.getParams('example.com?bar[t]=1&bar[j]=2&bar[j]=3')).toEqual({ bar: { t: '1', j: '3' } });
});

test('Add params to URL', () => {
    expect(JcURL.addParams('example.com', { bar: 1 })).toBe('example.com?bar=1');
    expect(JcURL.addParams('example.com', { bar: 1, foo: 2 })).toBe('example.com?bar=1&foo=2');
    expect(JcURL.addParams('example.com?bar=1&foo', { bar: 2 })).toBe('example.com?bar=2&foo=');
    expect(JcURL.addParams('example.com?bar=1&foo', { bar: 2, foo: 2 })).toBe('example.com?bar=2&foo=2');
    expect(JcURL.addParams('example.com?bar=1', { bar: [2, 3] })).toBe('example.com?bar[]=2&bar[]=3');
    expect(JcURL.addParams('example.com?bar=1&bar=2', { bar: [3, 4] })).toBe('example.com?bar[]=3&bar[]=4');
    expect(JcURL.addParams('example.com?bar[]=1&bar[]=2', { bar: [3, 4] })).toBe('example.com?bar[]=1&bar[]=2&bar[]=3&bar[]=4');
    // @todo to realize
    // expect(JcURL.addParams('example.com', { bar: { t: '1', j: '2' } })).toBe('example.com?bar[t]=1&bar[j]=2');
});
