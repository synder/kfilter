/**
 * Created by synder on 2016/10/14.
 */

var Filter = require('../index');

var filter = new Filter();

filter.append(Filter.KEYWORDS.CONTRABAND); //系统已经定义词库
filter.append('垃圾');

var str = "这是一本垃圾书, 可以买卖军刀";

var results = filter.search(str);

console.log(results);
