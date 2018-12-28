import md5 from 'md5'

const preCacheKeyClearFetch = 'storage:clear:fetch:'

async function request(paramOptions) {
    let options = Object.assign({}, paramOptions)
    options.url = wx.conf.baseUrl + paramOptions.url
    try {
        if (options.toast) {
            wx.pro.showLoading({ title: '加载中', mask: true })
        }
        let res = await wx.pro.request(options)
        if (res.statusCode >= 400) {
            console.warn('wx.request fail [business]', options, res.statusCode, res.data)
            if (res.data.status_code == 491) {
                let { code } = await wx.pro.login()
                wx.cache.set('storage:authorization', code, -1)
                wx.cache.set('memory:refresh', true)
                return await request(paramOptions)
            } else if (res.data.status_code == 482) {
                let nowTime = new Date() / 1000 | 0
                let offset = parseInt(res.data.message) - parseInt(nowTime);
                wx.cache.set('storage:offset-time', offset, -1)
                return await request(paramOptions)
            }
        }
        else {
            console.info('wx.request success', options, res.data)
            return res.data
        }
    } catch (err) {
        console.warn('wx.request fail [network]', options, err)
        throw err;
    } finally {
        if (options.toast) {
            wx.pro.hideLoading()
        }
    }
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
    if (data) {
        param += ':' + md5(wx.utils.sortTransform(data));
    }
    const cacheKey = 'memory:fetch:' + url + param;
    const cacheVal = wx.cache.get(cacheKey);
    if (!isExpire(url) && cacheVal) {
        return Promise.resolve(cacheVal);
    } else {
        if (isExpire(url)) {
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
    return request({
        url,
        data,
        toast
    })
}


/**
 * post请求
 * @author NanQi
 * @param {String} url 请求的URL 
 * @param {Object} data 请求参数 
 * @param {Boolean} toast 是否显示toast
 * @param {String} method 请求方式,默认POST 
 * @return {Promise} Promise对象
 */
function post(url, data, toast = true, method = 'POST') {
    return request({
        url,
        method,
        data,
        toast
    })
}

wx.api = {
    request,
    markFetch,
    fetch,
    get,
    post
}