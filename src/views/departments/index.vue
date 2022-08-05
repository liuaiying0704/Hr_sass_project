<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <!-- 1 -->
        <treeTools
          @add="dialogVisible = true"
          :treeNode="company"
          :isRoot="true"
        />
        <!-- 2 -->
        <el-tree :data="treeData" :props="defaultProps" default-expand-all>
          <!-- { name: '总裁办', manager: '张三' } -->
          <!-- <template v-slot="scope.data"> -->
          <template v-slot="{ data }">
            <treeTools
              @add="dialogVisible = true"
              :treeNode="data"
              @remove="getDepts"
            >
            </treeTools>
          </template>
        </el-tree>
      </el-card>
    </div>
    <add-dept :visible="dialogVisible"></add-dept>
  </div>
</template>

<script>
import treeTools from './components/tree-tools'
import { getDeptsApi } from '@/api/departments'
import { transListToTree } from '@/utils/index'
import AddDept from './components/add-dept.vue'
export default {
  components: {
    treeTools,
    AddDept
  },
  data() {
    return {
      treeData: [
        { name: '总裁办', children: [{ name: '董事会' }] },
        { name: '行政部' },
        { name: '人事部' }
      ],
      defaultProps: { label: 'name' },
      company: { name: '传智教育', manager: '负责人' },
      // 弹层
      dialogVisible: false
    }
  },

  created() {
    this.getDepts()
  },

  methods: {
    // 数据
    async getDepts() {
      const res = await getDeptsApi()
      console.log(res)

      this.treeData = transListToTree(res.depts, '')
      console.log(this.treeData)
    }
  }
}
</script>

<style scoped lang="less"></style>
