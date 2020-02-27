# vanilla-js-url
Object for working with url

```javascript
JcURL.getParams('example.com?bar=1&foo');
JcURL.addParams('example.com', { bar: 1, foo: 2 });
````

### getParams(String url)

* <b>example.com</b> return <b>`{}`</b>
* <b>example.com?bar=1&foo</b> return <b>`{ bar: '1', foo: '' }`</b>
* <b>example.com?bar=1&bar=2</b> return <b>`{ bar: '2' }`</b>
* <b>example.com?bar[]=1&bar[]=2</b> return <b>`{ bar: ['1', '2'] }`</b>
* <b>example.com?bar=1&bar[]=2</b> return <b>`{ bar: ['2'] }`</b>

### addParams(String url, Object params)

* <b>example.com</b> & <b>`{ bar: 1 }</b> return <b>example.com?bar=1</b>
* <b>example.com</b> & <b>`{ bar: 1, foo: 2 }</b> return <b>example.com?bar=1&foo=2</b>
* <b>example.com?bar=1&foo</b> & <b>`{ bar: 2 }</b> return <b>example.com?bar=2&foo=</b>
* <b>example.com?bar=1&foo</b> & <b>`{ bar: 2, foo: 2 }</b> return <b>example.com?bar=2&foo=2</b>
* <b>example.com?bar=1</b> & <b>`{ bar: [2, 3] }</b> return <b>example.com?bar[]=2&bar[]=3</b>
* <b>example.com?bar=1&bar[]=2</b> & <b>`{ bar: [3, 4] }</b> return <b>example.com?bar[]=2&bar[]=3&bar[]=4</b>
* <b>example.com?bar=1&bar=2</b> & <b>`{ bar: [3, 4] }</b> return <b>example.com?bar[]=3&bar[]=4</b>
* <b>example.com?bar[]=1&bar[]=2</b> & <b>`{ bar: [3, 4] }</b> return <b>example.com?bar[]=1&bar[]=2&bar[]=3&bar[]=4</b>

