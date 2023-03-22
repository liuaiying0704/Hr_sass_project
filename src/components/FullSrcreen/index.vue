<template>
  <span style="margin: 0 8px">
    <svg-icon
      className="fullscreen"
      iconClass="fullscreen"
      @click="onScreenfull"
    />
  </span>
</template>

<script>
import screenfull from 'screenfull'
export default {
  name: 'FullSrcreen',
  data() {
    return {}
  },

  created() {},

  methods: {
    // 全屏，，下载安装包screenfull@5.1.0  点击事件，复制官网的代码 https://www.npmjs.com/package/screenfull
    onScreenfull() {
      if (screenfull.isEnabled) {
        screenfull.toggle()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.fullscreen {
  color: #fff;
}
</style>
