wx.modal = {
	open(pageName, $extras = {}) {
		let eventName = pageName + '_modal_close'
		return new Promise((resolve, reject) => {
			wx.pro.navigateTo(pageName, $extras).then(() => {
				wx.event.one(eventName, ({
					confirm,
					extras
				}) => {
					if(confirm) {
						resolve(extras)
					} else {
						reject(extras)
					}
				})
			}).catch(reject)
		})

	},

	close(pageName, extras = {}, confirm = true) {
		let modalResult = {
			confirm,
			extras
		}

		wx.event.fire(pageName + '_modal_close', modalResult);
	},
}