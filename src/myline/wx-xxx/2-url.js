const getUrl = (pageName, extras = null) => {
    let url = '/pages/' + pageName + '/main'

    if (extras && JSON.stringify(extras) != '{}') {
        url += '?' + wx.utils.transformRequest(extras)
    }

    return url
}

const getPageName = url => {
    const matchs = url.match(/pages\/(.+)\/main.*/i)
    if (matchs.length > 1) {
        return matchs[1]
    } else {
        throw new Error('not match')
    }
}

wx.url = { 
    getUrl, 
    getPageName
}