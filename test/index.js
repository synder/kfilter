/**
 * Created by synder on 2016/10/14.
 */

var Filter = require('../index');

var filter = new Filter();

filter.append(Filter.KEYWORDS.CONTRABAND); //系统已经定义词库
filter.append('垃圾');
filter.append('fuck');
filter.append('baidu.com');

var str = "这是一本垃-圾书, 可以买卖军　刀海洛因, fu（）ck, ｆｕｃｋ,ｆｕ％ｃｋ, 网址：http://www.baidu.com";

var os = require('os');

var temp = process.memoryUsage().heapUsed;
console.time('a');
for(var i = 0; i < 1000000; i++){
    filter.search(str);
}
console.timeEnd('a');
console.log((process.memoryUsage().heapUsed - temp) / 1024 / 1024 );