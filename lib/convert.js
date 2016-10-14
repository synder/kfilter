/**
 * Created by synder on 16/9/20.
 */

/**
 * @desc 将全角字母转换成半角字符
 * */
exports.ascii = function (charCode) {
    if(charCode > 65312 && charCode < 65371){
        return charCode - 65248
    }else {
        return charCode
    }
};

/**
 * @desc 大写转小写
 * */
exports.lowercase = function (charCode) {
    if(charCode > 64 && charCode < 91){
        return　charCode　|　32;
    }
    return　charCode
};