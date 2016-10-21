/**
 * @desc 关键字搜索
 * */

const judge = require('./lib/judge');
const convert = require('./lib/convert');

const WordTree = require('./word/WordTree').WordTree;


const ADVERTISE = require('./resource/advertise');
const CONTRABAND = require('./resource/contraband');
const POLITICS = require('./resource/politics');
const PORN = require('./resource/porn');
const RELIGIOUS = require('./resource/religious');
const SOCIETY = require('./resource/society');


var Filter = function (keywords) {
    this.__tree = new WordTree(keywords);
};

Filter.prototype.append = function (keyword) {
    this.__tree.append(keyword);
};

Filter.prototype.keywords = function () {
    return this.__tree.keywords();
};

Filter.prototype.search = function (text) {

    var result = {
        text:{
            invisible: 0,
            matched: 0,
        },
        indexes: []
    };

    var rootNode = this.__tree.root;

    if(!rootNode){
        throw new Error('there is no keywords append into the filter');
    }

    var start = 0;

    //the　first　loop　param
    var firstLoweredCharCodeTemp = -1;

    //the　follow　loop　param
    var　followLoweredCharCodeTemp　=　-1;

    var nextNode　=　null;

    //this first char matched, check the first match char is chinese or alpha
    var isChinese = false;
    var isAlpha = false;
    var isWordStart = false;

    //the　first　loop
    while (start < text.length){

        var charCode = text[start].charCodeAt(0);

        if(judge.isInvisibleChar(charCode)){
            start++;
            result.text.invisible += 1;
            continue;
        }

        firstLoweredCharCodeTemp　=　convert.lowercase(convert.ascii(charCode));

        nextNode = rootNode.childs[firstLoweredCharCodeTemp];

        //just if the word is the an english word start
        if(isAlpha == false){
            isAlpha = judge.isAlphaChar(firstLoweredCharCodeTemp);
            isWordStart = isAlpha;
        }else{
            isAlpha = judge.isAlphaChar(firstLoweredCharCodeTemp);
            isWordStart = false;
        }

        //the fist char is not match, then continue
        if(!nextNode){
            start++;
            continue;
        }

        if(isAlpha == true && isWordStart == false){
            start++;
            continue;
        }

        //this first char matched, check the first match char is chinese or alpha
        isChinese = judge.isChineseChar(firstLoweredCharCodeTemp);

        //this first char matched, match the next chars
        var offset = 1;

        while ((start + offset) < text.length){

            if(!nextNode.childs){
                break;
            }

            followLoweredCharCodeTemp　=　convert.lowercase(convert.ascii(text[start + offset].charCodeAt(0)));

            if (judge.isSpecharsChar(followLoweredCharCodeTemp)) {
                offset++;
                continue;
            }

            //filter "法f$轮 le功"
            if(isChinese){
                if(!judge.isChineseChar(followLoweredCharCodeTemp)){
                    offset++;
                    continue;
                }
            }else {
                //filter f$u功ck"
                if(isAlpha){
                    if(!judge.isAlphaChar(followLoweredCharCodeTemp)){
                        offset++;
                        continue;
                    }
                }
            }

            if(!nextNode.childs){
                break;
            }

            nextNode = nextNode.childs[followLoweredCharCodeTemp];

            if(!nextNode){
                break;
            }

            offset++;
        }

        //matched to the last
        if(nextNode && nextNode.end === true) {

            var temp = start;
            start = start + offset; //skip the word which has been matched

            var next = temp + offset;

            if (isAlpha == true){
                if (text.length > next){
                    if (judge.isAlphaChar(text.charCodeAt(next)) == true){
                        continue;
                    }
                }
            }

            result.indexes.push({
                index: temp,
                length: offset,
                weight: nextNode.weight
            });

            result.text.matched += offset;

        } else {
            start++;
        }
    }

    return result;
};


module.exports = Filter;

module.exports.KEYWORDS = {
    ADVERTISE: ADVERTISE,
    CONTRABAND: CONTRABAND,
    POLITICS: POLITICS,
    PORN: PORN,
    RELIGIOUS: RELIGIOUS,
    SOCIETY: SOCIETY
};
