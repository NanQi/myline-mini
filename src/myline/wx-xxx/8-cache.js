/**  
 * 获取缓存
 * @author NanQi
 * @param {String} key 缓存键 
 * @return {String} 缓存值
 */
function get(key) {
    try {
        let res = wx.getStorageSync(key)

        if (!res) {
            return ''
        }

        res = JSON.parse(res)

        if (res.__expiretime && res.__expiretime < wx.utils.timestamp()) {
            return ''
        } else {
            return res.data
        }
    } catch (e) {
        return ''
    }
}

/**  
 * 获取StorageData缓存
 * @author NanQi
 * @param {String} key 缓存键 
 * @return {String} 缓存值
 */
function getStorageData(key) {
    try {
        let res = wx.getStorageSync(key);

        if (!res) {
            return ''
        }

        res = JSON.parse(res)

        return res.data
    } catch (e) {
        return ''
    }
}

/**  
 * 设置缓存
 * @author NanQi
 * @param {String} key 缓存键 
 * @param {String} value 缓存值
 * @param {Number} expire 指定秒数后过期
 * @return void
 */
function set(key, value, expire = wx.conf.default_expire) {
    let cacheItem = {}
    cacheItem.data = value
    if (expire > 0) {
        cacheItem.__expiretime = wx.utils.timestamp() + expire
    }

    wx.setStorageSync(key, JSON.stringify(cacheItem))
}

/**
 * 有则取缓存，否则从调用回调并保存
 * @author NanQi
 * @param {String} key 缓存键
 * @param {String} callback 回调返回Promise
 * @param {Number} expire 指定秒数后过期
 * @return {Promise} Promise对象
 */
async function remember(key, callback, expire = wx.conf.default_expire) {
    let ret = this.get(key)
    if (ret) {
        return ret
    } else {
        ret = await callback()
        set(key, ret, expire)
        return ret
    }
}

/**  
 * 删除缓存
 * @author NanQi
 * @param {String} key 缓存键 
 * @return {void}
 */
function remove(key) {
    wx.removeStorageSync(key)
}

/**
 * 根据前缀批量删除缓存
 * @author NanQi
 * @param {String} prefix 缓存键的前缀 
 * @return void
 */
function removeList(prefix) {
    let keys = wx.getStorageInfoSync().keys
    if (keys && keys.length > 0) {
        keys.forEach(key => {
            if (key.indexOf(prefix) === 0) {
                wx.removeStorageSync(key)
            }
        })
    }
}

function clearFetch(url) {
    const prefixCacheKey = 'memory:fetch:' + url
    removeList(prefixCacheKey)
}

function clearMemory() {
    const prefixCacheKey = 'memory:'
    removeList(prefixCacheKey)
}

/**  
 * 清空缓存
 * @author NanQi
 * @return void
 */
function clear() {
    wx.clearStorageSync()
}

function getInfo() {
    return wx.getStorageInfoSync()
}

wx.cache = {
    get,
    getStorageData,
    set,
    remove,
    remember,
    clearFetch,
    clearMemory,
    clear,
    getInfo
}