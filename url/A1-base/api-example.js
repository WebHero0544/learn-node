const {URL, URLSearchParams} = require('url');

// WHATWG URLSearchParams接口和querystring模块有相似的目的，
// 但是querystring模块的目的更加通用，因为它可以定制分隔符（＆和=）。
// 但另一方面，这个API是专门为URL查询字符串而设计的。
const url = new URL('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash');

debugger;
console.log(url);
console.log('----------')

// 在URL对象上调用toJSON()方法将返回序列化的URL。返回值与url.href和url.toString()的相同。
console.log(url.toJSON());
console.log('----------')




//url.searchParams对象是URLSearchParams类的实例，用于操作url.search查询参数
url.searchParams.get('query');  //获取查询参数
console.log(url.href);
console.log('----------')

url.searchParams.append('element', 'temp');//添加查询参数
console.log(url.href);
console.log('----------')

url.searchParams.set('element', 'height');//设置查询参数
console.log(url.href);
console.log('----------')

url.searchParams.delete('element')//删除查询参数
console.log(url.href);
console.log('----------')




//基于原有的查询参数，新键一个URLSearchParams类的实例
const newSearchParams = new URLSearchParams(url.searchParams);
// 上面的代码等同于
// const newSearchParams = new URLSearchParams(myURL.search);
newSearchParams.append('stime', '19000000000');
newSearchParams.append('etime', '19100000000');
console.log(newSearchParams.toString());
url.search = newSearchParams;
console.log(url.href);

console.log('----------')
url.searchParams.delete('stime');
console.log(url.href);
console.log('----------')


// 当参数为map对象时
const params = new URLSearchParams({
  user: 'dong',
  query: ['first', 'second']
});
console.log(params.getAll('query'));
// 输出 [ 'first,second' ]
console.log(params.toString());
// 输出 'user=dong&query=first%2Csecond'









