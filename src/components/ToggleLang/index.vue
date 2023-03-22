<template>
  <el-dropdown @command="onCommand">
    <span class="el-dropdown-link">
      <svg-icon style="color: #fff; font-size: 20px" icon-class="language" />
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="(value, key) in messages"
        :key="key"
        :command="key"
        :disabled="key === $i18n.locale"
        >{{ value.name }}</el-dropdown-item
      >
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { messages } from '@/i18n'
import Cookie from 'js-cookie'
console.log(messages)
export default {
  name: 'ToggleLang',
  data() {
    return {
      messages
    }
  },

  created() {},

  methods: {
    onCommand(val) {
      // 给每个el-dropdown-item 绑定command，即可拿到每一个下拉的值
      this.$root.$i18n.locale = val
      this.$router.go(0)
      Cookie.set('lang', val)
    }
  }
}
</script>

<style scoped></style>
