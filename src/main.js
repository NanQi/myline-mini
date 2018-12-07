import Vue from 'vue'
import App from './App'
import 'myline/bootstrap'

Vue.config.productionTip = false
App.mpType = 'app'

console.log(wx.utils.guid())
console.log(wx.url.getUrl('nanqi'))

wx.pro.interceptor('showActionSheet', {
    config(config) {
        if (config.itemList.length == 2) {
            return false
        } 
        return config
    },
    success(res) {
        console.log('success', res)
        return res
    }
})
wx.pro.showActionSheet({ itemList: ['nanqi', 'nanqi2', 'nanqi3'] }).then(res => {
    console.log('show', res)
})
const app = new Vue(App)
app.$mount()
