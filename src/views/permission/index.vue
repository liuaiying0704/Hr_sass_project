<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools :isShowLeft="false">
        <template #right>
          <el-button type="primary" plain @click="showAddDialog('0', 1)"
            >添加权限
          </el-button>
        </template>
      </PageTools>
      <el-table
        :data="permissions"
        style="width: 100%"
        row-key="id"
        ref="table"
      >
        <!-- 由于自定义了图标，点击不能展示下一级的children数据，，手动给i标签绑定点击事件，利用element里table方法 -->
        <el-table-column prop="name" label="名称">
          <template slot-scope="{ row }">
            <i
              @click="expend(row)"
              v-if="row.children"
              class="el-icon-folder-opened"
              style="margin-left: 5px"
            ></i>

            <i
              v-if="row.type === 2"
              class="el-icon-document-remove"
              style="margin-left: 5px"
            ></i>
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="code" label="标识"> </el-table-column>
        <el-table-column prop="description" label="描述"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{ row }">
            <el-button type="text" @click="showAddDialog(row.id, 2)"
              >添加
            </el-button>
            <el-button type="text"> 编辑</el-button>
            <el-button type="text">删除 </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 点击添加对话框 -->
      <!-- 放置一个弹层 用来编辑新增节点 -->
      <el-dialog :title="`添加权限点`" :visible="addDialogVisible">
        <!-- 表单 -->
        <el-form
          ref="form"
          :model="formData"
          :rules="rules"
          label-width="120px"
        >
          <el-form-item label="权限名称" prop="name">
            <el-input v-model="formData.name" style="width: 90%" />
          </el-form-item>
          <el-form-item label="权限标识" prop="code">
            <el-input v-model="formData.code" style="width: 90%" />
          </el-form-item>
          <el-form-item label="权限描述">
            <el-input v-model="formData.description" style="width: 90%" />
          </el-form-item>
          <el-form-item label="开启">
            <el-switch
              v-model="formData.enVisible"
              active-value="1"
              inactive-value="0"
            />
          </el-form-item>
        </el-form>
        <el-row slot="footer" type="flex" justify="center">
          <el-col :span="6">
            <el-button size="small" type="primary" @click="onSave"
              >确定</el-button
            >
            <el-button size="small" @click="addDialogVisible = false"
              >取消</el-button
            >
          </el-col>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import PageTools from '@/components/PageTools'
import {
  getPermissionList,
  addPermission,
  delPermission
} from '@/api/permission'
import { transListToTree } from '@/utils'
export default {
  data() {
    return {
      permissions: [],
      addDialogVisible: false,
      formData: {
        name: '',
        code: '',
        description: '',
        enVisible: '',

        pid: '',
        type: ''
      },
      rules: {
        name: [
          { required: true, message: '权限名称不能为空', trigger: 'blur' }
        ],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
      }
    }
  },
  components: {
    PageTools
  },
  created() {
    this.getPermissionList()
  },

  methods: {
    async getPermissionList() {
      const res = await getPermissionList()
      // console.log(res)
      this.permissions = transListToTree(res, '0')
    },
    // 展开点击事件
    expend(row) {
      // 给每一行row加一个点开的控制属性，，首次row.isExpend为undefined，取反为true,就会展示
      row.isExpend = !row.isExpend
      // Table Methods  element    ref="table"
      this.$refs.table.toggleRowExpansion(row, row.isExpend)
    },
    showAddDialog(pid, type) {
      this.addDialogVisible = true
      this.formData.pid = pid
      this.formData.type = type
      // console.log(this.formData)
    },
    onSave() {
      this.$refs.form.validate(async (valid) => {
        if (!valid) return
        await addPermission(this.formData)
        this.$message.success('添加成功')
        this.addDialogVisible = false
        this.getPermissionList()
        this.formData = {
          name: '',
          code: '',
          description: '',
          enVisible: '',
          pid: '',
          type: ''
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-table .el-table__expand-icon {
  display: none;
}
</style>
