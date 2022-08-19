<template>
  <div>
    <el-dialog
      title="分配角色"
      :visible="visible"
      @close="close"
      @open="onOpen"
    >
      <el-checkbox-group v-model="checkedList">
        <el-checkbox :label="item.id" v-for="item in rows" :key="item.id">{{
          item.name
        }}</el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRolesApi } from '@/api/role'
export default {
  name: 'AssignRoleDialog',
  data() {
    return {
      checkedList: [],
      //   员工列表
      rows: []
    }
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  created() {},

  methods: {
    close() {
      this.$emit('update:visible', false)
    },
    // 对话框打开的时候触发，if/open
    async onOpen() {
      const res = await getRolesApi()
      console.log(res)
      this.rows = res.rows
    }
  }
}
</script>

<style scoped></style>
