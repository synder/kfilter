/**
 * Created by synder on 2016/10/14.
 */

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

console.time("a");
for(var i = 0; i < 100000; i++) {
    results = filter.search(str);
}
console.timeEnd("a");