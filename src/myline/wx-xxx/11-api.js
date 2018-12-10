import md5 from 'md5'

const preCacheKeyClearFetch = 'storage:clear:fetch:'

async function _request(options) {
	if(options.toast) {
		wx.pro.showLoading({ title: '加载中', mask: true})
	}

	let res = null

	try {
		res = await wx.pro.request(options)
	} finally {
		if(options.toast) {
			wx.pro.hideLoading()
		}
	}

	return res
}

function isExpire(url) {
	return wx.cache.get(preCacheKeyClearFetch + url)
}
/**
 * 标记fetch过期，会重新请求
 * @author NanQi
 * @param {String} url 标记的URL 
 */
function markFetch(url) {
	wx.cache.set(preCacheKeyClearFetch + url, true)
}

/**
 * 拉取数据(get请求,带缓存)
 * @author NanQi
 * @param {String} url 请求的URL 
 * @param {Object} data 请求参数 
 * @param {Boolean} toast 是否显示toast
 * @param {Number} expire 缓存过期时间（秒）
 * @return {Promise} Promise对象
 */
async function fetch(url, data, toast = true, expire = wx.conf.default_expire) {
	let param = ''
	if(data) {
		param += ':' + md5(wx.utils.sortTransform(data));
	}
	const cacheKey = 'memory:fetch:' + url + param;
	const cacheVal = wx.cache.get(cacheKey);
	if(!isExpire(url) && cacheVal) {
		return Promise.resolve(cacheVal);
	} else {
		if(isExpire(url)) {
			wx.cache.remove(preCacheKeyClearFetch + url)
		}
		try {
            const res = await get(url, data, toast);
            wx.cache.remove(cacheKey);
            wx.cache.set(cacheKey, res, expire);
            return res;
        }
        catch (err) {
            const res = wx.cache.getStorageData(cacheKey);
            if (res) {
                return Promise.resolve(res);
            }
            else {
                throw err;
            }
        }
	}
}

/**
 * 获取数据(get请求,不带缓存)
 * @author NanQi
 * @param {String} url 请求的URL 
 * @param {Object} data 请求参数 
 * @param {Boolean} toast 是否显示toast
 * @return {Promise} Promise对象
 */
function get(url, data, toast = true) {
	return _request({
		url,
		data,
		toast
	})
}


/**
 * 执行(post请求)
 * @author NanQi
 * @param {String} url 请求的URL 
 * @param {Object} data 请求参数 
 * @param {Boolean} toast 是否显示toast
 * @param {String} method 请求方式,默认POST 
 * @return {Promise} Promise对象
 */
function post(url, data, toast = true, method = 'POST') {
	return _request({
		url,
		method,
		data,
		toast
	})
}

wx.api = {
    markFetch,
    fetch,
    get,
    post
}