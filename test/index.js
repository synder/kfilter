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

var str = "这是一本垃-圾书, avi 可以买卖军　刀海洛因, fu你ck, ｆｕｃｋ,ｆｕ％ｃｋ, 网址：http://www.baidu.com";

var results = filter.search(str);

console.log(results);


for(var i = 0; i < results.indexs.length; i++) {
    console.log(str.substr(results.indexs[i].index, results.indexs[i].length), results.indexs[i].weight);
}