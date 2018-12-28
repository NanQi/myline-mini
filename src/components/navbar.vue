<template>
  <div>
    <div class="navbar" :style="{'height': navigationBarHeight}">
      <div :style="{'height': statusBarHeight}"></div>
      <div class="title-container">
        <div class="capsule" style="visibility: visible; color: rgb(0, 0, 0);">
        <div bindtap="back" class="item" v-if="back">
            <img src="/static/imgs/back.svg" >
        </div>
        <span class="capsule-sep"></span>
        <div bindtap="backHome" class="item" v-if="home">
            <img src="/static/imgs/home.svg" >
        </div>
        </div>
        <div class="title">{{text}}</div>
    </div>
    </div>
    <!-- <div class="navbar" :style="{'height': navigationBarHeight}">
      <div :style="{'height': statusBarHeight}"></div>
      <div class="title-container">
        <div class="capsule" v-if="back || home">
          <div bindtap="back" v-if="back">
            <img src="/static/imgs/back.svg">
          </div>
          <div bindtap="backHome" v-if="home">
            <img src="/static/imgs/home.svg">
          </div>
        </div>
        <div class="title">{{text}}</div>
      </div>
    </div>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      statusBarHeight: '',
      navigationBarHeight: '',
    }
  },
  props: {
    text: {
      type: String,
      default() {
        return "测试标题"
      }
    },
    back: {
      type: Boolean,
      default() {
        return true
      }
    },
    home: {
      type: Boolean,
      default() {
        return true
      }
    }
  },
  mounted() {
    let systemInfo = wx.getSystemInfoSync()
    console.log('system', systemInfo)
    this.statusBarHeight = systemInfo.statusBarHeight + 'px';
    this.navigationBarHeight = (systemInfo.statusBarHeight + 44) + 'px';
  },
}
</script>

<style lang="less" scoped>
.navbar {
  width: 100%;
  background-color: #fff;
  position: fixed;
  z-index: 4;
}

.title-container {
  height: 80rpx;
  display: flex;
  align-items: center;
  position: relative;
}
.capsule {
  margin-left: 10px;
  display: flex;
  width: 170rpx;
  height: 62rpx;
  border: 1px solid rgba(225, 225, 225, 0.25);
  border-radius: 27px;
  background: rgba(255, 255, 255, 0.6);
  line-height: 1;
  font-size: 0;
  align-items: center;
  .item {
    display: flex;
    flex: 1;
    height: 60%;
    align-items: center;
    justify-content: center;
    padding: 6.4px 0;

    img {
        width: 50%;
        height: 100%;
    }
  }
  .capsule-sep {
    display: inline-block;
    min-width: 1px;
    height: 17.2px;
    background: rgba(225, 225, 225, 0.25);
  }
}
</style>
