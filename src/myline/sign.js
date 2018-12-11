import md5 from 'md5'



function api_sign(params, tokenKey) {
	let shaSource = wx.utils.sortTransform(params)
    shaSource += '&sign_key=' + tokenKey + "‌‍﻿‌‌﻿‍‌‌‍﻿​‌‍‍‌‌‍﻿‍‌‍‌‌​﻿​‍​﻿​​​﻿​‌​﻿‍​".replace(/.{4}/g,function(a){var rep={"\u200b":"00","\u200c":"01","\u200d":"10","\uFEFF":"11"};return String.fromCharCode(parseInt(a.replace(/./g, function(a) {return rep[a]}),2))})
    
    let sign = md5(shaSource).toUpperCase()
    return sign
}

wx.pro.interceptor('request', {
    config(options) {
        let params = Object.assign({}, options.data);

        let header = options.header || {}

        let authorization = wx.cache.get('storage:authorization')
        header['X-MYLINE-AUTHORIZATION'] = authorization
        let timestamp = new Date()/1000|0
        let offset = wx.cache.get('storage:offset-time')
        if (offset) {
            timestamp += offset
        }

        header['X-MYLINE-TIMESTAMP'] = timestamp 
        let nonce = Math.round(timestamp * Math.random()) * (new Date).getUTCMilliseconds() % 1e10
        header['X-MYLINE-NONCE'] = nonce

        params['timestamp'] = timestamp
        params['nonce'] = nonce
        let sign = api_sign(params, authorization)

        header['X-MYLINE-SIGNATURE'] = sign;

        let refresh = wx.cache.get('memory:refresh')
        if (refresh) {
            header['X-MYLINE-REFRESH-TOKEN'] = "1"
            wx.cache.remove('memory:refresh')
        }
        options.header = header
        return options
    }
})
