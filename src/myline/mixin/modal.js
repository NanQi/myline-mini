let modalResult = null;

export default {
    methods: {
        closeModal(extras, confirm = true) {
            modalResult = { extras, confirm }
            wx.pro.navigateBack()
        }
    },
    initData() {
        modalResult = {
            confirm: false,
            extras: {}
        }
    },
    onUnload() {
		const pageName = wx.url.getPageName(this.$root.$mp.page.route)
        wx.modal.close(pageName, modalResult.extras, modalResult.confirm);
    }
}