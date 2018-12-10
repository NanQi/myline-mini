import $ui from '../$ui'
import $navigate from '../$navigate'
let lastPageName = ''
let pageList = []
let autoClosePageList = []

export default {
    mounted() {
        this.$ui = $ui
        this.$navigate = $navigate

        const initData = this.$options.initData
		if (wx.utils.isFunction(initData)) {
			initData.call(this);
		}
    },
    onShow() {
        this.$ui = $ui
        this.$navigate = $navigate

		if (this.$mp && this.$mp.mpType == 'page') {
            lastPageName = wx.url.getPageName(this.$mp.page.route)

            if (['creater-pre', 'index', 'mine'].indexOf(lastPageName) === -1
                && (pageList.length == 0 || lastPageName != pageList[pageList.length - 1])) {

                if (pageList.indexOf(lastPageName) > -1 
                && (autoClosePageList.length == 0 || autoClosePageList[autoClosePageList.length - 1] != lastPageName)) {
                    autoClosePageList.push(lastPageName)
                } 

                pageList.push(lastPageName)
            }
		}
    },
    onHide() {
		if (this.$mp && this.$mp.mpType == 'page') {
            wx.cache.set('memory:page:lastPage', lastPageName, -1)
		}
    },
    onUnload() {
        //页面退出
		if (this.$mp && this.$mp.mpType == 'page') {
            if (wx.utils.isFunction(this.$options.data)) {
                Object.assign(this.$data, this.$options.data())
            }

            if (pageList.length > 0) {
                pageList.pop()
                if (autoClosePageList.length > 0
                    && pageList.length > 0
                    && autoClosePageList[autoClosePageList.length - 1] == pageList[pageList.length - 1]
                ) {
                    autoClosePageList.pop()
                    wx.pro.navigateBack()
                }
            }

            wx.cache.set('memory:page:lastPage', lastPageName, -1)
		}
	}
}