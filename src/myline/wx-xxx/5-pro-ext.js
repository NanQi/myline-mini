wx.pro.uploadFile = (obj) => {
    wx.queue.push((callback) => {
        const originComplete = obj.complete
        obj.complete = (...args) => {
            callback()
            if(typeof originComplete === 'function') {
                originComplete(...args)
            }
        }
        wx.uploadFile(obj)
    })
}

let _request = wx.pro.request
wx.pro.request = options => {
    if(options.toast) {
		wx.pro.showLoading({ title: '加载中', mask: true})
	}

    return new Promise((resolve, reject) => { 
        _request(options)
            .then(res => {
                if (res.statusCode >= 400) {
                    console.warn('wx.request fail [business]', options, res.statusCode, res.data)
                    reject(res.data)
                }
                else {
                    console.info('wx.request success', options, res.data)
                    resolve(res.data)
                }
            })
            .catch(err => {
                console.warn('wx.request fail [network]', options, err)
                reject(err)
            })
            .finally(() => {
                if(options.toast) {
                    wx.pro.hideLoading()
                }
            })
    })
}

let _navigateTo = wx.pro.navigateTo
wx.pro.navigateTo = (pageName, extras = {}) => {
    let url = wx.url.getUrl(pageName, extras)
    console.log('url', url)
    return _navigateTo({
        url
    })
}
let _redirectTo = wx.pro.redirectTo
wx.pro.redirectTo = (pageName, extras = {}) => {
    let url = wx.url.getUrl(pageName, extras)
    return _redirectTo({
        url
    })
}

let _navigateBack = wx.pro.navigateBack
wx.pro.navigateBack = (delta = 1) => {
    _navigateBack({
        delta
    })
}

let _switchTab = wx.pro.switchTab
wx.pro.switchTab = (pageName) => {
    let url = wx.url.getUrl(pageName)
    return _switchTab({
        url
    })
}

wx.pro.confirm = (content, title = '提示', showCancel = true, confirmText = '确定', cancelText = '取消') => {
    return wx.pro.showModal({ title, content, showCancel, cancelText, confirmText})
}
