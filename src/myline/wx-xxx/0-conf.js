const uploadUrl = 'https://upload-z2.qbox.me'
const debug = false
const default_expire = 60 
const baseUrl = debug ? 'https://test.my2space.com/api/' : 'https://api.my2space.com/api/'
const version = 'v5.0.0922'
const authList = [
	'user/app_login',
	'user/app_register'
]

wx.conf = {
	uploadUrl,
	debug,
	baseUrl,
	version,
	authList,
	default_expire,
}