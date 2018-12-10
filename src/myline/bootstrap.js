import './wx-xxx/bootstrap'
import './sign'
import Vue from 'vue'

Vue.config.errorHandler = res => {
	wx.logger.error(res)
}

import mixin from './mixin/global'
Vue.mixin(mixin)