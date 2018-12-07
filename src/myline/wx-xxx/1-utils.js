/**  
 * 转换对象为x-www-form-urlencoded
 * @author NanQi
 * @param {Object} obj  
 * @return {String}  
 */
let transformRequest = obj => {
	let query = '';
	let name, value, fullSubName, subName, subValue, innerObj, i;

	for(name in obj) {
		value = obj[name];

		if(value instanceof Array) {
			for(i = 0; i < value.length; ++i) {
				subValue = value[i];
				fullSubName = name + '[' + i + ']';
				innerObj = {};
				innerObj[fullSubName] = subValue;
				query += transformRequest(innerObj) + '&';
			}
		} else if(value instanceof Object) {
			for(subName in value) {
				subValue = value[subName];
				fullSubName = name + '[' + subName + ']';
				innerObj = {};
				innerObj[fullSubName] = subValue;
				query += transformRequest(innerObj) + '&';
			}
		} else if(value !== undefined && value !== null) {
			query += encodeURIComponent(name) + '=' +
				encodeURIComponent(value) + '&';
		}
	}

	return query.length ? query.substr(0, query.length - 1) : query;
}

let timestamp = function() {
	return Date.parse(new Date()) / 1000;
}

let isNavigating = false;
let isNavigate = () => {
	if(isNavigating) {
		return true;
	} else {
		isNavigating = true;
		setTimeout(() => {
			isNavigating = false;
		}, 2000)
		return false;
	}
}

let guid = (function() {
	let counter = 0;

	return function(prefix) {
		let guid = new Date().getTime().toString(32),
			i;

		for(i = 0; i < 5; i++) {
			guid += Math.floor(Math.random() * 65535).toString(32);
		}

		return(prefix || '') + guid + (counter++).toString(32);
	};
}());

let sortTransform = (obj) => {
	var objKeys = Object.keys(obj);
	objKeys = objKeys.sort();

	var ret = {};
	for(var i = 0; i < objKeys.length; i++) {
		let objVal = obj[objKeys[i]];
		ret[objKeys[i]] = objVal;
	}

	return transformRequest(ret);
}

function isArray(v) {
	return toString.apply(v) === '[object Array]'
}

function isFunction(v) {
	return typeof v === 'function'
}

function isEmptyObject(v) {
	return Object.keys(v).length == 0
}

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

const throttle = function(func, wait = 200, options) {
	/* options的默认值
	 *  表示首次调用返回值方法时，会马上调用func；否则仅会记录当前时刻，当第二次调用的时间间隔超过wait时，才调用func。
	 *  options.leading = true;
	 * 表示当调用方法时，未到达wait指定的时间间隔，则启动计时器延迟调用func函数，若后续在既未达到wait指定的时间间隔和func函数又未被调用的情况下调用返回值方法，则被调用请求将被丢弃。
	 *  options.trailing = true; 
	 * 注意：当options.trailing = false时，效果与上面的简单实现效果相同
	 */
	var context, args, result;
	var timeout = null;
	var previous = 0;
	if(!options) options = {
		leading: true,
		trailing: false
	};
	var later = function() {
		previous = options.leading === false ? 0 : new Date().getTime();
		timeout = null;
		result = func.apply(context, args);
		if(!timeout) context = args = null;
	};
	return function() {
		var now = new Date().getTime();
		if(!previous && options.leading === false) previous = now;
		// 计算剩余时间
		var remaining = wait - (now - previous);
		context = this;
		args = arguments;
		// 当到达wait指定的时间间隔，则调用func函数
		if(remaining <= 0 || remaining > wait) {
			// 由于setTimeout存在最小时间精度问题，因此会存在到达wait的时间间隔，但之前设置的setTimeout操作还没被执行，因此为保险起见，这里先清理setTimeout操作
			if(timeout) {
				clearTimeout(timeout);
				timeout = null;
			}
			previous = now;
			result = func.apply(context, args);
			if(!timeout) context = args = null;
		} else if(!timeout && options.trailing !== false) {
			// options.trailing=true时，延时执行func函数
			timeout = setTimeout(later, remaining);
		}
		return result;
	};
};

const debounce = function(func, wait, immediate) {
	// immediate默认为false
	var timeout, args, context, timestamp, result;

	var later = function() {
		// 当wait指定的时间间隔期间多次调用_.debounce返回的函数，则会不断更新timestamp的值，导致last < wait && last >= 0一直为true，从而不断启动新的计时器延时执行func
		var last = new Date().getTime() - timestamp;

		if(last < wait && last >= 0) {
			timeout = setTimeout(later, wait - last);
		} else {
			timeout = null;
			if(!immediate) {
				result = func.apply(context, args);
				if(!timeout) context = args = null;
			}
		}
	};

	return function() {
		context = this;
		args = arguments;
		timestamp = new Date().getTime();
		// 第一次调用该方法时，且immediate为true，则调用func函数
		var callNow = immediate && !timeout;
		// 在wait指定的时间间隔内首次调用该方法，则启动计时器定时调用func函数
		if(!timeout) timeout = setTimeout(later, wait);
		if(callNow) {
			result = func.apply(context, args);
			context = args = null;
		}

		return result;
	};
};

Promise.prototype.finally = function (callback) {
    let P = this.constructor
    return this.then(
        value => P.resolve(callback()).then(() => value),
        reason => P.resolve(callback()).then(() => { throw reason })
    )
}

wx.utils = {
	transformRequest,
	sortTransform,
	timestamp,
	isNavigate,
	guid,
	isArray,
	sleep,
	isFunction,
	isEmptyObject,
	throttle,
	debounce
}
