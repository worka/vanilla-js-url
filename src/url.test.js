import JcURL from './url';

test('Add params to URL', () => {
    expect(JcURL.addParams('example.com', { bar: 1 })).toBe('example.com?bar=1');
    expect(JcURL.addParams('example.com?bar=1&foo', { bar: 2 })).toBe('example.com?bar=2&foo=');
    expect(JcURL.addParams('example.com?bar=1', { bar: [2, 3] })).toBe('example.com?bar[]=2&bar[]=3');
    // expect(JcURL.addParams('example.com?bar=1&bar=2', { bar: [3, 4] })).toBe('example.com?bar[]=1&bar[]=2&bar[]=3&bar[]=4');
    expect(JcURL.addParams('example.com?bar[]=1&bar[]=2', { bar: [3, 4] })).toBe('example.com?bar[]=1&bar[]=2&bar[]=3&bar[]=4');
});

test('Get params from URL', () => {
    expect(JcURL.getParams('example.com')).toEqual({});
    expect(JcURL.getParams('example.com?bar=1&foo')).toEqual({ bar: '1', foo: '' });
    // expect(JcURL.getParams('example.com?bar=1&bar=2')).toEqual({ bar: ['1', '2'] });
    expect(JcURL.getParams('example.com?bar[]=1&bar[]=2')).toEqual({ bar: ['1', '2'] });
});
