# vanilla-js-url

Object for working with url
GET parameters: **simple get**, **simple add**

![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/worka/vanilla-js-url)
[![GitHub stars](https://img.shields.io/github/stars/worka/vanilla-js-url)](https://github.com/worka/vanilla-js-url/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/worka/vanilla-js-url)](https://github.com/worka/vanilla-js-url/issues)
[![GitHub forks](https://img.shields.io/github/forks/worka/vanilla-js-url)](https://github.com/worka/vanilla-js-url/network)

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
jcurl.getParams('example.com?bar=1&foo');
jcurl.addParams('example.com', { bar: 1, foo: 2 });

jcurl.getParamsExtended('example.com?bar[roo][boo]=1&foo[puu]=test');
jcurl.addParamsExtended('example.com', { bar: { foo: 'test', joo: 2 } });
````
_`jcurl` exactly, not `jsurl`, this is not a mistake :)_

#### getParams(String url, Boolean decode = true)
`alias get()`

> If you have simple parameters like `bar=1` or `foo[]=3&foo[]=5`, then use `getParams()`.<br />
> In response, you will get a simple (single-level) object whose keys will contain either simple values or simple arrays.
> This function is suitable in 99% of cases.

```javascript
jcurl.get('example.com');
// {}

jcurl.get('example.com?bar=1&foo');
// { bar: '1', foo: '' }

jcurl.get('example.com?bar=1&bar=2');
// { bar: '2' }

jcurl.get('example.com?bar[]=1&bar[]=2');
// { bar: ['1', '2'] }

jcurl.get('example.com?bar=1&bar[]=2');
// { bar: ['2'] }
```

#### addParams(String url, Object params, Boolean encode = false)
`alias add()`

```javascript
jcurl.add('example.com', { bar: 1, foo: 2 });
// example.com?bar=1&foo=2

jcurl.add('example.com?bar=1&foo', { bar: 2, foo: 2 });
// example.com?bar=2&foo=2

jcurl.add('example.com?bar=1', { bar: [2, 3] });
// example.com?bar[]=2&bar[]=3

jcurl.add('example.com?bar=1&bar[]=2', { bar: [3, 4] });
// example.com?bar[]=2&bar[]=3&bar[]=4
```
#### getParamsExtended(String url)
`alias getExt()`

> If you have complex parameters like: `bar[foo][too][poo]=3&bar[foo][goo]=4`, then use `getParamsExtended()`.<br />
> In response, you will get a multi-level object.
> Most likely you will not need this function.

```javascript
jcurl.getExt('example.com?bar[t]=1&bar[j]=2');
// { bar: { t: '1', j: '2' } }
```

#### addParamsExtended(String url, Object params)
`alias addExt()`

```javascript
jcurl.addExt('example.com', { bar: { foo: 'test', joo: 2 } });
// example.com?bar[foo]=test&bar[joo]=2
```

The `getParamsExtended` and `addParamsExtended` functions may not answer exactly. Please tell me which tests failed.
