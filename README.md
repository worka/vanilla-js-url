# vanilla-js-url

A set of functions for working with url. Easy to add parameters to url, easy to extract parameters from url. You can also get `path` from url.

![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/worka/vanilla-js-url)
[![GitHub stars](https://img.shields.io/github/stars/worka/vanilla-js-url)](https://github.com/worka/vanilla-js-url/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/worka/vanilla-js-url)](https://github.com/worka/vanilla-js-url/issues)
[![GitHub forks](https://img.shields.io/github/forks/worka/vanilla-js-url)](https://github.com/worka/vanilla-js-url/network)

**simple get**, **simple add**

<a href="https://worka.github.io/vanilla-js-url/demo.html">Demo</a>

### Install

```cmd
npm i vanilla-js-url
```

or

```cmd
yarn add vanilla-js-url
```

### Get started

```javascript
wurl.getParams('example.com?bar=1&foo');
wurl.addParams('example.com', { bar: 1, foo: 2 });

wurl.getPath('example.com/path/to/page');

wurl.getParamsExtended('example.com?bar[roo][boo]=1&foo[puu]=test');
wurl.addParamsExtended('example.com', { bar: { foo: 'test', joo: 2 } });
````

#### getParams(url, decode)
`alias get()`

| param  | type    | default              |
|--------|---------|----------------------|
| url    | String  | window.location.href |
| decode | Boolean | true                 |

> If you have simple parameters like `bar=1` or `foo[]=3&foo[]=5`, then use `getParams()`.<br />
> In response, you will get a simple (single-level) object whose keys will contain either simple values or simple arrays.
> This function is suitable in 99% of cases.

```javascript
wurl.get('example.com');
// {}

wurl.get('example.com?bar=1&foo');
// { bar: '1', foo: '' }

wurl.get('example.com?bar=1&bar=2');
// { bar: '2' }

wurl.get('example.com?bar[]=1&bar[]=2');
// { bar: ['1', '2'] }

wurl.get('example.com?bar=1&bar[]=2');
// { bar: ['2'] }
```

#### addParams(url, params, encode)
`alias add()`

| param  | type    | default    |
|--------|---------|------------|
| url    | String  | `required` |
| params | Object  | `required` |
| encode | Boolean | false      |

```javascript
wurl.add('example.com', { bar: 1, foo: 2 });
// example.com?bar=1&foo=2

wurl.add('example.com?bar=1&foo', { bar: 2, foo: 2 });
// example.com?bar=2&foo=2

wurl.add('example.com?bar=1', { bar: [2, 3] });
// example.com?bar[]=2&bar[]=3

wurl.add('example.com?bar=1&bar[]=2', { bar: [3, 4] });
// example.com?bar[]=2&bar[]=3&bar[]=4
```

#### getPath(url)
`alias path()`

| param  | type    | default              |
|--------|---------|----------------------|
| url    | String  | window.location.href |

```javascript
wurl.path('https://example.com/path/to/page?bar=1');
// /path/to/page
```

#### getParamsExtended(url)
`alias getExt()`

| param  | type    | default              |
|--------|---------|----------------------|
| url    | String  | window.location.href |

> If you have complex parameters like: `bar[foo][too][poo]=3&bar[foo][goo]=4`, then use `getParamsExtended()`.<br />
> In response, you will get a multi-level object.
> Most likely you will not need this function.

```javascript
wurl.getExt('example.com?bar[t]=1&bar[j]=2');
// { bar: { t: '1', j: '2' } }
```

#### addParamsExtended(url, params)
`alias addExt()`

| param  | type    | default    |
|--------|---------|------------|
| url    | String  | `required` |
| params | Object  | `required` |

```javascript
wurl.addExt('example.com', { bar: { foo: 'test', joo: 2 } });
// example.com?bar[foo]=test&bar[joo]=2
```

The `getParamsExtended` and `addParamsExtended` functions may not answer exactly. Please tell me which tests failed.
