# kfilter 
### a keywords filter module

## Install

   $ npm install -g kfilter
  
    
## Use in code
```js
var Filter = require('../index');

var filter = new Filter();

filter.append(Filter.KEYWORDS.CONTRABAND); //系统已经定义词库
filter.append('垃圾');
filter.append('fuck');
filter.append('av');
filter.append('baidu.com');

var str = "这是一本垃-圾书, avi 可以av book买卖军　刀海洛因, fuck fu你ck, ｆｕ）ｃｋ,ｆｕ％ｃｋ, 网址：http://www.baidu.com, 催 * 情 * 药";

var results = filter.search(str);

console.log(results);

for(var i = 0; i < results.indexes.length; i++) {
    console.log(str.substr(results.indexes[i].index, results.indexes[i].length), results.indexes[i].weight);
}

/*
{ text: { invisible: 0, matched: 48 },
  indexes: 
   [ { index: 4, length: 3, weight: 1 },
     { index: 16, length: 2, weight: 1 },
     { index: 25, length: 3, weight: 1 },
     { index: 28, length: 3, weight: 3 },
     { index: 33, length: 4, weight: 1 },
     { index: 38, length: 5, weight: 1 },
     { index: 45, length: 5, weight: 1 },
     { index: 51, length: 5, weight: 1 },
     { index: 72, length: 9, weight: 1 },
     { index: 83, length: 9, weight: 1 } ] }

* */

/*
av 1
军　刀 1
海洛因 3
fuck 1
fu你ck 1
ｆｕ）ｃｋ 1
ｆｕ％ｃｋ 1
baidu.com 1
催 * 情 * 药 1
*/
```    