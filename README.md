# vanilla-js-url

Object for working with url

GET parameters:<br />
**simple get**<br />
**simple add**

```javascript
jcurl.getParams('example.com?bar=1&foo');
jcurl.addParams('example.com', { bar: 1, foo: 2 });

jcurl.getParamsExtended('example.com?bar[roo][boo]=1&foo[puu]=test');
jcurl.addParamsExtended('example.com', { bar: { foo: 'test', joo: 2 } });
````
_`jcurl` exactly, not `jsurl`, this is not a mistake :)_

### getParams(String url)
`alias get()`

> If you have simple parameters like `bar=1` or `foo[]=3&foo[]=5`, then use `getParams()`.<br />
> In response, you will get a simple (single-level) object whose keys will contain either simple values or simple arrays.
> This function is suitable in 99% of cases.

```javascript
jcurl.get('example.com');
// {}

jcurl.get('example.com?bar=1&foo');
// { bar: '1', foo: '' }
```
* <b>example.com</b> return <b>`{}`</b>
* <b>example.com?bar=1&foo</b> return <b>`{ bar: '1', foo: '' }`</b>
* <b>example.com?bar=1&bar=2</b> return <b>`{ bar: '2' }`</b>
* <b>example.com?bar[]=1&bar[]=2</b> return <b>`{ bar: ['1', '2'] }`</b>
* <b>example.com?bar=1&bar[]=2</b> return <b>`{ bar: ['2'] }`</b>

### addParams(String url, Object params)
`alias add()`

* <b>example.com</b> & <b>`{ bar: 1 }`</b> return <b>example.com?bar=1</b>
* <b>example.com</b> & <b>`{ bar: 1, foo: 2 }`</b> return <b>example.com?bar=1&foo=2</b>
* <b>example.com?bar=1&foo</b> & <b>`{ bar: 2 }`</b> return <b>example.com?bar=2&foo=</b>
* <b>example.com?bar=1&foo</b> & <b>`{ bar: 2, foo: 2 }`</b> return <b>example.com?bar=2&foo=2</b>
* <b>example.com?bar=1</b> & <b>`{ bar: [2, 3] }`</b> return <b>example.com?bar[]=2&bar[]=3</b>
* <b>example.com?bar=1&bar[]=2</b> & <b>`{ bar: [3, 4] }`</b> return <b>example.com?bar[]=2&bar[]=3&bar[]=4</b>
* <b>example.com?bar=1&bar=2</b> & <b>`{ bar: [3, 4] }`</b> return <b>example.com?bar[]=3&bar[]=4</b>
* <b>example.com?bar[]=1&bar[]=2</b> & <b>`{ bar: [3, 4] }`</b> return <b>example.com?bar[]=1&bar[]=2&bar[]=3&bar[]=4</b>

### getParamsExtended(String url)
`alias getExt()`

> If you have complex parameters like: `bar[foo][too][poo]=3&bar[foo][goo]=4`, then use `getParamsExtended()`.<br />
> In response, you will get a multi-level object.
> Most likely you will not need this function.

### addParamsExtended(String url, Object params)
`alias addExt()`

The `getParamsExtended` and `addParamsExtended` functions may not answer exactly. Please tell me which tests failed.
