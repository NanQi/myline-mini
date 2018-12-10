wx.pro.interceptor('request', {
    config(options) {
        // let data = config.data
        let header = options.header || {}
        header['X-MYLINE-AUTHORIZATION'] = wx.cache.get('storage:authorization');
        let timestamp = new Date()/1000|0
        header['X-MYLINE-TIMESTAMP'] = timestamp 
        let nonce = Math.round(timestamp * Math.random()) * (new Date).getUTCMilliseconds() % 1e10
        header['X-MYLINE-NONCE'] = nonce
        header['X-MYLINE-SIGNATURE'] = "";

        let refresh = wx.cache.get('memory:refresh')
        if (refresh) {
            header['X-MYLINE-REFRESH-TOKEN'] = "1"
            wx.cache.remove('memory:refresh')
        }
        options.header = header
        return options
    }
})
