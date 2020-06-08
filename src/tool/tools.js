import Vue from 'vue';

export const loadingOptions = {
    lock: true,
    background: 'rgba(0, 0, 0, 0.5)',
    spinner: 'el-icon-loading',
    text: '拼命加载中'
};


export function debounce(func, delay, immediate) {
    let timer = -1;
    return function () {
        if (immediate && timer === -1) {
            timer = null;
            func();
        } else {
            clearTimeout(timer);
            timer = setTimeout(func, delay);
        }
    }
}

export function useComponents(components) {
    components.forEach(component => {
        Vue.use(component);
    });
}

const emptyDate = {};
['FullYear', 'RealMonth', 'Date', 'Hours', 'Minutes', 'Seconds'].forEach(name => {
    emptyDate['get' + name] = () => {
        return '0000';
    };
});

export function padLeftZero(str, length) {
    return ('00' + str).slice(-length);
}


/**
 * 格式化时间
 * @param date
 * @param format
 * @returns {string}
 */
export function formatDate(date, format = 'yyyy-mm-dd hh:ii:ss') {
    if (!isType(date, 'Date')) {
        date = date ? new Date(date.replace(/\-/g, "/")) : emptyDate;
    }
    if (!date.getRealMonth) {
        date.getRealMonth = () => {
            return date.getMonth() + 1;
        };
    }

    let o = {
        'y+': date.getFullYear(),
        'm+': date.getRealMonth(),
        'd+': date.getDate(),
        'h+': date.getHours(),
        'i+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        let str = o[k] + '';
        if (new RegExp(`(${k})`).test(format)) {
            format = format.replace(RegExp.$1, padLeftZero(str, RegExp.$1.length));
        }
    }
    return format;
}
/**
 *  月份简写 星期 大写 简写
 * @param {*}  monthUpper
 */
export const monthUpper = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
export const dayUpper = ['SUN', 'MON', 'TUES', 'WED', 'THUR', 'FRI', 'SAT']

export function getBetweenDateStr(start, end) { //开始时间 结束 时间 各前后加一天
    var result = [];
    // var beginDay = start.split("-");
    var endDay = end.split("-");
    // var diffDay = new Date();
    var diffDay = new Date(start)
    var dateList = new Array;
    var i = 0;

    if (start != end) {
        result.push(start);
        while (i == 0) {
            var countDay = diffDay.getTime() + 24 * 60 * 60 * 1000;
            diffDay.setTime(countDay);
            dateList[2] = diffDay.getDate();
            dateList[1] = diffDay.getMonth() + 1;
            dateList[0] = diffDay.getFullYear();
            if (String(dateList[1]).length == 1) {
                dateList[1] = "0" + dateList[1]
            };
            if (String(dateList[2]).length == 1) {
                dateList[2] = "0" + dateList[2]
            };
            result.push(dateList[0] + "-" + dateList[1] + "-" + dateList[2]);

            if (dateList[0] == endDay[0] && dateList[1] == endDay[1] && dateList[2] == endDay[2]) {
                i = 1;
            }
        };
    } else { //需要处理下 开始时间等于结束时间
        result.push(start);
    }
    return result;
}


export function splitArr(data, senArrLen) {
    //处理成len个一组的数据
    let data_len = data.length;
    let arrOuter_len = data_len % senArrLen === 0 ? data_len / senArrLen : parseInt((data_len / senArrLen) + '') + 1;
    let arrSec_len = data_len > senArrLen ? senArrLen : data_len; //内层数组的长度
    let arrOuter = new Array(arrOuter_len); //最外层数组
    let arrOuter_index = 0; //外层数组的子元素下标
    // console.log(data_len % len);
    for (let i = 0; i < data_len; i++) {
        if (i % senArrLen === 0) {
            arrOuter_index++;
            let len = arrSec_len * arrOuter_index;
            //将内层数组的长度最小取决于数据长度对len取余，平时最内层由下面赋值决定
            arrOuter[arrOuter_index - 1] = new Array(data_len % senArrLen);
            if (arrOuter_index === arrOuter_len) //最后一组
                data_len % senArrLen === 0 ?
                    len = data_len % senArrLen + senArrLen * arrOuter_index :
                    len = data_len % senArrLen + senArrLen * (arrOuter_index - 1);
            let arrSec_index = 0; //第二层数组的索引
            for (let k = i; k < len; k++) { //第一层数组的开始取决于第二层数组长度*当前第一层的索引
                arrOuter[arrOuter_index - 1][arrSec_index] = data[k];
                arrSec_index++;
            }
        }
    }
    return arrOuter;

}


/**
 * 验证身份证号码
 * @param idCard
 * @returns {string}
 */
export function validateIdCard(idCard) {
    const rule = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/;
    return idCard.match(rule);
}

/**
 * 验证手机号 和座机
 * @param mobile
 * @returns {string}
 */
export function validateMobile(mobile) { //
    // const mobileRule = /^1[0-9]{10}$/;
    const mobileRule = /^((0\d{2,3}-\d{7,8})|(1[0-9]{10}))$/;
    return mobile.match(mobileRule);
}

/**
 * 验证邮箱
 * @param email
 * @returns {RegExpMatchArray | Promise<any> | * | Promise<Response>}
 */
export function validateEmail(email) {
    const emailRule = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
    return email.match(emailRule);
}

/**
 * 验证数值
 * @param number
 * @returns {RegExpMatchArray | Promise<any> | * | Promise<Response>}
 */
export function validateNumber(number) {
    const numberRule = /^([1-9]\d*)?$/;
    return number.match(numberRule);
}

/**
 * 去空格
 * @param time
 * @returns {string}
 */
export function trim(str) {
    return str.replace(/\s*/g, "");
}

export function isType(obj, type) {
    return Object.prototype.toString.call(obj) === '[object ' + type + ']';
}


export function parseQueryString(url) {
    var result = {};
    var pos = url.indexOf('?');
    if (pos === -1) {
        return result;
    }
    var query = url.substr(pos + 1);
    var items = query.split("&");

    for (var i = 0; i < items.length; i++) {
        var arr = items[i].split("=");
        result[arr[0]] = arr[1];
    }
    return result;
}