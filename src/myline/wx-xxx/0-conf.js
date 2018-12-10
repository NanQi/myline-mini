const uploadUrl = 'https://upload-z2.qbox.me'
const debug = false
const default_expire = 60 
const baseUrl = debug ? 'https://api.youyag.com' : 'https://api.youyag.com/'
const version = '1.0.1210'

wx.conf = {
	uploadUrl,
	debug,
	baseUrl,
	version,
	default_expire,
}