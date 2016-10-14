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

var str = "这是一本垃圾书, 可以买卖军刀";

var results = filter.search(str);

console.log(results);

/*
* { text: { invisible: 1, mathed: 4 },
*     indexs: 
*      [ { index: 4, length: 2, weight: 1 },
*        { index: 13, length: 2, weight: 1 } ] }
* */
```    