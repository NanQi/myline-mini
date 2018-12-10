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
