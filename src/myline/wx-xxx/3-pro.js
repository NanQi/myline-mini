let $interceptors = {}

// 以下是没有 success、fail、complete 属性的api
// 1、...Sync【√】
// 2、on...【√】
// 3、create... 除了 createBLEConnection【√】
// 4、...Manager【√】
// 5、pause...【√】
// 6、stopRecord、stopVoice、stopBackgroundAudio、stopPullDownRefresh【√】
// 7、hideKeyboard、hideToast、hideLoading、showNavigationBarLoading、hideNavigationBarLoading【√】
// 8、canIUse、navigateBack、closeSocket、pageScrollTo、drawCanvas【√】
wx.pro = {}
for (let key in wx) {
    if (!wx.hasOwnProperty(key)) {
        continue
    }

    if (/^on|^create|Sync$|Manager$|^pause/.test(key) && key !== 'createBLEConnection' || key === 'stopRecord' || key === 'stopVoice' || key === 'stopBackgroundAudio' || key === 'stopPullDownRefresh' || key === 'hideKeyboard' || key === 'hideToast' || key === 'hideLoading' || key === 'showNavigationBarLoading' || key === 'hideNavigationBarLoading' || key === 'canIUse' || key === 'navigateBack' || key === 'closeSocket' || key === 'closeSocket' || key === 'pageScrollTo' || key === 'drawCanvas') {
        wx.pro[key] = wx[key]
        continue
    }

    wx.pro[key] = (options) => {
        options = options || {}
        if ($interceptors[key] && $interceptors[key].config) {
            let ret = $interceptors[key].config.call(this, options)
            if (ret === false) {
                options.fail && options.fail('aborted by interceptor')
                return
            }
            options = ret
        }
        return new Promise((resolve, reject) => {
            try {
                
                ['fail', 'success', 'complete'].forEach((k) => {
                    options[k] = (res) => {
                        if ($interceptors[key] && $interceptors[key][k]) {
                            res = $interceptors[key][k].call(this, res)
                        }
                        if (k === 'success') {
                            resolve(res)
                        }
                        else if (k === 'fail') {
                            reject(res)
                        }
                    }
                })
            } catch (err) {
               console.error(err) 
            }
            wx[key](options)
        })
    }
}


wx.pro.interceptor = (api, provider) => {
    $interceptors[api] = provider
}